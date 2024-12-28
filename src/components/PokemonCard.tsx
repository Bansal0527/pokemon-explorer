import { Pokemon } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  onClick: () => void;
}

export const PokemonCard = ({
  pokemon,
  isFavorite,
  onFavoriteClick,
  onClick,
}: PokemonCardProps) => {
  return (
    <Card
      className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:animate-card-hover"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 z-10">
        <Heart
          className={cn(
            "w-6 h-6 cursor-pointer transition-colors",
            isFavorite ? "fill-pokemon-red text-pokemon-red" : "text-gray-400"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick();
          }}
        />
      </div>
      <div className="p-4">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold capitalize text-center mb-2">
          {pokemon.name}
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-3 py-1 rounded-full text-sm bg-pokemon-blue text-white"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};