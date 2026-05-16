"use client";

import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/types/character";
import { Element } from "@/types/element";
import { getStarRailElements, getStarRailCharacters } from "@/lib/api/starrail";

export default function Home() {
	const [selectedElement, setSelectedElement] = useState("All");
	const [search, setSearch] = useState("");
	const [characters, setCharacters] = useState<Character[]>([]);
	const [elements, setElements] = useState<Element[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);

				const [charactersData, elementsData] = await Promise.all([
					getStarRailCharacters(),
					getStarRailElements(),
				]);

				setCharacters(charactersData);
				setElements(elementsData);
			} catch (error) {
				setError("Failed to load data");

				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	if (error) {
		return <div className="p-6 text-red-500">{error}</div>;
	}

	if (loading) {
		return <div className="p-6">Loading characters...</div>;
	}

	return (
		<main className="p-6">
			<h1 className="text-3xl font-bold mb-6">Honkai Star Rail Database</h1>

			<div className="flex flex-col gap-4 mb-6">
				<input
					type="text"
					placeholder="Search character..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="border px-4 py-2 rounded"
				/>

				<div className="flex flex-wrap gap-2">
					<button
						onClick={() => setSelectedElement("All")}
						className={`border px-4 py-2 rounded ${
							selectedElement === "All" ? "bg-blue-500 text-white" : ""
						}`}
					>
						All
					</button>

					{elements.map((element) => (
						<button
							key={element.id}
							onClick={() => setSelectedElement(element.name)}
							className={`border px-4 py-2 rounded ${
								selectedElement === element.name ? "bg-blue-500 text-white" : ""
							}`}
						>
							{element.name}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
				{characters
					.filter((char) => {
						const matchesElement =
							selectedElement === "All" ||
							char.element.name === selectedElement;

						const matchesSearch = char.name
							.toLowerCase()
							.includes(search.toLowerCase());

						return matchesElement && matchesSearch;
					})
					.map((char) => (
						<CharacterCard key={char.id} {...char} />
					))}
			</div>
		</main>
	);
}
