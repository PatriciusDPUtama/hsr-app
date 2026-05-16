import { Character } from "@/types/character";
import { Element } from "@/types/element";
import { Path } from "@/types/path";
import {
	StarRailCharacter,
	StarRailElement,
	StarRailPath,
} from "@/types/starrail";

const BASE_URL =
	"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/en";

export async function getStarRailPaths(): Promise<Path[]> {
	const response = await fetch(`${BASE_URL}/paths.json`);

	const data: Record<string, StarRailPath> = await response.json();

	return Object.values(data).map((path) => ({
		...path,

		icon: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${path.icon}`,
	}));
}

export async function getStarRailElements(): Promise<Element[]> {
	const response = await fetch(`${BASE_URL}/elements.json`);

	const data: Record<string, StarRailElement> = await response.json();

	return Object.values(data).map((element) => ({
		...element,

		icon: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${element.icon}`,
	}));
}

export async function getStarRailCharacters(): Promise<Character[]> {
	const [charactersResponse, elements, paths] = await Promise.all([
		fetch(`${BASE_URL}/characters.json`),

		getStarRailElements(),

		getStarRailPaths(),
	]);

	const charactersData: Record<string, StarRailCharacter> =
		await charactersResponse.json();

	const elementsData = Object.fromEntries(
		elements.map((element) => [element.id, element]),
	);

	const pathsData = Object.fromEntries(paths.map((path) => [path.id, path]));

	return Object.values(charactersData).map((char) => ({
		id: String(char.id),
		name: char.name,
		rarity: Number(char.rarity),
		element: elementsData[char.element]!,
		path: pathsData[char.path]!,
		image: `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/${char.id}.png`,
	}));
}
