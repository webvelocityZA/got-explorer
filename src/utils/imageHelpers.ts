import images from "@images";

export const getImage = (id: number, type: "house" | "character"): string => {
  const prefix = type === "house" ? "house_" : "character_";
  const possibleKeys = Object.keys(images).filter(
    (key) =>
      key.toLowerCase().includes(`${id}`) ||
      `${prefix}${id}`.includes(key.toLowerCase())
  );

  if (possibleKeys.length > 0) {
    return images[possibleKeys[0]];
  }

  return images.default_character;
};

export const houseBackgrounds = {
  Baratheon: images.baratheon_bg,
  Stark: images.stark_bg,
  Targaryen: images.targaryen_bg,
  Lannister: images.lannister_bg,
  Greyjoy: images.greyjoy_bg,
  default: images.main_bg
};