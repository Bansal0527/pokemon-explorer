import { toast } from "@/components/ui/use-toast";

export interface Pokemon {
  id: number;
  name: string;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (offset: number = 0, limit: number = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch Pokemon list");
    const data: PokemonListResponse = await response.json();
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch Pokemon list. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

export const fetchPokemonDetails = async (nameOrId: string | number) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) throw new Error("Failed to fetch Pokemon details");
    const data: Pokemon = await response.json();
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch Pokemon details. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

export const fetchPokemonTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/type`);
    if (!response.ok) throw new Error("Failed to fetch Pokemon types");
    const data = await response.json();
    return data.results;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch Pokemon types. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};