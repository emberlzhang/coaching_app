import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { coachId: string } }
) {
  try {
    const coachId = parseInt(params.coachId);
    const slots = await prisma.timeSlot.findMany({
      where: {
        coachId,
        startTime: {
          gte: new Date(),
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Error fetching slots" },
      { status: 500 }
    );
  }
}
