export interface PokemonApiResponse {
  habitat: Habitat;
  is_legendary: boolean;
  name: string;
  flavor_text_entries: FlavorTextEntry[];
}

export interface Habitat {
  name: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface Pokemon {
  name: string;
  description: string;
  habitat: string;
  isLegendary: boolean;
}

export enum PokemonFailure {
  NotFound,
}
