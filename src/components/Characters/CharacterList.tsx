import React from 'react';
import { KeyCharacter } from '../../types';
import { getCharacterImage } from '../../utils/imageHelpers';

interface CharacterListProps {
  characters: KeyCharacter[];
  onCharacterSelect: (id: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onCharacterSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
      {characters.map((char) => (
        <div
          key={char.id}
          className="group cursor-pointer"
          onClick={() => onCharacterSelect(char.id)}
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
  );
};

export default CharacterList;