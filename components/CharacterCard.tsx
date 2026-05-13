import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types/character";

type CharacterCardProps = Character;

export default function CharacterCard({
	id,
	name,
	element,
	path,
	image,
}: CharacterCardProps) {
	return (
		<Link href={`/characters/${id}`} className="block">
			<div className="border rounded-xl overflow-hidden hover:scale-[1.02] transition cursor-pointer bg-white">
				<div className="relative w-full h-64">
					<Image src={image} alt={name} fill className="object-cover" />
				</div>

				<div className="p-4">
					<h2 className="text-xl font-bold">{name}</h2>

					<p className="text-sm text-gray-600">Element: {element}</p>

					<p className="text-sm text-gray-600">Path: {path}</p>
				</div>
			</div>
		</Link>
	);
}
