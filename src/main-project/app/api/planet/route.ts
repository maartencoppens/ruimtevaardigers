import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  const planetIdParam = request.nextUrl.searchParams.get("planetId");

  if (!planetIdParam) {
    return NextResponse.json(
      { error: "Missing planetId query parameter" },
      { status: 400 },
    );
  }

  const planetId = Number(planetIdParam);

  if (!Number.isInteger(planetId) || planetId <= 0) {
    return NextResponse.json(
      { error: "planetId must be a positive integer" },
      { status: 400 },
    );
  }

  const planet = await prisma.planeet.findUnique({
    where: { id: planetId },
  });

  if (!planet) {
    return NextResponse.json({ error: "Planet not found" }, { status: 404 });
  }

  return NextResponse.json(planet);
}
