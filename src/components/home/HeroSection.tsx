/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  Star, 
  Heart, 
  Navigation 
} from "lucide-react";

export default function HeroSection() {
  const router = useRouter();

  // 1. حالات البحث والموقع (States)
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // 2. وظيفة تحديد الموقع تلقائياً
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation("Cairo, Egypt");
        setIsLocating(false);
      },
      () => {
        alert("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  // 3. وظيفة البحث والتحويل
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (location) params.append("location", location);
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/30 rounded-l-[100px] -z-10 hidden lg:block" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[120px] -z-20" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 px-4 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                  Top Rated Medical Platform
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Health Care <br />
                <span className="text-emerald-600">Reimagined.</span>
              </h1>

              <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed">
                Connect with the best specialists and manage your health 
                appointments with ease and precision.
              </p>
            </div>

            {/* محرك البحث: Floating Card Design */}
            <div className="relative z-20 p-3 bg-white shadow-[0_32px_64px_-16px_rgba(16,185,129,0.1)] rounded-[2.5rem] border border-emerald-50 flex flex-col md:flex-row items-center gap-2 max-w-3xl">
              <div className="flex-1 flex items-center gap-4 pl-6 w-full py-2">
                <Search className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Find your specialist..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent outline-none w-full font-bold text-slate-800 placeholder:text-slate-300"
                />
              </div>
              
              <div className="hidden md:block w-px h-8 bg-slate-100" />
              
              <div className="flex-1 flex items-center gap-4 pl-4 w-full py-2 relative group">
                <MapPin className="text-slate-400 w-5 h-5 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent outline-none w-full font-bold text-slate-800 placeholder:text-slate-300"
                />
                <button 
                  onClick={handleGetCurrentLocation}
                  className="absolute right-2 p-2 hover:bg-emerald-50 rounded-full transition-colors text-emerald-600"
                >
                  <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-slate-900 hover:bg-emerald-600 text-white rounded-[1.8rem] px-10 h-16 text-lg font-black transition-all duration-500 shadow-xl group"
              >
                Search
                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center gap-10">
                <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900">15k+</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Patients</span>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-3xl font-black text-slate-900 ml-1">4.9</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Average Rating</span>
                </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            {/* 1. الطبقة المائلة (Background Decoration) */}
            <div className="absolute inset-0 bg-emerald-600 rounded-[4rem] rotate-6 scale-95 opacity-10 -z-10" />
            
            {/* 2. الحاوية الرئيسية للصورة (يجب أن تكون relative) */}
            <div className="relative z-10 aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white bg-slate-100">
              <Image 
                src="/images/hero-doctor1.png" 
                alt="Professional Healthcare Specialist"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent pointer-events-none" />

              {/* Floating Badge (Quick Support) */}
              <div className="absolute bottom-10 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/50 flex items-center justify-between shadow-2xl z-20">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">Quick Support</p>
                        <p className="text-[10px] font-bold text-slate-400">24/7 Consultation</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase">Online</span>
                </div>
              </div>
            </div>

            {/* Shield Badge - تم التأكد من الـ Z-index */}
            <div className="absolute -top-6 -right-6 bg-white p-5 rounded-3xl shadow-2xl border border-emerald-50 animate-bounce-slow z-30">
                <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}