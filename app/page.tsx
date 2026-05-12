import { characters } from "@/lib/data";
import CharacterCard from "@/components/CharacterCard";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Honkai Star Rail Database
      </h1>

      <div className="space-y-4">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            name={char.name}
            element={char.element}
            path={char.path}
            rarity={char.rarity}
            faction={char.faction}
          />
        ))}
      </div>
    </main>
  );
}