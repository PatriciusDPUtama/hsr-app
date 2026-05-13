// import { characters } from "@/lib/data";
import { Character } from "@/types/character";


type CharacterPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function CharacterPage({ params }: CharacterPageProps) {
	const { id } = await params;
	const character: Character | undefined =
		characters.find(
			(char) => char.id === id
		);
	if (!character) {
		return <div className="p-6">Character not found</div>;
	}

	return (
		<main className="p-6">
			<h1 className="text-3xl font-bold">{character.name}</h1>
			<p className="mt-4">Element: {character.element}</p>
			<p>Path: {character.path}</p>
		</main>
	);
}
