import { NextRequest, NextResponse } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';

/**
 * Batch YouTube Official Channel Processing API
 *
 * POST /api/youtube/batch - Process multiple official channels
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stellas } = body;

    // Input validation
    if (!stellas || !Array.isArray(stellas)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request',
          message: 'stellas array is required',
          example: { stellas: ['rin', 'yuni', 'nana'] },
        },
        { status: 400 }
      );
    }

    if (stellas.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Empty array',
          message: 'At least one channel is required in stellas array',
        },
        { status: 400 }
      );
    }

    if (stellas.length > 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many channels',
          message: 'Maximum 10 channels allowed per batch request',
        },
        { status: 400 }
      );
    }

    // Validate channel names
    const invalidChannels = stellas.filter(
      (stella) => typeof stella !== 'string' || !stella.trim()
    );

    if (invalidChannels.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid channel names',
          message: 'All items in stellas array must be valid strings',
          invalidItems: invalidChannels,
        },
        { status: 400 }
      );
    }

    // Normalize channel names
    const normalizedChannels = stellas.map((stella) =>
      stella.toLowerCase().trim()
    );

    // Remove duplicates
    const uniqueChannels = [...new Set(normalizedChannels)];

    // Get service from container
    const serviceContainer = getServiceContainer();
    const youtubeService = serviceContainer.getYouTubeService();

    // Process all channels through service layer
    const result = await youtubeService.batchProcessChannels(uniqueChannels);

    // Analyze results for response
    const successfulChannels = result.results.filter((r) => r.success);
    const failedChannels = result.results.filter((r) => !r.success);

    return NextResponse.json({
      success: true,
      message: `Batch processing completed: ${successfulChannels.length}/${uniqueChannels.length} channels successful`,
      data: {
        requestedChannels: stellas,
        processedChannels: uniqueChannels,
        summary: {
          totalChannels: uniqueChannels.length,
          successfulChannels: successfulChannels.length,
          failedChannels: failedChannels.length,
          totalVideosProcessed: result.totalProcessed,
          duplicatesRemoved: stellas.length - uniqueChannels.length,
        },
        results: result.results,
      },
      ...(failedChannels.length > 0 && {
        warnings: {
          failedChannels: failedChannels.map((channel) => ({
            channel: channel.channelName,
            error: channel.error,
          })),
        },
      }),
    });
  } catch (error) {
    console.error('Error in batch channel processing:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Batch processing failed',
        message: 'An error occurred while processing the batch request',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/youtube/batch - Get batch processing information and available channels
 */
export async function GET() {
  try {
    // Get all configured channels from environment variables
    const channelConfigs = Object.entries(process.env)
      .filter(
        ([key]) => key.startsWith('NEXT_PUBLIC_') && key.endsWith('_CHANNEL_ID')
      )
      .map(([key, value]) => {
        const channelName = key
          .replace('NEXT_PUBLIC_', '')
          .replace('_CHANNEL_ID', '')
          .toLowerCase();

        return {
          name: channelName,
          channelId: value as string,
        };
      });

    if (channelConfigs.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No channels configured for batch processing',
        data: {
          availableChannels: [],
          total: 0,
        },
        usage: {
          endpoint: '/api/youtube/batch',
          method: 'POST',
          body: { stellas: ['channel1', 'channel2'] },
          limits: {
            maxChannels: 10,
            minChannels: 1,
          },
        },
      });
    }

    // Get video counts for each channel
    const serviceContainer = getServiceContainer();
    const videoRepository = serviceContainer.getVideoRepository();

    const channelsWithStats = await Promise.all(
      channelConfigs.map(async (config) => {
        try {
          const totalCount = await videoRepository.countByChannel(
            config.channelId
          );

          return {
            name: config.name,
            channelId: config.channelId,
            totalVideos: totalCount,
            isAvailable: true,
          };
        } catch (error) {
          console.error(`Error getting stats for ${config.name}:`, error);
          return {
            name: config.name,
            channelId: config.channelId,
            totalVideos: 0,
            isAvailable: false,
            error: 'Database error',
          };
        }
      })
    );

    // Calculate totals
    const totalVideos = channelsWithStats
      .filter((c) => c.isAvailable)
      .reduce((sum, c) => sum + c.totalVideos, 0);

    return NextResponse.json({
      success: true,
      message: `Found ${channelConfigs.length} channels available for batch processing`,
      data: {
        availableChannels: channelsWithStats,
        total: channelConfigs.length,
        statistics: {
          totalVideosInDatabase: totalVideos,
          availableChannels: channelsWithStats.filter((c) => c.isAvailable)
            .length,
          unavailableChannels: channelsWithStats.filter((c) => !c.isAvailable)
            .length,
        },
      },
      usage: {
        endpoint: '/api/youtube/batch',
        method: 'POST',
        examples: [
          {
            description: 'Process all channels',
            body: { stellas: channelConfigs.map((c) => c.name) },
          },
          {
            description: 'Process specific channels',
            body: { stellas: channelConfigs.slice(0, 3).map((c) => c.name) },
          },
        ],
        limits: {
          maxChannels: 10,
          minChannels: 1,
          supportedChannels: channelConfigs.map((c) => c.name),
        },
      },
    });
  } catch (error) {
    console.error('Error getting batch processing info:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get batch information',
        message: 'Could not retrieve batch processing data',
      },
      { status: 500 }
    );
  }
}
