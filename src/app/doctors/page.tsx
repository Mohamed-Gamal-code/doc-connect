/** @format */

"use client";

import { useState, Suspense } from "react"; // ضيفنا Suspense
import { useSearchParams } from "next/navigation";
import { doctors } from "@/data/doctors";
import { Search, MapPin, SlidersHorizontal, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

// 1. فصلنا منطق الدكاترة في Component لوحده عشان الـ Suspense
function DoctorsList() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialLocation = searchParams.get("location") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = doctor.location
      .toLowerCase()
      .includes(locationQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doctor.specialty === selectedSpecialty;

    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  return (
    <>
      {/* Search Header */}
      <section className="bg-white border-b border-emerald-50 py-12 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Doctor name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-200 outline-none transition-all font-bold text-slate-700 shadow-sm"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-200 outline-none transition-all font-bold text-slate-700 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="hidden lg:block space-y-8">
            <h3 className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-widest text-xs mb-6">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              Filter by
            </h3>
            <div>
              <label className="text-sm font-black text-slate-700 block mb-3">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-100 bg-white text-sm font-bold text-slate-600 outline-none focus:border-emerald-200"
              >
                <option value="All Specialties">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dentistry">Dentistry</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <p className="text-slate-500 font-bold">
                Showing <span className="text-slate-900 font-black">{filteredDoctors.length} Doctors</span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="group border-none shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] transition-all duration-500 rounded-[2rem] overflow-hidden bg-white">
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase">{doctor.fee}</div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">{doctor.specialty}</span>
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-[11px] font-black text-amber-700">{doctor.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{doctor.name}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-slate-500 font-bold text-xs"><Award className="w-4 h-4 text-emerald-500" /> {doctor.experience} Exp</div>
                          <div className="flex items-center gap-3 text-slate-500 font-bold text-xs"><MapPin className="w-4 h-4 text-slate-300" /> {doctor.location}</div>
                        </div>
                      </div>
                      <CardFooter className="p-0 mt-6 pt-6 border-t border-slate-50">
                        <Link href={`/doctors/${doctor.id}/book`} className="w-full">
                          <Button className="w-full bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl py-6 font-black text-xs uppercase tracking-widest transition-all">Book Appointment</Button>
                        </Link>
                      </CardFooter>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 2. الـ Component الأساسي اللي Vercel بيشوفه
export default function FindDoctors() {
  return (
    <main className="min-h-screen bg-[#fcfdfe] pb-20">
      <Suspense fallback={<div className="text-center py-20 font-bold">Loading Doctors...</div>}>
        <DoctorsList />
      </Suspense>
    </main>
  );
}