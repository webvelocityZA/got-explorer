import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Character, House } from "../types";
import { fetchCharacter, fetchHouse } from "../utils/api";
import { keyCharacters } from "../utils/characterData";
import CharacterList from "../components/Characters/CharacterList";
import CharacterDetails from "../components/Characters/CharacterDetails";

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const characterId = searchParams.get("id");
    if (characterId) {
      handleCharacterSelect(parseInt(characterId));
    }
  }, [location]);

  const handleCharacterSelect = async (id: number) => {
    setLoading(true);
    try {
      const char = await fetchCharacter(id.toString());
      setSelectedCharacter(char);

      const houseDetails = await Promise.all(
        char.allegiances.map((houseUrl) => {
          const houseId = houseUrl.split("/houses/")[1];
          return fetchHouse(houseId);
        })
      );
      setHouses(houseDetails);
    } catch (error) {
      console.error("Error fetching character data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedCharacter(null);
    setHouses([]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#000] text-gray-100">
      <div className="w-full p-8 overflow-y-auto">
        <h1 className="thrones-font text-lg font-bold fixed right-8">
          Characters
        </h1>
        <div className="text-[#f9da5c] text-md font-bold fixed bottom-[2rem] right-8 uppercase">
          <Link to="/" className="tracking-widest">Home</Link>
          <Link to="/houses" className="ml-4 tracking-widest">Houses</Link>
        </div>
        {!selectedCharacter ? (
          <CharacterList
            characters={keyCharacters}
            onCharacterSelect={handleCharacterSelect}
          />
        ) : (
          loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <CharacterDetails
              character={selectedCharacter}
              houses={houses}
              onClose={handleClose}
            />
          )
        )}
      </div>
    </div>
  );
}