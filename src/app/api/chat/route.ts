import { generateResponse } from "@/utils/vectordb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json(
        { success: false, message: "Missing query" },
        { status: 404 }
      );
    }

    const response = await generateResponse(query);
    return NextResponse.json(
      { success: true, message: "answer generated", response },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
