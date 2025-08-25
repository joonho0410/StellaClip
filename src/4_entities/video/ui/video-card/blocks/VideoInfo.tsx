import { Text } from '@/5_shared/ui';

type Props = {
  title: string;
  channelName: string;
  viewCount?: string;
  uploadTime?: string;
};

export const VideoInfo = ({
  title,
  channelName,
  viewCount,
  uploadTime,
}: Props) => {
  return (
    <>
      <div>
        {/* Title */}
        <Text
          className="font-bold line-clamp-2 group-hover:text-[var(--color-text-primary)] transition-colors"
          color="primary"
        >
          {title}
        </Text>
        {/* Channel Name */}
      </div>
      {/* Metadata */}
      <div>
        <Text
          size="small"
          color="secondary"
          className="mt-2 hover:text-[var(--color-text-primary)] transition-colors line-clamp-1"
        >
          {channelName}
        </Text>
        <div className="flex items-center gap-1 mt-1">
          {
            <>
              <Text size="small" color="tertiary">
                {viewCount || 0}
              </Text>
              <>
                <Text size="small" color="tertiary">
                  •
                </Text>
                <Text size="small" color="tertiary">
                  {uploadTime || ''}
                </Text>
              </>
            </>
          }
        </div>
      </div>
    </>
  );
};
