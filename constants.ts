import { ImageData } from './types';

// Using Unsplash source URLs for a reliable demo environment.
// Real: High-quality nature photography
// Slop: Surreal/Over-saturated "AI-vibe" nature or obviously manipulated styles
const generateImages = (): ImageData[] => {
  const images: ImageData[] = [];

  // Real Nature Specimens
  const realUrls = [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bdb?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1518173959113-317539a61438?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format',
    'https://images.unsplash.com/photo-1433086566280-608bd0a390a5?q=80&w=800&auto=format'
  ];

  // AI-Like / Slop Specimens (Using more "dreamy" or highly processed visuals)
  const fakeUrls = [
    'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=800&auto=format', // Glowing forest
    'https://images.unsplash.com/photo-1510784722466-f2aa9c52fed6?q=80&w=800&auto=format', // Sunset HDR
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format', // Symmetrical tree
    'https://images.unsplash.com/photo-1418489098061-ce87b5dc3aee?q=80&w=800&auto=format', // Surreal morning
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format', // Neon field
    'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=800&auto=format', // Waterfall HDR
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=800&auto=format', // Beach glow
    'https://images.unsplash.com/photo-1431440853551-304ca4555b0e?q=80&w=800&auto=format', // Lightning purple
    'https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=800&auto=format'  // Forest mist HDR
  ];

  realUrls.forEach((url, i) => {
    images.push({
      id: `real-${i + 1}`,
      path: url,
      is_slop: false
    });
  });

  fakeUrls.forEach((url, i) => {
    images.push({
      id: `fake-${i + 1}`,
      path: url,
      is_slop: true
    });
  });

  return images;
};

export const IMAGES_DATA: ImageData[] = generateImages();
export const INITIAL_SCORE = 100;
export const MAX_ROUNDS = 12;