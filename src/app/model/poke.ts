export interface Poke {
    id: string;
    name: string;
    img: string;
    type: string[];
    stats: Stats;
    moves: Moves;
    damages: Damages;
    misc: Misc;
}

export interface Stats {
    hp: number;
    attack: string;
    defense: string;
    spattack: string;
    spdefense: string;
    speed: number;
}

export interface Level {
    learnedat: string;
    name: string;
    gen: string;
}

export interface Tmhm {
    learnedat: string;
    name: string;
    gen: string;
}

export interface Egg {
    name: string;
    gen: string;
}

export interface Tutor {
    name: string;
    gen: string;
}

export interface Gen34 {
    name: string;
    method: string;
}

export interface Moves {
    level: Level[];
    tmhm: Tmhm[];
    egg: Egg[];
    tutor: Tutor[];
    gen34: Gen34[];
}

export interface Damages {
    normal: string;
    fire: string;
    water: string;
    electric: string;
    grass: string;
    ice: string;
    fight: string;
    poison: string;
    ground: string;
    flying: string;
    psychic: string;
    bug: string;
    rock: string;
    ghost: string;
    dragon: string;
    dark: string;
    steel: string;
}

export interface Sex {
    male: number;
    female: string;
}

export interface Abilities {
    normal: string[];
    hidden: string[];
}

export interface Misc {
    sex: Sex;
    abilities: Abilities;
    classification: string;
    height: string;
    weight: string;
    capturerate: number;
    eggsteps: string;
    expgrowth: string;
    happiness: string;
    evpoints: string[];
    fleeflag: string;
    entreeforestlevel: string;
}

export interface CustomPokeStats {
    name: string,
    value: number,
}