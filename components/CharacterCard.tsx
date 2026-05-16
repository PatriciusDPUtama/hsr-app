import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types/character";

const elementBorders: Record<string, string> = {
	fire: "border-red-500/70",
	ice: "border-cyan-400/70",
	lightning: "border-purple-500/70",
	wind: "border-emerald-500/70",
	quantum: "border-fuchsia-500/70",
	imaginary: "border-yellow-400/70",
	physical: "border-zinc-400/70",
};

export default function CharacterCard({
	id,
	name,
	rarity,
	element,
	path,
	image,
}: Character) {
	const borderColor = elementBorders[element.name.toLowerCase()] ?? "border-white/10";
	return (
		<Link href={`/characters/${id}`} className="group block">
			<div
				className={`
					relative h-[500px] overflow-hidden rounded-2xl
					bg-zinc-900 shadow-xl border
					${borderColor}
					transition-all duration-500
					group-hover:-translate-y-2
					group-hover:shadow-2xl
				`}
			>
				{/* Background Image */}
				<Image
					src={image}
					alt={name}
					fill
					className="
						object-cover
						transition-transform duration-700
						group-hover:scale-110
					"
					sizes="(max-width: 768px) 100vw, 33vw"
				/>

				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

				{/* Top Icons */}
				<div className="absolute top-4 left-4 right-4 flex items-center justify-between">
					{/* Path */}
					<Image
						src={path.icon}
						alt={path.name}
						width={30}
						height={30}
						className="
							object-contain
							drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]
						"
					/>

					{/* Element */}
					<Image
						src={element.icon}
						alt={element.name}
						width={30}
						height={30}
						className="
							object-contain
							drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]
						"
					/>
				</div>

				{/* Name + Rarity */}
				<div className="absolute bottom-0 left-0 w-full p-5 text-white">
					<h2 className="text-3xl font-bold drop-shadow-lg">
						{name}
					</h2>

					<div className="mt-1 flex gap-1">
						{Array.from({ length: rarity }).map((_, i) => (
							<span
								key={i}
								className="text-yellow-400 text-sm drop-shadow"
							>
								★
							</span>
						))}
					</div>
				</div>
			</div>
		</Link>
	);
}