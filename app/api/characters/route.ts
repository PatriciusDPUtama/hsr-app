import { NextResponse } from "next/server";
import { loadCharacters, getCharacters } from "@/lib/data";

export async function GET() {
    await loadCharacters(); // IMPORTANT

    return Response.json(getCharacters());
}