type CharacterCardProps = {
    name: string;
    element: string;
    path: string;
    rarity: string;
    faction: string;
};

export default function CharacterCard({
    name,
    element,
    path,
    rarity,
    faction,
}: CharacterCardProps) {
    return (
        <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">
                {name}
            </h2>
            <p>Rarity: {rarity}</p>
            <p>Element: {element}</p>
            <p>Path: {path}</p>
            <p>Faction: {faction}</p>
        </div>
    );
}