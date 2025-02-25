import prisma from "@/db/connectDb";
import { noteSchema } from "@/schema/noteSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { storeText } from "@/utils/vectordb";

export async function POST(req: NextRequest) {
  try {
    const { data, error } = noteSchema.safeParse(await req.json());
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication error" },
        { status: 404 }
      );
    }

    const userId = session.user.id;

    if (error) {
      return NextResponse.json(
        { success: false, message: error.issues.map((err) => err.message) },
        { status: 403 }
      );
    }
    if (data) {
      const newNote = await prisma.notes.create({
        data: {
          title: data.title,
          note: data.note,
          userId
        },
      });
      if(data.note){
        await storeText(data.title, data.note)
      }

      
      return NextResponse.json(
        { success: true, message: "Note added successfully", newNote },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};


export async function GET(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(
          { success: false, message: "Authentication error" },
          { status: 404 }
        );
      }
  
      const userId = session.user.id;

      const notes = await prisma.notes.findMany({
        where: {
            userId
        }
      })
      if(!notes){
        return NextResponse.json(
            { success: false, message: "No note found" },
            { status: 404 }
          );
      }
        return NextResponse.json(
          { success: true, message: "Note found successfully", notes },
          { status: 200 }
        );
      
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  };
  
  
  