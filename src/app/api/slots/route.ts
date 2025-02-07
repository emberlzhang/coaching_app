import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { coachId, startTime } = await request.json();

    // Validate coach exists and is a coach
    const coach = await prisma.user.findFirst({
      where: {
        id: coachId,
        isCoach: true,
      },
    });

    if (!coach) {
      return NextResponse.json({ error: "Coach not found" }, { status: 404 });
    }

    // Create slot
    const slot = await prisma.timeSlot.create({
      data: {
        coachId,
        startTime: new Date(startTime),
        isBooked: false,
      },
    });

    return NextResponse.json(slot);
  } catch (error) {
    console.error("Error creating slot:", error);
    return NextResponse.json({ error: "Error creating slot" }, { status: 500 });
  }
}
