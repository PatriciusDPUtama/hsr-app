"use client";
import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/types/character";

const elements = ["All", "Lightning", "Wind", "Ice"];
const [characters, setCharacters] = useState<Character[]>([]);

export default function Home() {
	const [selectedElement, setSelectedElement] = useState("All");
	const [search, setSearch] = useState("");

	useEffect(() => {
		async function fetchCharacters() {
			const response = await fetch(
				"/api/characters"
			);
			const data: Character[] = await response.json();

			setCharacters(data);
		}
		fetchCharacters();
	}, []);

	return (
		<main className="p-6">
			<h1 className="text-3xl font-bold mb-6">Honkai Star Rail Database</h1>
			<div className="flex gap-2 mb-6">
				{elements.map((element) => (
					<button
						key={element}
						onClick={() => setSelectedElement(element)}
						className={`border px-4 py-2 rounded ${selectedElement === element ? "bg-blue-500 text-white" : ""
							}`}
					>
						{element}
					</button>
				))}
				<input
					type="text"
					placeholder="Search character..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="border px-4 py-2 rounded w-full mb-6"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{characters
					.filter((char) => {
						const matchesElement =
							selectedElement === "All" || char.element === selectedElement;

						const matchesSearch = char.name
							.toLowerCase()
							.includes(search.toLowerCase());

						return matchesElement && matchesSearch;
					})
					.map((char) => (
						<CharacterCard
							key={char.id}
							id={char.id}
							name={char.name}
							element={char.element}
							path={char.path}
							image={char.image}
						/>
					))}
			</div>
		</main>
	);
}
