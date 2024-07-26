// Dynamic imports for characters and houses
const characterImages = import.meta.glob('../images/characters/**/*.{png,jpg,svg}', { eager: true });
const houseImages = import.meta.glob('../images/houses/**/*.{png,jpg,svg}', { eager: true });

// Manual imports for other images
import default_character from '../images/default_character.png';
import winterfield_pattern from '../images/patterns/_362.png';
import characters_bg from '../images/patterns/characters_bg.png';
import main_bg from '../images/westeros.svg';
import baratheon_bg from '../images/houses/baratheon_bg.svg';
import stark_bg from '../images/houses/stark_bg.svg';
import targaryen_bg from '../images/houses/targaryen_bg.svg';
import lannister_bg from '../images/houses/lannister_bg.svg';
import greyjoy_bg from '../images/houses/greyjoy_bg.svg';


const exports: { [key: string]: string } = {
  default_character,
  main_bg,
  winterfield_pattern,
  characters_bg,
  baratheon_bg,
  stark_bg,
  targaryen_bg,
  lannister_bg,
  greyjoy_bg,
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