import React from 'react';
import { Character, House } from '../../types';
import { getCharacterImage } from '../../utils/imageHelpers';

interface CharacterDetailsProps {
  character: Character;
  houses: House[];
  onClose: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character, houses, onClose }) => {
  return (
    <div className="bg-[#131415] rounded-lg shadow-lg p-8 mt-16">
      <button
        onClick={onClose}
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
        {character.name}
      </h2>
      <p className="mb-6 muted text-sm">
        {character.titles.join(", ")}
      </p>
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        <img
          src={getCharacterImage(character.name)}
          alt={character.name}
          className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="w-full md:w-2/3">
          <p>
            Hailing from the {character.culture} culture and
            born on {character.born}.
          </p>
          <p>
            Also known by the aliases:{" "}
            {character.aliases.join(", ")}.
          </p>
          <br />
          <p>
            This character is portrayed in the TV series Game of
            Thrones by {character.playedBy.join(", ")} and
            appears in the following seasons of the TV series:{" "}
            {character.tvSeries.join(", ")}.
          </p>
          <div className="mt-8">
            <div className="w-full">
              <div className="grid grid-cols-1">
                {houses.map((house) => (
                  <div
                    key={house.name}
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
    </div>
  );
};

export default CharacterDetails;