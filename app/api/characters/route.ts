import { getCharacters } from "@/lib/data";

export async function GET() {
    const characters = await getCharacters();
    return Response.json(characters);
}