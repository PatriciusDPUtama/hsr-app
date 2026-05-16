import { getStarRailCharacters } from "@/lib/api/starrail";

type CharacterPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function CharacterPage({ params }: CharacterPageProps) {
	const { id } = await params;

	const characters = await getStarRailCharacters();

	const character = characters.find((char) => String(char.id) === String(id));

	if (!character) {
		return <div className="p-6">Character not found</div>;
	}

	return (
		<main className="p-6">
			<h1 className="text-3xl font-bold">{character.name}</h1>

			<p className="mt-4">Element: {character.element.name}</p>

			<p>Path: {character.path.name}</p>
		</main>
	);
}
