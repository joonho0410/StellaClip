import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { VideoItem } from '../types';

interface VideoState {
  currentVideo: VideoItem | null;
  viewedVideos: VideoItem[];

  // Actions
  setCurrentVideo: (video: VideoItem | null) => void;
  addViewedVideo: (video: VideoItem) => void;
  clearViewedVideos: () => void;
  removeFromViewedVideos: (videoId: string) => void;
}

const MAX_VIEWED_VIDEOS = 10;

export const useVideoStore = create<VideoState>()(
  persist(
    immer<VideoState>((set, get) => ({
      currentVideo: null,
      viewedVideos: [],

      setCurrentVideo: (video: VideoItem | null) => {
        set((state: VideoState) => {
          state.currentVideo = video;
        });

        // Add current video to viewing history (if not null)
        if (video) {
          const { addViewedVideo } = get();
          addViewedVideo(video);
        }
      },

      addViewedVideo: (video: VideoItem) => {
        set((state: VideoState) => {
          // Check if video already exists in viewing history
          const existingIndex = state.viewedVideos.findIndex(
            (v: VideoItem) => v.id === video.id
          );

          if (existingIndex !== -1) {
            // If exists, remove it and add to front
            state.viewedVideos.splice(existingIndex, 1);
          }

          // Add new video to front
          state.viewedVideos.unshift(video);

          // Limit to maximum count
          if (state.viewedVideos.length > MAX_VIEWED_VIDEOS) {
            state.viewedVideos.splice(MAX_VIEWED_VIDEOS);
          }
        });
      },

      clearViewedVideos: () => {
        set((state: VideoState) => {
          state.viewedVideos = [];
        });
      },

      removeFromViewedVideos: (videoId: string) => {
        set((state: VideoState) => {
          const index = state.viewedVideos.findIndex(
            (video: VideoItem) => video.id === videoId
          );
          if (index !== -1) {
            state.viewedVideos.splice(index, 1);
          }
        });
      },
    })),
    {
      name: 'video-store',
      // Store only viewedVideos in localStorage (currentVideo for session, viewedVideos for persistence)
      partialize: (state) => ({
        viewedVideos: state.viewedVideos,
      }),
    }
  )
);

export const useCurrentVideo = () => {
  const currentVideo = useVideoStore((state) => state.currentVideo);
  const setCurrentVideo = useVideoStore((state) => state.setCurrentVideo);
  return { currentVideo, setCurrentVideo };
};

export const useViewedVideos = () => {
  const viewedVideos = useVideoStore((state) => state.viewedVideos);
  const addViewedVideo = useVideoStore((state) => state.addViewedVideo);
  const clearViewedVideos = useVideoStore((state) => state.clearViewedVideos);
  const removeFromViewedVideos = useVideoStore(
    (state) => state.removeFromViewedVideos
  );

  return {
    viewedVideos,
    addViewedVideo,
    clearViewedVideos,
    removeFromViewedVideos,
  };
};
