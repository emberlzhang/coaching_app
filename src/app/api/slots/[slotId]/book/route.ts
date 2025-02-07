import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { slotId: string } }
) {
  try {
    const slotId = parseInt(params.slotId);
    const { studentId } = await request.json();

    const updatedSlot = await prisma.timeSlot.update({
      where: {
        id: slotId,
        isBooked: false,
      },
      data: {
        isBooked: true,
        studentId,
      },
    });

    return NextResponse.json(updatedSlot);
  } catch (error) {
    return NextResponse.json({ error: "Error booking slot" }, { status: 500 });
  }
}
