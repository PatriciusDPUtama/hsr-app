import type { Character } from "@/types/character";

export async function getCharacters(): Promise<Character[]> {
	const [charRes, pathRes, elemRes] = await Promise.all([
		fetch("https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/en/characters.json"),
		fetch("https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/en/paths.json"),
		fetch("https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/en/elements.json"),
	]);

	const charactersRaw = await charRes.json();
	const paths = await pathRes.json();
	const elements = await elemRes.json();

	return Object.values(charactersRaw).map((c: any): Character => ({
		id: c.id,
		name: c.name,
		rarity: c.rarity,
		path: paths[c.path]?.name ?? c.path,
		element: elements[c.element]?.name ?? c.element,
		image: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${c.icon}`,
	}));
}

export async function findCharacter(id: string): Promise<Character | undefined> {
	const characters = await getCharacters();

	return characters.find(
		(char) => String(char.id) === String(id)
	);
}