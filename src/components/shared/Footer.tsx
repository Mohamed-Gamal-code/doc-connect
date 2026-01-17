/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  Stethoscope, 
  ArrowRight, 
  Phone,  
  Mail, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";


export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-white border-t border-emerald-50">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-100 group-hover:rotate-12 transition-transform">
                <Stethoscope className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Doc<span className="text-emerald-600">Connect</span>
              </span>
            </Link>
            
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
              The most reliable healthcare platform in Egypt. Book your medical appointments with top-rated specialists in just a few clicks.
            </p>

            {/* Functional Newsletter */}
            <div className="relative max-w-sm pt-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                Stay Updated
              </label>
              <form onSubmit={handleSubscribe} className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm outline-none focus:border-emerald-200 transition-all font-bold pr-16"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bg-slate-900 text-white p-2.5 rounded-xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                >
                  {isSubscribed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              {isSubscribed && (
                <p className="text-[10px] text-emerald-600 font-bold mt-2 animate-pulse">
                  Thanks for subscribing! Check your inbox soon.
                </p>
              )}
            </div>
          </div>

          {/* Columns: Links & Contact */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Explore</h3>
              <ul className="space-y-4">
                <li><Link href="/doctors" className="text-[14px] font-bold text-slate-500 hover:text-emerald-600 transition-colors">Find Doctors</Link></li>
                <li><Link href="/#specialties" className="text-[14px] font-bold text-slate-500 hover:text-emerald-600 transition-colors">Specialties</Link></li>
                <li><Link href="#" className="text-[14px] font-bold text-slate-500 hover:text-emerald-600 transition-colors">Hospitals</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Areas</h3>
              <ul className="space-y-4">
                <li className="text-[14px] font-bold text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors">New Cairo</li>
                <li className="text-[14px] font-bold text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors">Zamalek</li>
                <li className="text-[14px] font-bold text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors">Alexandria</li>
              </ul>
            </div>

            {/* Contact Details (Professional Approach) */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Contact Us</h3>
              <ul className="space-y-5">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Support</p>
                    <p className="text-sm font-black text-slate-900">19000</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Email</p>
                    <p className="text-sm font-black text-slate-900 underline decoration-slate-200">care@doc.com</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <p className="text-[13px] font-bold text-slate-400">
              © 2026 <span className="text-slate-900">DocConnect</span>.
            </p>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Verified Portal</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex gap-6">
               <Link href="#" className="text-[11px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">Privacy</Link>
               <Link href="#" className="text-[11px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">Terms</Link>
             </div>
             <div className="h-4 w-px bg-slate-100 hidden md:block" />
             <p className="text-[13px] font-bold text-slate-400 flex items-center gap-1.5">
               Developed with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> in Egypt.
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}