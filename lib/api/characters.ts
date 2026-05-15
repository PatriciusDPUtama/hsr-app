import { API_URL } from "./config";
import { Character } from "@/types/character";

export async function getCharacters(): Promise<
	Character[]
> {
	const response = await fetch(
		`${API_URL}/api/characters`
	);

	if (!response.ok) {
		throw new Error(
			"Failed to fetch characters"
		);
	}

	return response.json();
}