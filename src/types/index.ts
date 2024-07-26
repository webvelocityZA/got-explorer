export interface Character {
    url: string;
    name: string;
    titles: string[];
  }
  
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