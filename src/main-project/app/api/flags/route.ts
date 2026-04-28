import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  return NextResponse.json(
    await prisma.flag.findMany({ orderBy: { createdAt: "desc" } }),
  );
}

export async function POST(req: Request) {
  const data = await req.json();
  const planetId =
    data.planetId === null || data.planetId === undefined
      ? null
      : Number(data.planetId);

  if (planetId !== null && !Number.isInteger(planetId)) {
    return NextResponse.json(
      { error: "planetId must be an integer" },
      { status: 400 },
    );
  }

  const flag = await prisma.flag.create({
    data: {
      initials: data.initials,
      pattern: data.pattern,
      planetId,
    },
  });
  const flags = await prisma.flag.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ flag, flags });
}
