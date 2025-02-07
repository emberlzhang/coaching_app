import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const slots = await prisma.timeSlot.findMany({
      where: {
        isBooked: false,
        startTime: {
          gte: new Date(),
        },
      },
      include: {
        coach: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(slots);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching slots" },
      { status: 500 }
    );
  }
}
