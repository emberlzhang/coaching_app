"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

interface Coach {
  id: number;
  name: string;
}

interface Slot {
  id: number;
  startTime: string;
  isBooked: boolean;
  coach: {
    name: string;
  };
}

export default function StudentDashboard() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const studentId = 6;

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch("/api/slots/available");
      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const bookSlot = async (slotId: number) => {
    try {
      const response = await fetch(`/api/slots/${slotId}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      });

      if (!response.ok) throw new Error("Booking failed");

      fetchAvailableSlots(); // refresh slots list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <div>Loading available slots...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Coaching Slots</h1>

      {slots.length === 0 ? (
        <p className="text-gray-500">No available slots found</p>
      ) : (
        <div className="grid gap-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Coach: {slot.coach.name}</p>
                  <p className="text-gray-600">
                    {format(
                      new Date(slot.startTime),
                      "EEEE, MMMM d, yyyy || h:mm a"
                    )}{" "}
                    -
                    {format(
                      new Date(slot.startTime).getTime() + 2 * 60 * 60 * 1000,
                      "h:mm a"
                    )}
                  </p>
                </div>
                <button
                  onClick={() => bookSlot(slot.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
