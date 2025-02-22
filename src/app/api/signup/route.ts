import prisma from "@/db/connectDb";
import { signupSchema } from "@/schema/signupschema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { data, error } = signupSchema.safeParse(await req.json());
    console.log("data:", data)
    if (error) {
      return NextResponse.json(
        { success: false, message: error.issues.map((err) => err.message) },
        { status: 400 }
      );
    }
    if (data) {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ username: data.username }, { email: data.email }],
        },
      });
      if (user) {
        return NextResponse.json(
          { success: false, message: "user already exists" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: hashedPassword,
        },
      });
    }

    return NextResponse.json(
        { success: true, message: "Sign up successful" },
        { status: 201 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Interanl server error" },
      { status: 500 }
    );
  }
}
