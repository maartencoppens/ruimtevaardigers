import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "name, email and password are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const existing = await prisma.users.findFirst({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 12);

    await prisma.users.create({
      data: {
        name,
        email,
        password: passwordHash,
        Role: "USER",
      },
    });

    return NextResponse.json({ message: "User created successfully." });
  } catch {
    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 },
    );
  }
}
