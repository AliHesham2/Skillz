import type { FruitySlide } from '@forma/ui';

// Original three-frame artwork is a demo adapter, not a library dependency.
export const fruityAtlas = { src: '/fruity/Labels.jpg', mask: '/fruity/cane.svg', frames: 3 };
export const fruitySlides: FruitySlide[] = [
  { id: 'pear', name: 'Pear', description: 'Green pear. Soft, crisp, and a little unexpected.', wash: '#d4e99d', ink: '#254735', labelFrame: 0 },
  { id: 'apple', name: 'Apple', description: 'Red apple. A bright twist on a familiar favorite.', wash: '#f7bdba', ink: '#713139', labelFrame: 1 },
  { id: 'exotic', name: 'Exotic', description: 'Something tropical. Find your next favorite.', wash: '#d1caf4', ink: '#443779', labelFrame: 2 },
].map(slide => ({ ...slide, fruits: ['one', 'two', 'three', 'four'].map(n => `/fruity/${slide.id}-${n}.png`) }));
