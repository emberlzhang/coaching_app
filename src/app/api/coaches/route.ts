import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const coaches = await prisma.user.findMany({
      where: {
        isCoach: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(coaches);
  } catch (error) {
    console.error("Error fetching coaches:", error);
    return NextResponse.json(
      { error: "Error fetching coaches" },
      { status: 500 }
    );
  }
}
