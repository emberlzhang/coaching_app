"use client";

import { format } from "date-fns";
import { useState, useEffect } from "react";

interface Slot {
  id: number;
  startTime: string;
  isBooked: boolean;
}

export default function SlotsList({ coachId }: { coachId: number }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, [coachId]);

  const fetchSlots = async () => {
    try {
      const response = await fetch(`/api/slots/coach/${coachId}`);
      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading slots...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Your Upcoming Slots</h2>
      {slots.length === 0 ? (
        <p className="text-gray-500">No upcoming slots found</p>
      ) : (
        <div className="grid gap-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {format(new Date(slot.startTime), "MMMM d, yyyy")}
                  </p>
                  <p className="text-gray-600">
                    {format(new Date(slot.startTime), "h:mm a")} -{" "}
                    {format(
                      new Date(slot.startTime).getTime() + 2 * 60 * 60 * 1000,
                      "h:mm a"
                    )}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    slot.isBooked
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {slot.isBooked ? "Booked" : "Available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
