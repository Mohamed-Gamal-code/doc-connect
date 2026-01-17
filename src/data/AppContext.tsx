/** @format */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Appointment {
  id: string | number;
  doctorId: number;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}

interface AppContextType {
  appointments: Appointment[];
  addAppointment: (apt: Appointment) => void;
  cancelAppointment: (id: string | number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) {
      setAppointments(JSON.parse(saved) as Appointment[]);
    }
  }, []);
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    }
  }, [appointments]);

  const addAppointment = (apt: Appointment) => {
    setAppointments((prev) => {
      const newList = [apt, ...prev];
      localStorage.setItem("appointments", JSON.stringify(newList));
      return newList;
    });
  };

  const cancelAppointment = (id: string | number) => {
    setAppointments((prev) => {
      const updatedList = prev.map((apt) =>
        String(apt.id) === String(id)
          ? { ...apt, status: "Cancelled" as const }
          : apt
      );

      localStorage.setItem("appointments", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  return (
    <AppContext.Provider
      value={{ appointments, addAppointment, cancelAppointment }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
