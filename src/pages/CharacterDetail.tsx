import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Character, House } from "../models/models";
import { fetchCharacter, fetchHouse } from "../utils/api";
import images from "@images";

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    const loadCharacter = async () => {
      if (id) {
        const char = await fetchCharacter(id);
        setCharacter(char);

        const houseDetails = await Promise.all(
          char.allegiances.map((houseUrl: string) => {
            const houseId = parseInt(houseUrl.split("/houses/")[1], 10);
            return fetchHouse(houseId.toString());
          })
        );
        setHouses(houseDetails);
      }
    };

    loadCharacter();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  // Function to find the best matching image for the character
  const getCharacterImage = (name: string) => {
    const normalizedName = name.toLowerCase().replace(/\s+/g, "_");
    const possibleKeys = Object.keys(images).filter(
      (key) =>
        key.toLowerCase().includes(normalizedName) ||
        normalizedName.includes(key.toLowerCase())
    );

    if (possibleKeys.length > 0) {
      // Use the first matching image found
      return images[possibleKeys[0]];
    }

    // If no matching image is found, return a default image
    return images.default_character
  };

  const characterImage = getCharacterImage(character.name);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
      {characterImage && (
        <img
          src={characterImage}
          alt={character.name}
          className="mb-4 max-w-md mx-auto rounded-lg shadow-lg aspect-auto"
          width={200}

        />
      )}

      <div className="mb-4">
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Culture:</strong> {character.culture}
        </p>
        <p>
          <strong>Born:</strong> {character.born}
        </p>
        <p>
          <strong>Titles:</strong> {character.titles.join(", ")}
        </p>
        <p>
          <strong>Aliases:</strong> {character.aliases.join(", ")}
        </p>
        <p>
          <strong>Played By:</strong> {character.playedBy.join(", ")}
        </p>
        <p>
          <strong>TV Series:</strong> {character.tvSeries.join(", ")}
        </p>
      </div>
      <h2 className="text-2xl font-bold mb-2">Allegiances</h2>
      {houses.map((house) => (
        <div key={house.url} className="mb-4">
          <h3 className="text-xl font-semibold">{house.name}</h3>
          <p>
            <strong>Region:</strong> {house.region}
          </p>
          <p>
            <strong>Words:</strong> {house.words}
          </p>
          <p>
            <strong>Titles:</strong> {house.titles.join(", ")}
          </p>
          <p>
            <strong>Coat of Arms:</strong> {house.coatOfArms}
          </p>
        </div>
      ))}
    </div>
  );
}
