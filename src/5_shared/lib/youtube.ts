// YouTube utility functions for handling YouTube URLs and data
import { formatViewCount } from './video-utils';

export interface YouTubeVideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  uploadTime: string;
  description?: string;
  url: string;
  embedUrl: string;
}

// Extract YouTube video ID from various URL formats
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Generate YouTube embed URL
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    showinfo: '0',
    ...(autoplay && { autoplay: '1' })
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

// Generate YouTube thumbnail URL
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'): string {
  const qualityMap = {
    default: 'default.jpg',
    medium: 'mqdefault.jpg',
    high: 'hqdefault.jpg',
    standard: 'sddefault.jpg',
    maxres: 'maxresdefault.jpg'
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

// Format duration from seconds to MM:SS or HH:MM:SS
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}


// Format time ago
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

// Mock data generator for YouTube videos (for demo purposes)
export function generateMockYouTubeVideo(id: string, overrides?: Partial<YouTubeVideoData>): YouTubeVideoData {
  const titles = [
    "Next.js 15 Complete Tutorial - Build Modern Web Apps",
    "React Server Components Explained",
    "TypeScript Best Practices for Large Applications",
    "Building a Design System from Scratch",
    "Modern CSS Techniques You Should Know",
    "JavaScript Performance Optimization Tips",
    "Web Accessibility Guide for Developers",
    "Docker for Frontend Developers",
    "Git Workflow for Team Collaboration",
    "API Design Best Practices"
  ];

  const channels = [
    { name: "WebDev Pro", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { name: "Code Academy", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { name: "Tech Tutorials", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" },
    { name: "Frontend Masters", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c94c?w=40&h=40&fit=crop&crop=face" }
  ];

  const thumbnails = [
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop"
  ];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomChannel = channels[Math.floor(Math.random() * channels.length)];
  const randomThumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];
  const randomViews = Math.floor(Math.random() * 2000000) + 1000;
  const randomDaysAgo = Math.floor(Math.random() * 30) + 1;
  const randomDuration = Math.floor(Math.random() * 1800) + 180; // 3-33 minutes

  return {
    id,
    title: randomTitle,
    thumbnail: randomThumbnail,
    duration: formatDuration(randomDuration),
    channelName: randomChannel.name,
    channelAvatar: randomChannel.avatar,
    views: formatViewCount(randomViews) || '0 views',
    uploadTime: `${randomDaysAgo} days ago`,
    url: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: getYouTubeEmbedUrl(id),
    ...overrides
  };
}

// Sample YouTube video IDs for demo
export const sampleYouTubeVideoIds = [
  'dQw4w9WgXcQ', // Rick Roll (classic)
  'jNQXAC9IVRw', // Me at the zoo (first YouTube video)
  'kffacxfA7G4', // Baby Shark (most viewed)
  'pVeq-0dIqpk', // Gangnam Style
  'CevxZvSJLk8', // Katy Perry - Roar
  'JGwWNGJdvx8', // Shape of You
  'RgKAFK5djSk', // Wiz Khalifa - See You Again
  'kJQP7kiw5Fk', // Despacito
  'YQHsXMglC9A', // Hello - Adele
  'hT_nvWreIhg'  // Counting Stars
];

// Validate YouTube URL
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}

// Get video data from URL (mock implementation for demo)
export function getVideoDataFromUrl(url: string): YouTubeVideoData | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  return generateMockYouTubeVideo(videoId);
}