import { Pokemon } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PokemonModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonModal = ({
  pokemon,
  isOpen,
  onClose,
}: PokemonModalProps) => {
  if (!pokemon) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize text-center">
            {pokemon.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 p-4">
          <div className="flex justify-center items-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-full max-w-[300px]"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Types</h3>
              <div className="flex gap-2">
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
            <div>
              <h3 className="font-semibold mb-2">Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex items-center gap-2">
                    <span className="capitalize w-24">{stat.stat.name}:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pokemon-red h-2 rounded-full"
                        style={{
                          width: `${(stat.base_stat / 255) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-12 text-right">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 rounded-full text-sm bg-pokemon-yellow text-black"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};