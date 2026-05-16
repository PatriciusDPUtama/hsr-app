import { NextResponse } from "next/server";
import { getStarRailCharacters } from "@/lib/api/starrail";

export async function GET() {
	try {
		const characters = await getStarRailCharacters();

		return NextResponse.json(characters);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to fetch characters",
			},
			{ status: 500 },
		);
	}
}
