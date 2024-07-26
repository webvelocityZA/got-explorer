import React, { useState, useEffect } from "react";
import images from "@images";
import { fetchCharacter, fetchHouse } from "../utils/api";
import { Character, House } from "../models/models";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const characterId = searchParams.get("id");
    if (characterId) {
      handleCharacterSelect(characterId);
    }
  }, [location]);

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
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
                    <h2 className="text-md thrones-font font-bold">
                      {char.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Character detail view
          <div className="bg-[#131415] rounded-lg shadow-lg p-8 mt-16">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleClose}
                  className="absolute top-[3rem] right-[3rem] bg-gray-500 p-2 rounded-full text-gray-400 hover:text-white mt-16"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-2xl thrones-font font-bold mb-1">
                  {selectedCharacter.name}
                </h2>
                <p className="mb-6 muted text-sm">
                  {selectedCharacter.titles.join(", ")}
                </p>
                <div className="flex flex-col md:flex-row gap-8 mb-6">
                  <img
                    src={getCharacterImage(selectedCharacter.name)}
                    alt={selectedCharacter.name}
                    className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg"
                  />
                  <div className="w-full md:w-2/3">
                    <p>
                      Hailing from the {selectedCharacter.culture} culture and
                      born on {selectedCharacter.born}.
                    </p>
                    <p>
                      Also known by the aliases:{" "}
                      {selectedCharacter.aliases.join(", ")}.
                    </p>
                    <br />
                    <p>
                      This character is portrayed in the TV series Game of
                      Thrones by {selectedCharacter.playedBy.join(", ")} and
                      appears in the following seasons of the TV series:{" "}
                      {selectedCharacter.tvSeries.join(", ")}.
                    </p>
                    <div className="mt-8">
                      <div className="w-full">
                        <div className="grid grid-cols-1">
                          {houses.map((house) => (
                            <div
                              key={house.url}
                              className="bg-[#292929] p-4 rounded-lg shadow mt-4"
                            >
                              <h4 className="text-lg font-semibold mb-2 text-[#f9da5c] uppercase">
                                {house.name}
                              </h4>
                              <p>
                                <strong>Region:</strong> {house.region}
                              </p>
                              <p>
                                <strong>Words:</strong> {house.words}
                              </p>
                              <p>
                                <strong>Coat of Arms:</strong>{" "}
                                {house.coatOfArms}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}