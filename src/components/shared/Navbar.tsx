/** @format */

"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Stethoscope, 
  CalendarDays, 
  Menu, 
  Home, 
  Search, 
  UserPlus, 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  // 1. الروابط العامة: أي حد يشوفها (زائر أو مسجل)
  const publicLinks = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Find Doctors", href: "/doctors", icon: <Search className="w-4 h-4" /> },
  ];
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-emerald-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          
          {/* 1. Logo - الهوية البصرية */}
          <Link href="/" className="flex items-center gap-2 group transition-all">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-100 group-hover:rotate-12 transition-transform duration-300">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Doc<span className="text-emerald-600">Connect</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation - اللينكات للكمبيوتر */}
          <div className="hidden md:flex items-center gap-10">
            {/* عرض اللينكات العامة */}
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-black uppercase tracking-widest transition-colors ${
                  isActive(link.href) ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* عرض اللينكات الخاصة فقط لو المستخدم مسجل دخول */}
            <SignedIn>
              <Link 
                href="/my-appointments" 
                className={`flex items-center gap-2 text-[13px] font-black uppercase tracking-widest transition-colors ${
                  isActive("/my-appointments") ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                Appointments
              </Link>
            </SignedIn>
          </div>

          {/* 3. Auth Actions - أزرار الدخول */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <div className="hidden md:flex items-center gap-4">
                <SignInButton mode="modal">
                  <button className="text-[13px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors px-4">
                    Sign In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button className="bg-slate-900 text-white px-8 py-6 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-100 transition-all active:scale-95 shadow-md">
                    Join Now
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>

            {/* في حالة تسجيل الدخول (Sign In State) */}
            <SignedIn>
              <div className="flex items-center gap-4 pl-4 md:border-l border-emerald-100">
                <div className="hidden lg:block text-right">
                  <p className="text-[11px] font-black text-slate-900 leading-none mb-1">Portal</p>
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Verified Account</span>
                </div>
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{ 
                    elements: { 
                      avatarBox: "w-10 h-10 border-2 border-emerald-50 hover:border-emerald-500 transition-all" 
                    } 
                  }} 
                />
              </div>
            </SignedIn>

            {/* --- Mobile Menu (Sheet) --- */}
            <div className="md:hidden">
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl ml-2">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] border-l-emerald-50">
                  <SheetHeader className="text-left pb-8 border-b border-slate-50">
                    <SheetTitle className="flex items-center gap-2">
                       <div className="bg-emerald-600 p-1.5 rounded-lg">
                          <Stethoscope className="text-white w-5 h-5" />
                       </div>
                       <span className="font-black tracking-tighter text-xl">DocConnect</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* روابط الموبايل */}
                  <div className="flex flex-col gap-5 mt-10">
                    {publicLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-4 p-4 rounded-2xl text-md font-bold transition-all ${
                          isActive(link.href) ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600"
                        }`}
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    ))}
                    
                    <SignedIn>
                      <Link 
                        href="/my-appointments" 
                        className={`flex items-center gap-4 p-4 rounded-2xl text-md font-bold transition-all ${
                          isActive("/my-appointments") ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600"
                        }`}
                      >
                        <CalendarDays className="w-4 h-4" />
                        Appointments
                      </Link>
                    </SignedIn>

                    <SignedOut>
                      <div className="mt-4 pt-4 border-t border-slate-50 space-y-4">
                        <SignInButton mode="modal">
                          <Button className="w-full bg-slate-900 hover:bg-emerald-600 h-14 rounded-2xl font-bold flex gap-2">
                            <UserPlus className="w-5 h-5" />
                            Sign Up 
                          </Button>
                        </SignInButton>
                      </div>
                    </SignedOut>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}