"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addHours, isBefore } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

interface CreateSlotProps {
  coachId: number;
  onSlotCreated: () => void;
}

export default function CreateSlot({
  coachId,
  onSlotCreated,
}: CreateSlotProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateSlot = async () => {
    if (!selectedDate) {
      setError("Please select a future date and time");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coachId,
          startTime: selectedDate.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create slot");
      }

      setSelectedDate(null);
      onSlotCreated();
    } catch (err) {
      setError("Failed to create slot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-4">Create Availability Slot</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Start Time
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setError(null);
            }}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholderText="Click to select a date and time"
          />
        </div>

        {selectedDate && (
          <div className="text-sm text-gray-600">
            <p>Slot Duration: 2 hours</p>
            <p>Start: {selectedDate.toLocaleString()}</p>
            <p>End: {addHours(selectedDate, 2).toLocaleString()}</p>
          </div>
        )}

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          onClick={handleCreateSlot}
          disabled={!selectedDate || isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? "Creating Slot..." : "Create Slot"}
        </button>
      </div>
    </div>
  );
}
