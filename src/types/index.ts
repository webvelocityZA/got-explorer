
  
  export interface House {
    id: number;
    name: string;
    region: string;
    coatOfArms: string;
    words: string;
    titles: string[];
    seats: string[];
    currentLord: string | null;
    heir: string | null;
    swornMembers: string[];
  }
  
  export interface KeyHouse {
    id: number;
    name: string;
    shortName: string;
  }
  
  export interface SwornMember {
    id: string;
    name: string;
  }

  export interface Character {
    id: number;
    name: string;
    titles: string[];
    culture: string;
    born: string;
    aliases: string[];
    playedBy: string[];
    tvSeries: string[];
    allegiances: string[];
  }
  
  export interface KeyCharacter {
    id: number;
    name: string;
  }

  export interface MCharacter {
    url: string;
    name: string;
    titles: string[];
  }