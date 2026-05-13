import { NextResponse } from "next/server";
import { characters } from "@/lib/data";

export async function GET() {F
    return NextResponse.json(characters);
}