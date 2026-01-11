import { ImageData } from './types';

// Aantal beschikbare real en fake images om uit te kiezen
const REAL_COUNT = 10;
const FAKE_COUNT = 9;

// Functie om de data te genereren
const generateImages = (): ImageData[] => {
  const images: ImageData[] = [];

  // Genereer Real images (real-1.jpg t/m real-10.jpg)
  for (let i = 1; i <= REAL_COUNT; i++) {
    images.push({
      id: `real-${i}`,
      path: `/images/real-${i}.jpg`,
      is_slop: false
    });
  }

  // Genereer Fake images (fake-1.jpg t/m fake-9.jpg)
  for (let i = 1; i <= FAKE_COUNT; i++) {
    images.push({
      id: `fake-${i}`,
      path: `/images/fake-${i}.jpg`,
      is_slop: true
    });
  }

  return images;
};

export const IMAGES_DATA: ImageData[] = generateImages();

export const INITIAL_SCORE = 100;
// Aantal rondes is 12
export const MAX_ROUNDS = 12;