type Props = {
  duration?: string;
};

export const VideoDuration = ({ duration }: Props) => {
  return (
    <div className="absolute bottom-2 right-2 flex gap-1">
      {duration && (
        <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
          {duration}
        </div>
      )}
    </div>
  );
};
