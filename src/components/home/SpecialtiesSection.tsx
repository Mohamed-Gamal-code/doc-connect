/** @format */

"use client";


import { doctors } from "@/data/doctors";
import { 
  HeartPulse, Stethoscope, Brain, Baby, 
  ArrowRight, Eye, Activity, Bone, Thermometer 
} from "lucide-react";
import Link from "next/link";

const ALL_SPECIALTIES = [
  { name: "Cardiology", icon: HeartPulse, slug: "Cardiology" },
  { name: "Dentistry", icon: Stethoscope, slug: "Dentistry" },
  { name: "Neurology", icon: Brain, slug: "Neurology" },
  { name: "Pediatrics", icon: Baby, slug: "Pediatrics" },
  { name: "Ophthalmology", icon: Eye, slug: "Ophthalmology" },
  { name: "Dermatology", icon: Activity, slug: "Dermatology" },
  { name: "Orthopedics", icon: Bone, slug: "Orthopedics" },
  { name: "General Medicine", icon: Thermometer, slug: "General" },
];

export default function SpecialtySection() {
  return (
    <section className="py-28 bg-[#f8fafc] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-emerald-500"></span>
                <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em]">Departments</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9]">
              Top Rated <br /> <span className="text-slate-400">Specialties</span>
            </h2>
          </div>
          <p className="text-slate-500 font-bold text-lg max-w-sm border-l-4 border-emerald-500 pl-6 py-2">
            Access specialized healthcare across 20+ departments with Cairo's top doctors.
          </p>
        </div>

        {/* The "Popping" Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ALL_SPECIALTIES.map((item) => {
            const count = doctors.filter((d) => d.specialty === item.name).length;

            return (
              <Link 
                href={`/doctors?query=${item.slug}`}
                key={item.name}
                className="group relative h-72 rounded-[3.5rem] bg-white border border-slate-200/60 p-10 transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_40px_100px_-20px_rgba(16,185,129,0.2)] flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative Background Icon */}
                <item.icon className="absolute -bottom-6 -right-6 w-40 h-40 text-slate-50 group-hover:text-emerald-50/50 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-[1.8rem] bg-slate-900 flex items-center justify-center group-hover:bg-emerald-600 shadow-xl group-hover:shadow-emerald-200 transition-all duration-500">
                        <item.icon className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                         <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{count} Doctors</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-emerald-700 transition-colors">
                        {item.name}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-slate-400 font-bold text-xs group-hover:text-slate-900 transition-all">
                        View Department <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}