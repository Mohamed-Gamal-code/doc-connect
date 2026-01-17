/** @format */
"use client";

import { useApp } from "@/data/AppContext";
import { doctors } from "@/data/doctors";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowUpRight,
  XCircle,
  Phone,
  Printer,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyAppointments() {
  const { appointments, cancelAppointment } = useApp();
  const [selectedApt, setSelectedApt] = useState<any>(null);
  const [filter, setFilter] = useState<"All" | "Upcoming" | "Cancelled">("All");

  // فلترة المواعيد بناءً على الاختيار لتحسين الأداء
  const filteredAppointments = useMemo(() => {
    if (filter === "All") return appointments;
    return appointments.filter((apt) => apt.status === filter);
  }, [appointments, filter]);

  return (
    <main className="min-h-screen bg-[#fcfdfe] py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">
              My <span className="text-emerald-600 italic">Appointments</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Tracking and managing your medical schedule with precision.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-[1.5rem] self-start border border-slate-200/50">
            {["All", "Upcoming", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase transition-all ${
                  filter === tab
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length > 0 ? (
          <div className="space-y-6">
            {filteredAppointments.map((apt) => {
              const dr = doctors.find((d) => String(d.id) === String(apt.doctorId));
              const isCancelled = apt.status === "Cancelled";

              return (
                <Card
                  key={apt.id}
                  className={`border-none shadow-sm rounded-[2.5rem] bg-white transition-all hover:shadow-md ${
                    isCancelled ? "opacity-60 grayscale-[0.6]" : ""
                  }`}
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="flex gap-6">
                        {/* Doctor Image */}
                        <div className="relative w-24 h-24 rounded-[2rem] overflow-hidden shrink-0 border-4 border-slate-50 shadow-sm">
                          <Image
                            src={dr?.image || ""}
                            alt={dr?.name || "Doctor"}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-2xl font-black text-slate-900">
                              {dr?.name}
                            </h3>
                            <Badge
                              className={`rounded-lg text-[10px] font-black uppercase px-2 py-1 border-none shadow-none ${
                                apt.status === "Upcoming"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {apt.status}
                            </Badge>
                          </div>
                          <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
                            {dr?.specialty}
                          </p>

                          <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                              <CalendarDays className="w-4 h-4 text-emerald-500" />
                              {apt.date}
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                              <Clock className="w-4 h-4 text-emerald-500" />
                              {apt.time}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row md:flex-col gap-3 md:pl-8 md:border-l border-slate-100">
                        {!isCancelled && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="flex-1 text-red-500 hover:bg-red-50 font-black text-[10px] uppercase py-6 rounded-2xl"
                              >
                                <XCircle className="w-4 h-4 mr-2" /> Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-[2.5rem] p-8">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-2xl font-black text-slate-900">
                                  Cancel Appointment?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-500 font-medium">
                                  Are you sure you want to cancel your appointment with <span className="text-slate-900 font-bold">{dr?.name}</span>? This action can't be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="mt-6 gap-3">
                                <AlertDialogCancel className="rounded-2xl border-none bg-slate-100 font-bold py-6">
                                  Keep Appointment
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    cancelAppointment(apt.id);
                                    toast.error("Appointment Cancelled");
                                  }}
                                  className="rounded-2xl bg-red-500 hover:bg-red-600 font-bold py-6"
                                >
                                  Yes, Cancel it
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        <Button
                          onClick={() => setSelectedApt({ ...apt, doctor: dr })}
                          className={`flex-1 font-black text-[10px] uppercase py-6 px-10 rounded-2xl transition-all group ${
                            isCancelled 
                              ? "bg-slate-100 text-slate-400 hover:bg-slate-200" 
                              : "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200"
                          }`}
                        >
                          View Details
                          <ArrowUpRight className="ml-2 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-slate-50">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-8 h-8 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold text-xl">
              No {filter !== "All" ? filter.toLowerCase() : ""} appointments found.
            </p>
          </div>
        )}
      </div>

      {/* --- View Details Modal --- */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <Badge className="mb-2 bg-emerald-50 text-emerald-700 border-none font-black uppercase text-[9px]">
                    Official Receipt
                  </Badge>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Appointment Details
                  </h2>
                  <p className="text-slate-400 text-sm font-bold mt-1">Ref ID: {selectedApt.id}</p>
                </div>
                <button
                  onClick={() => setSelectedApt(null)}
                  className="p-3 bg-slate-50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[2rem]">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                    <Image
                      src={selectedApt.doctor?.image || ""}
                      alt="Doctor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg">
                      {selectedApt.doctor?.name}
                    </h4>
                    <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                      {selectedApt.doctor?.specialty}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-100 rounded-[2rem]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                    <p className="font-black text-slate-900 text-sm">{selectedApt.date}</p>
                  </div>
                  <div className="p-5 border border-slate-100 rounded-[2rem]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Slot</p>
                    <p className="font-black text-slate-900 text-sm">{selectedApt.time}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-dashed border-slate-200">
                  <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                    </div>
                    {selectedApt.doctor?.location}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-emerald-500" />
                    </div>
                    +20 123 456 7890
                  </div>
                </div>

                <div className="pt-8 flex flex-col gap-3">
                  <Button
                    onClick={() => window.print()}
                    className="w-full py-7 rounded-2xl bg-emerald-600 font-black uppercase text-xs tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all"
                  >
                    <Printer className="w-4 h-4 mr-2" /> Print Confirmation
                  </Button>
                  <Button
                    onClick={() => setSelectedApt(null)}
                    variant="ghost"
                    className="w-full py-7 rounded-2xl font-black uppercase text-[10px] text-slate-400 hover:bg-slate-50"
                  >
                    Close Window
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}