import images from "@images";
import { useEffect, useState } from "react";
import { Character, House } from "../models/models";
import { fetchCharacter, fetchHouse } from "../utils/api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const houseBackgrounds = {
  Baratheon: images.baratheon_bg,
  Stark: images.stark_bg,
  Targaryen: images.targaryen_bg,
  Lannister: images.lannister_bg,
  Greyjoy: images.greyjoy_bg,
  default: images.main_bg
};

export default function Houses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [houses, setHouses] = useState<House[]>([]);
  const [activeHouse, setActiveHouse] = useState<number | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [currentLord, setCurrentLord] = useState<Character | null>(null);
  const [heir, setHeir] = useState<Character | null>(null);
  const [swornMembers, setSwornMembers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBackground, setCurrentBackground] = useState(images.main_bg);
  const membersPerPage = 10;

  const keyHouses = [
    { id: 17, name: "House Baratheon of Storm's End", shortName: "Baratheon" },
    { id: 362, name: "House Stark of Winterfell", shortName: "Stark" },
    { id: 378, name: "House Targaryen of King's Landing", shortName: "Targaryen" },
    { id: 229, name: "House Lannister of Casterly Rock", shortName: "Lannister" },
    { id: 395, name: "House Greyjoy of Pyke", shortName: "Greyjoy" },
  ];

  useEffect(() => {
    const loadHouses = async () => {
      const houseDetails = await Promise.all(
        keyHouses.map((house) => fetchHouse(house.id.toString()))
      );
      setHouses(houseDetails);
    };

    loadHouses();

    // Read the houseId from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const houseId = searchParams.get("houseId");
    if (houseId) {
      const id = parseInt(houseId);
      setActiveHouse(id);
      handleHouseClick(id);
    } else {
      setActiveHouse(keyHouses[0].id);
      handleHouseClick(keyHouses[0].id);
    }
  }, [location.search]);

  const getImage = (id: number, type: "house" | "character") => {
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

  const fetchCharacterDetails = async (url: string | null) => {
    if (!url) return null;
    const id = url.split("/").pop();
    if (id) {
      return await fetchCharacter(id);
    }
    return null;
  };

  const handleHouseClick = async (id: number) => {
    const houseDetails = await fetchHouse(id.toString());
    setSelectedHouse(houseDetails);
    setCurrentPage(1);

    // Update URL with the selected house ID
    navigate(`?houseId=${id}`, { replace: true });

    // Find the house based on the id and use its shortName for the background
    const selectedHouse = keyHouses.find(house => house.id === id);
    setCurrentBackground(selectedHouse 
      ? houseBackgrounds[selectedHouse.shortName] 
      : houseBackgrounds.default
    );

    // Fetch current lord
    setCurrentLord(await fetchCharacterDetails(houseDetails.currentLord));

    // Fetch heir
    setHeir(await fetchCharacterDetails(houseDetails.heir));

    // Fetch sworn members names
    const swornMemberPromises = houseDetails.swornMembers.map(async (url) => {
      const character = await fetchCharacterDetails(url);
      return character ? character.name : "Unknown Member";
    });
    const swornMemberNames = await Promise.all(swornMemberPromises);
    setSwornMembers(swornMemberNames);
  };

  const CharacterDisplay = ({
    character,
    title,
  }: {
    character: Character | null;
    title: string;
  }) => {
    if (!character) return null;
    return (
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-4 text-[#f9da5c] uppercase">
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
          />
          <div>
            <p className="font-bold">{character.name}</p>
            <p>{character.titles.join(", ")}</p>
          </div>
        </div>
      </div>
    );
  };

  const SwornMembersPagination = () => {
    const pageCount = Math.ceil(swornMembers.length / membersPerPage);
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = swornMembers.slice(
      indexOfFirstMember,
      indexOfLastMember
    );

    return (
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-4 text-[#f9da5c] uppercase">
          Sworn Members
        </h3>
        <ul className="list-none pl-0">
          {currentMembers.map((member, index) => (
            <li key={index}>
              <span className="mr-3">➳</span>
              {member}
            </li>
          ))}
        </ul>
        <div className="flex gap-x-3 items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-gray-800 text-gray-200 rounded border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 shadow-md hover:shadow-lg"
            aria-label="Previous page"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
            className="p-2 bg-gray-800 text-gray-200 rounded border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 shadow-md hover:shadow-lg"
            aria-label="Next page"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto flex flex-row h-[100vh] overflow-hidden">
      <div className="w-1/2">
        <nav aria-label="House list" className="h-[100vh]">
          <ul className="grid grid-cols-5 flex-row h-[100vh]">
            {keyHouses.map((house) => (
              <li
                key={house.id}
                className={`transition-all duration-300 ${
                  activeHouse === house.id
                    ? "z-10 scale-110"
                    : "opacity-50 scale-100"
                }`}
                onMouseEnter={() => setActiveHouse(house.id)}
                onMouseLeave={() => {
                  const searchParams = new URLSearchParams(location.search);
                  const houseId = searchParams.get("houseId");
                  setActiveHouse(houseId ? parseInt(houseId) : keyHouses[0].id);
                }}
                onClick={() => handleHouseClick(house.id)}
              >
                <div className="flex items-center justify-center hover:shadow-lg transition-shadow max-w-fit cursor-pointer">
                  <img
                    src={getImage(house.id, "house")}
                    alt={house.name}
                    className="w-auto h-screen max-h-screen object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className="w-1/2 p-8 max-h-[100vh] overflow-y-scroll"
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundSize: "550px",
        }}
      >
        <h1 className="thrones-font text-lg font-bold fixed right-8">Houses</h1>
        <div className="text-[#f9da5c] text-md font-bold fixed bottom-[2rem] right-8 uppercase">
        <Link to="/" className="tracking-widest">Home</Link>
        <Link to="/characters" className="ml-4 tracking-widest">Characters</Link>
        </div>
        {selectedHouse ? (
          <div>
            <h2 className="text-3xl font-bold mb-4 thrones-font tracking-widest max-w-[48%]">
              {selectedHouse.name}
            </h2>
            <h3 className="text-xl font-bold mb-4 text-[#f9da5c] uppercase">
              {selectedHouse.region}
            </h3>
            <p>
              <strong>Coat of Arms:</strong> {selectedHouse.coatOfArms}
            </p>
            <p>
              <strong>Words:</strong> {selectedHouse.words}
            </p>
            <p>
              <strong>Titles:</strong> {selectedHouse.titles.join(", ")}
            </p>
            <p>
              <strong>Seats:</strong> {selectedHouse.seats.join(", ")}
            </p>

            <CharacterDisplay character={currentLord} title="Current Lord" />
            <CharacterDisplay character={heir} title="Heir" />
            <SwornMembersPagination />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">
              Select a house to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}