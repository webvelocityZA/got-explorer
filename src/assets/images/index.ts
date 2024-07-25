// Dynamic imports for characters and houses
const characterImages = import.meta.glob('../images/characters/**/*.{png,jpg,svg}', { eager: true });
const houseImages = import.meta.glob('../images/houses/**/*.{png,jpg,svg}', { eager: true });

// Manual imports for other images
import default_character from '../images/default_character.png';

const exports: { [key: string]: string } = {
  default_character
};

// Process character images
for (const path in characterImages) {
  const key = path.replace('../images/', '').replace(/\.(png|jpg|svg)$/, '').replace(/\//g, '_');
  exports[key] = (characterImages[path] as any).default;
}

// Process house images
for (const path in houseImages) {
  const key = path.replace('../images/', '').replace(/\.(png|jpg|svg)$/, '').replace(/\//g, '_');
  exports[key] = (houseImages[path] as any).default;
}

export default exports;