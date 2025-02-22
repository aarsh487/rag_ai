import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/db/connectDb";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id : string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication error" },
        { status: 404 }
      );
    }
    const noteId = (await params).id;
    const userId = session.user.id;

    const note = await prisma.notes.findUnique({
        where: {
            id: noteId,
            userId
        }
    })

    if(!note){
        return NextResponse.json(
            { success: false, message: "No note found" },
            { status: 404 }
          ); 
    }

    await prisma.notes.delete({
        where: {
            id: noteId
        }
    })

    return NextResponse.json(
      { success: true, message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
