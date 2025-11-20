import { CloseIcon, ExpandIcon, ShrinkIcon } from '@/5_shared/svg';
import { IconButton } from '../../button';
import { cn } from '@/5_shared/lib/utils';

type Props = {
  position: 'left' | 'right';
  title: string;
  isMobile: boolean;
  isFullScreen: boolean;
  onClose: () => void;
  handleFullScreenToggle: () => void;
};

export const SlidePanelHeader = ({
  position,
  title,
  isMobile,
  isFullScreen,
  onClose,
  handleFullScreenToggle,
}: Props) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]',
        position === 'right' && 'flex-row-reverse'
      )}
    >
      {/* Close button */}
      <IconButton
        variant="ghost"
        size="sm"
        icon={<CloseIcon />}
        onClick={onClose}
      />

      {/* Title */}
      {title && (
        <h2 className="flex-1 text-lg font-semibold text-[var(--color-text-primary)] truncate text-center mx-4">
          {title}
        </h2>
      )}

      {/* Expand button or spacer */}
      {!isMobile ? (
        <IconButton
          variant="ghost"
          size="sm"
          icon={isFullScreen ? <ShrinkIcon /> : <ExpandIcon />}
          onClick={handleFullScreenToggle}
          title={isFullScreen ? '축소' : '확장'}
        />
      ) : (
        <div className="w-8" />
      )}
    </div>
  );
};
