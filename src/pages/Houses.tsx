import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HouseDetails from "../components/Houses/HouseDetails";
import HouseList from "../components/Houses/HouseList";
import { Character, House, SwornMember } from "../types";
import { fetchCharacter, fetchHouse } from "../utils/api";
import { keyHouses } from "../utils/houseData";
import { houseBackgrounds } from "../utils/imageHelpers";

export default function Houses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeHouse, setActiveHouse] = useState<number | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [currentLord, setCurrentLord] = useState<Character | null>(null);
  const [heir, setHeir] = useState<Character | null>(null);
  const [swornMembers, setSwornMembers] = useState<SwornMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBackground, setCurrentBackground] = useState(
    houseBackgrounds.default
  );
  const membersPerPage = 10;

  const fetchCharacterDetails = useCallback(async (url: string) => {
    if (!url) return null;
    const id = url.split("/").pop();
    if (id) {
      return await fetchCharacter(id);
    }
    return null;
  }, []);

  const handleHouseClick = useCallback(
    async (id: { toString: () => string }) => {
      const houseDetails = await fetchHouse(id.toString());
      setSelectedHouse({ ...houseDetails, id: parseInt(id.toString()) });
      setCurrentPage(1);

      navigate(`?houseId=${id}`, { replace: true });

      const selectedHouse = keyHouses.find((house) => house.id === id);
      setCurrentBackground(
        selectedHouse
          ? houseBackgrounds[
              selectedHouse.shortName as keyof typeof houseBackgrounds
            ]
          : houseBackgrounds.default
      );

      const currentLordDetails = await fetchCharacterDetails(
        houseDetails.currentLord
      );
      if (currentLordDetails) setCurrentLord(currentLordDetails as Character);

      const heirDetails = await fetchCharacterDetails(houseDetails.heir);
      if (heirDetails) setHeir(heirDetails as Character);

      const swornMemberPromises = houseDetails.swornMembers.map(async (url) => {
        const character = await fetchCharacterDetails(url);
        return character
          ? { id: character.url.split("/").pop() || "", name: character.name }
          : { id: "", name: "Unknown Member" };
      });
      const swornMemberDetails = await Promise.all(swornMemberPromises);
      setSwornMembers(swornMemberDetails);
    },
    [fetchCharacterDetails, navigate]
  );

  useEffect(() => {
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
  }, [location.search, handleHouseClick]);

  return (
    <div className="mx-auto flex flex-col md:flex-row min-h-[100vh] md:h-[100vh] overflow-hidden">
      <div className="w-full md:w-1/2">
        <HouseList
          keyHouses={keyHouses}
          activeHouse={activeHouse}
          setActiveHouse={setActiveHouse}
          handleHouseClick={handleHouseClick}
        />
      </div>
      <HouseDetails
        selectedHouse={selectedHouse}
        currentLord={currentLord}
        heir={heir}
        swornMembers={swornMembers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        membersPerPage={membersPerPage}
        currentBackground={currentBackground}
      />
    </div>
  );
}
