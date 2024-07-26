import React from "react";
import { Link } from "react-router-dom";
import { House, Character, SwornMember } from "../../types";
import CharacterDisplay from "./CharacterDisplay";
import SwornMembersPagination from "./SwornMembersPagination";

interface HouseDetailsProps {
  selectedHouse: House | null;
  currentLord: Character | null;
  heir: Character | null;
  swornMembers: SwornMember[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  membersPerPage: number;
  currentBackground: string;
}

const HouseDetails: React.FC<HouseDetailsProps> = ({
  selectedHouse,
  currentLord,
  heir,
  swornMembers,
  currentPage,
  setCurrentPage,
  membersPerPage,
  currentBackground,
}) => {
  if (!selectedHouse) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl text-gray-500">Select a house to view details</p>
      </div>
    );
  }

  return (
    <div
      className="w-full md:w-1/2 p-8 md:max-h-[100vh] overflow-y-scroll"
      style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
        backgroundSize: "550px",
      }}
    >
      <h1 className="thrones-font hidden md:block md:text-lg font-bold absolute md:fixed right-8 z-50">
        Houses
      </h1>
      <div className="text-[#f9da5c] text-md font-bold fixed bottom-[2rem] right-0 md:right-8 uppercase z-50 rotate-90 md:rotate-0 -translate-y-24 md:-translate-y-0 translate-x-20 md:-translate-x-0 opacity-50 md:opacity-100">
        <Link to="/" className="tracking-widest">
          Home
        </Link>
        <Link to="/characters" className="ml-4 tracking-widest">
          Characters
        </Link>
      </div>
      <div>
        <h2 className="text-md md:text-3xl font-bold mb-4 thrones-font tracking-widest md:max-w-[48%]">
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
        <SwornMembersPagination
          swornMembers={swornMembers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          membersPerPage={membersPerPage}
        />
      </div>
    </div>
  );
};

export default HouseDetails;
