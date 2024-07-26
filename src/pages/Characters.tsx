import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Character, House } from "../types";
import { fetchCharacter, fetchHouse } from "../utils/api";
import { keyCharacters } from "../utils/characterData";
import CharacterList from "../components/Characters/CharacterList";
import CharacterDetails from "../components/Characters/CharacterDetails";

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
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
      setSelectedCharacter(char as Character);

      const houseDetails = await Promise.all(
        char.allegiances.map((houseUrl) => {
          const houseId = houseUrl.split("/houses/")[1];
          return fetchHouse(houseId);
        })
      );
      setHouses(houseDetails as House[]);
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
    <div className="flex h-auto md:h-screen md:overflow-hidden bg-[#000] text-gray-100">
      <div className="w-full p-8 overflow-y-auto">
        <h1 className="hidden md:block thrones-font text-lg font-bold absolute md:fixed right-8 z-50 mr-4 md:mr-0">
          Characters
        </h1>
        <div className="text-[#f9da5c] text-md font-bold fixed bottom-[2rem] right-0 md:right-8 uppercase z-50 rotate-90 md:rotate-0 -translate-y-14 md:-translate-y-0 translate-x-14 md:-translate-x-0 opacity-50 md:opacity-100">
          <Link to="/" className="tracking-widest">
            Home
          </Link>
          <Link to="/houses" className="ml-4 tracking-widest">
            Houses
          </Link>
        </div>
        {!selectedCharacter ? (
          <CharacterList
            characters={keyCharacters}
            onCharacterSelect={handleCharacterSelect}
          />
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <CharacterDetails
            character={selectedCharacter}
            houses={houses}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}
