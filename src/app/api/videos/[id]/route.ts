import { NextRequest, NextResponse } from 'next/server'
import { VideoService } from '@/entities/video'
import { AuthService } from '@/shared/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const video = await VideoService.getVideo(id)

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await VideoService.incrementViews(id)

    return NextResponse.json({ video })
  } catch (error) {
    console.error('Error fetching video:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await AuthService.requireAuth()
    const { id } = await params
    const body = await request.json()

    // Check if user owns the video
    const existingVideo = await VideoService.getVideo(id)
    if (!existingVideo || existingVideo.user.id !== user.id) {
      return NextResponse.json(
        { error: 'Video not found or access denied' },
        { status: 404 }
      )
    }

    const video = await VideoService.updateVideo(id, body)

    return NextResponse.json({ video })
  } catch (error) {
    console.error('Error updating video:', error)
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await AuthService.requireAuth()
    const { id } = await params

    // Check if user owns the video
    const existingVideo = await VideoService.getVideo(id)
    if (!existingVideo || existingVideo.user.id !== user.id) {
      return NextResponse.json(
        { error: 'Video not found or access denied' },
        { status: 404 }
      )
    }

    await VideoService.deleteVideo(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting video:', error)
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
}