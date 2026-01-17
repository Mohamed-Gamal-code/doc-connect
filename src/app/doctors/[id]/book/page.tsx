/** @format */
"use client";

import { useParams, useRouter } from "next/navigation";
import { doctors } from "@/data/doctors";
import { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
import { toast } from "sonner";
import { useApp } from "@/data/AppContext"; // المخزن بتاعنا
import Link from "next/link";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addAppointment } = useApp(); // وظيفة إضافة حجز جديد

  const doctor = doctors.find((d) => d.id === Number(id));

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const availableDays = useMemo(() => {
    const days = [];
    for (let i = 1; i <= 5; i++) {
      const date = addDays(new Date(), i);
      days.push({
        fullDate: format(date, "EEEE, MMM d, yyyy"), // شكل التاريخ المخزن
        dayName: format(date, "EEE"),
        displayDate: format(date, "d MMM"),
      });
    }
    return days;
  }, []);

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "04:00 PM"];

  if (!doctor) return <div className="p-20 text-center font-black">Doctor not found!</div>;

  const handleConfirm = () => {
    // 1. إنشاء كائن الموعد الجديد
    const newAppointment = {
      id: `APT-${Math.floor(Math.random() * 9000) + 1000}`,
      doctorId: doctor.id,
      date: selectedDate,
      time: selectedTime,
      status: "Upcoming" as const,
    };

    // 2. إرسال البيانات للمخزن (Context)
    addAppointment(newAppointment);

    // 3. رسالة نجاح وتحويل الصفحة
    toast.success("Appointment Confirmed!", {
      description: `Booked with ${doctor.name} for ${selectedTime}`,
    });

    setTimeout(() => {
      router.push("/my-appointments");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#fcfdfe] py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link href="/doctors" className="inline-flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-emerald-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* كارت الدكتور */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-100 border border-emerald-50 sticky top-10">
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 shadow-sm">
                <img src={doctor.image} alt={doctor.name} className="object-cover w-full h-full" />
              </div>
              <div className="space-y-4">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest">
                  {doctor.specialty}
                </span>
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{doctor.name}</h1>
                <div className="flex items-center gap-2 text-amber-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-slate-900 font-black">{doctor.rating}</span>
                </div>
                <div className="pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-slate-500 font-bold text-sm mb-4">
                    <MapPin className="w-5 h-5 text-emerald-500" /> {doctor.location}
                  </div>
                  <div className="text-3xl font-black text-slate-900">{doctor.fee} <span className="text-sm text-slate-400 font-bold">EGP</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* فورم الحجز */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-100 border border-emerald-50">
              <h2 className="text-2xl font-black text-slate-900 mb-10">Select Date & Time</h2>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                {availableDays.map((item) => (
                  <button
                    key={item.fullDate}
                    onClick={() => setSelectedDate(item.fullDate)}
                    className={`p-5 rounded-[1.5rem] border transition-all flex flex-col items-center gap-1 ${
                      selectedDate === item.fullDate
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200"
                        : "bg-slate-50 border-slate-100 text-slate-500 hover:border-emerald-200"
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase">{item.dayName}</span>
                    <span className="text-lg font-black">{item.displayDate}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-2xl border font-bold transition-all ${
                      selectedTime === time
                        ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                        : "bg-white border-slate-100 text-slate-600 hover:border-emerald-200 shadow-sm"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-emerald-100 transition-all active:scale-95 disabled:opacity-50"
              >
                Confirm Appointment <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}