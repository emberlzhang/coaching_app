"use client";

import { useState, useEffect } from "react";
import CreateSlot from "@/components/CreateSlot";
import SlotsList from "@/components/SlotsList";
import "react-datepicker/dist/react-datepicker.css";

export default function CoachDashboard() {
  const [selectedCoach, setSelectedCoach] = useState<number>(5);
  const [coaches, setCoaches] = useState<Array<{ id: number; name: string }>>(
    []
  );

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch("/api/coaches");
        const data = await response.json();
        setCoaches(data);
        if (data.length > 0) {
          setSelectedCoach(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchCoaches();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Coach Dashboard</h1>

      {/* Coach selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Coach
        </label>
        <select
          value={selectedCoach}
          onChange={(e) => setSelectedCoach(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {coaches.map((coach) => (
            <option key={coach.id} value={coach.id}>
              {coach.name}
            </option>
          ))}
        </select>
      </div>

      {/* Create slot form */}
      <div className="bg-white shadow rounded-lg">
        <CreateSlot
          coachId={selectedCoach}
          onSlotCreated={() => {
            // Trigger re-fetch in SlotsList component
            window.location.reload();
          }}
        />
      </div>

      {/* Slots list */}
      <div className="bg-white shadow rounded-lg p-6">
        <SlotsList coachId={selectedCoach} />
      </div>
    </div>
  );
}
