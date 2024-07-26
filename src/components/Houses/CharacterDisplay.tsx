import React from "react";
import { Character } from "../../types";
import { getImage } from "../../utils/imageHelpers";

interface CharacterDisplayProps {
  character: Character | null;
  title: string;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
  title,
}) => {
  if (!character) return null;
  return (
    <div className="mt-4" aria-live="polite">
      <h3
        className="text-xl font-bold mb-4 text-[#f9da5c] uppercase"
        aria-label={`Character title: ${title}`}
      >
        {title}
      </h3>
      <div className="flex items-center">
        <img
          src={getImage(
            parseInt(character.url.split("/").pop() || "0"),
            "character"
          )}
          alt={character.name}
          className="w-16 h-16 rounded-full mr-4 object-contain object-center"
          aria-describedby={`character-name-${character.name}`}
        />
        <div>
          <p id={`character-name-${character.name}`} className="font-bold">
            {character.name}
          </p>
          <p>{character.titles.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;
