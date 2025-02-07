interface User {
  id: number;
  name: string;
  phone: string;
  isCoach: boolean;
}

interface TimeSlot {
  id: number;
  coachID: number;
  studentId?: number;
  startTime: Date;
  isBooked: boolean;
  satisfactionScore?: number;
  notes?: string;
  coach: User;
  student?: User;
}
