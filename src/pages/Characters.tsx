import React, { useState, useEffect } from "react";
import images from "@images";
import { fetchCharacter, fetchHouse } from "../utils/api";
import { Character, House } from "../models/models";

const keyCharacters = [
  { id: 583, name: "Jon Snow" },
  { id: 1303, name: "Daenerys Targaryen" },
  { id: 148, name: "Arya Stark" },
  { id: 238, name: "Cersei Lannister" },
  { id: 529, name: "Jaime Lannister" },
  { id: 957, name: "Sansa Stark" },
  { id: 210, name: "Brandon Stark" },
  { id: 1052, name: "Tyrion Lannister" },
];

const getCharacterImage = (name) => {
  const normalizedName = name.toLowerCase().replace(/\s+/g, "_");
  const possibleKeys = Object.keys(images).filter(
    (key) =>
      key.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(key.toLowerCase())
  );

  if (possibleKeys.length > 0) {
    return images[possibleKeys[0]];
  }

  return images.default_character || "path/to/default/image.jpg";
};

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCharacterSelect = async (id) => {
    setLoading(true);
    try {
      const char = await fetchCharacter(id);
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
    <div className="flex h-screen overflow-hidden bg-[#705c57] text-gray-100"         style={{
      backgroundImage: `url(${images.dragon})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}>
      <div className="w-1/2 relative">
        {/* <img
          src={images.characters_bg}
          alt="Game of Thrones Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-100 font-serif">
            Game of Thrones
            <br />
            Characters
          </h1>
        </div> */}
      </div>

      <div className="w-1/2 p-8 overflow-y-auto">
        {!selectedCharacter ? (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {keyCharacters.map((char) => (
              <div
                key={char.id}
                className="group cursor-pointer"
                onClick={() => handleCharacterSelect(char.id)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105">
                  <img
                    src={getCharacterImage(char.name)}
                    alt={char.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h2 className="text-xl font-bold">{char.name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Character detail view
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleClose}
                  className="absolute top-10 right-10 text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-4xl font-bold mb-6">{selectedCharacter.name}</h2>
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <img
                    src={getCharacterImage(selectedCharacter.name)}
                    alt={selectedCharacter.name}
                    className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg"
                  />
                  <div className="w-full md:w-2/3">
                    <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
                    <p><strong>Culture:</strong> {selectedCharacter.culture}</p>
                    <p><strong>Born:</strong> {selectedCharacter.born}</p>
                    <p><strong>Titles:</strong> {selectedCharacter.titles.join(", ")}</p>
                    <p><strong>Aliases:</strong> {selectedCharacter.aliases.join(", ")}</p>
                    <p><strong>Played By:</strong> {selectedCharacter.playedBy.join(", ")}</p>
                    <p><strong>TV Series:</strong> {selectedCharacter.tvSeries.join(", ")}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Allegiances</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {houses.map((house) => (
                    <div key={house.url} className="bg-gray-700 p-4 rounded-lg shadow">
                      <h4 className="text-xl font-semibold mb-2">{house.name}</h4>
                      <p><strong>Region:</strong> {house.region}</p>
                      <p><strong>Words:</strong> {house.words}</p>
                      <p><strong>Coat of Arms:</strong> {house.coatOfArms}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}