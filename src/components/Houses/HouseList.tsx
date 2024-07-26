import React from "react";
import { KeyHouse } from "../../types";
import { getImage } from "../../utils/imageHelpers";

interface HouseListProps {
  keyHouses: KeyHouse[];
  activeHouse: number | null;
  setActiveHouse: (id: number) => void;
  handleHouseClick: (id: number) => void;
}

const HouseList: React.FC<HouseListProps> = ({
  keyHouses,
  activeHouse,
  setActiveHouse,
  handleHouseClick,
}) => {
  return (
    <nav aria-label="House list" className="md:h-[100vh]">
      <ul className="grid grid-cols-5 flex-row h-[50vh] md:h-[100vh]">
        {keyHouses.map((house) => (
          <li
            key={house.id}
            className={`transition-all duration-300 ${
              activeHouse === house.id
                ? "z-10 scale-110"
                : "opacity-50 scale-100"
            }`}
            onMouseEnter={() => setActiveHouse(house.id)}
            onMouseLeave={() => setActiveHouse(keyHouses[0].id)}
            onClick={() => handleHouseClick(house.id)}
          >
            <div className="flex items-center justify-center hover:shadow-lg transition-shadow max-w-fit cursor-pointer">
              <img
                src={getImage(house.id, "house")}
                alt={house.name}
                className="w-auto h-[50vh] md:h-screen md:max-h-screen object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HouseList;
