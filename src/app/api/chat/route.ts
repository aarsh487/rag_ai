import { generateResponse } from "@/utils/vectordb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    console.log(query)
    if (!query) {
      return NextResponse.json(
        { success: false, message: "Missing query" },
        { status: 404 }
      );
    }

    const response = await generateResponse(query);
    console.log("response", response.content)
    return NextResponse.json(
      { success: true, message: "answer generated", response: response.content },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
