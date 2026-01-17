/** @format */

"use client";

import { doctors } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star, Clock, MapPin, Award, ArrowRight } from "lucide-react";
import Link from "next/link"; 
import { useRouter } from "next/navigation";

export default function DoctorsList() {
  const router = useRouter();

  // عرض أول 4 دكاترة فقط في الصفحة الرئيسية عشان الزحمة
  const featuredDoctors = doctors.slice(0, 4);

  return (
    <section className="py-24 bg-[#fcfdfe]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Trusted Professionals
            </div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
              Meet Our{" "}
              <span className="text-emerald-600 italic font-serif">
                Specialists
              </span>
            </h2>
            <p className="text-slate-500 font-medium mt-4 text-lg">
              Book your slot with the highest-rated doctors in the region.
            </p>
          </div>

          {/* 1. تفعيل زرار Explore All Doctors */}
          <Link href="/doctors">
            <Button
              variant="outline"
              className="border-slate-200 text-slate-900 font-bold px-8 py-6 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all group"
            >
              Explore All Doctors{" "}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Grid الدكاترة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="group overflow-hidden border-none shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] bg-white rounded-[2.5rem] hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] transition-all duration-500"
            >
              <CardHeader className="p-0 relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-xl">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-black text-slate-900">
                      {doctor.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-xl text-[10px] font-black">
                    {doctor.fee} / Visit
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                    {doctor.specialty}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {doctor.name}
                </h3>

                <div className="space-y-3 border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span>{doctor.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs">{doctor.availableTime[0]}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                {/* 2. تفعيل زرار Book Appointment لكل دكتور */}
                <Link href={`/doctors/${doctor.id}/book`} className="w-full">
                  <Button className="w-full bg-slate-900 text-white rounded-2xl py-7 font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-slate-100">
                    Book Appointment
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
