"use client";
import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/types/character";
import { getCharacters } from "@/lib/api/characters";

const elements = ["All", "Lightning", "Wind", "Ice"];

export default function Home() {
	const [selectedElement, setSelectedElement] = useState("All");
	const [search, setSearch] = useState("");
	const [characters, setCharacters] = useState<Character[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCharacters() {
			try {
				setLoading(true);

				const data = await getCharacters();
				setCharacters(data);
			} catch (error) {
				setError("Failed to load characters");
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchCharacters();
	}, []);

	if (error) {
		return (
			<div className="p-6 text-red-500">
				{error}
			</div>
		);
	}

	if (loading) {
		return (
			<div className="p-6">
				Loading characters...
			</div>
		);
	}

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
