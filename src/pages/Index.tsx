import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonTypes,
  type Pokemon,
} from "@/lib/api";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonModal } from "@/components/PokemonModal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 20;

const Index = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("pokemonFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  const { data: pokemonList, isLoading: isLoadingList } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE),
  });

  const { data: types } = useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: fetchPokemonTypes,
  });

  const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["pokemonDetails", pokemonList?.results],
    queryFn: async () => {
      if (!pokemonList?.results) return [];
      const details = await Promise.all(
        pokemonList.results.map((pokemon) => fetchPokemonDetails(pokemon.name))
      );
      return details;
    },
    enabled: !!pokemonList?.results,
  });

  useEffect(() => {
    localStorage.setItem("pokemonFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonId: number) => {
    setFavorites((prev) =>
      prev.includes(pokemonId)
        ? prev.filter((id) => id !== pokemonId)
        : [...prev, pokemonId]
    );
  };

  const filteredPokemon = pokemonDetails?.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      !selectedType ||
      pokemon.types.some((type) => type.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  const isLoading = isLoadingList || isLoadingDetails;

  return (
    <div className="container py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Pokedex Lite</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-64"
        />
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {types?.map((type: { name: string }) => (
              <SelectItem key={type.name} value={type.name}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {filteredPokemon?.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={favorites.includes(pokemon.id)}
                onFavoriteClick={() => toggleFavorite(pokemon.id)}
                onClick={() => setSelectedPokemon(pokemon)}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={!pokemonList?.next}
            >
              Next
            </Button>
          </div>
        </>
      )}

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
};

export default Index;