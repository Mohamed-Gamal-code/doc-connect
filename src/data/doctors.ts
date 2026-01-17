/** @format */

export interface Doctor {
  id: number;
  name: string;
  specialty:
    | "Cardiology"
    | "Dentistry"
    | "Neurology"
    | "Pediatrics"
    | "Ophthalmology"
    | "Dermatology"
    | "Orthopedics"
    | "General Medicine";
  rating: number;
  reviews: number;
  experience: string;
  image: string;
  availableTime: string[];
  location: string;
  fee: number;
  about: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Adam Mansour",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 120,
    experience: "12 Years",
    // تم تغيير الرابط للمسار المحلي بتاعك
    image: "/images/hero-doctor1.png",
    availableTime: ["Mon, 10:00 AM", "Wed, 02:00 PM"],
    location: "Zamalek, Cairo",
    fee: 600,
    about: "Senior consultant cardiologist specializing in heart failure.",
  },
  {
    id: 2,
    name: "Dr. Omar Farouk",
    specialty: "Dentistry",
    rating: 4.8,
    reviews: 210,
    experience: "8 Years",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Sun, 11:00 AM", "Fri, 04:00 PM"],
    location: "Sheikh Zayed, Giza",
    fee: 450,
    about: "Cosmetic dentist focusing on dental implants and smile design.",
  },
  {
    id: 3,
    name: "Dr. Ahmed Mansour",
    specialty: "Orthopedics",
    rating: 4.4,
    reviews: 25,
    experience: "2 Years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Tue, 03:00 PM", "Fri, 08:00 PM"],
    location: "Shorouk City, Cairo",
    fee: 300,
    about: "Neurology specialist focusing on headaches and sleep disorders.",
  },
  {
    id: 4,
    name: "Dr. Youssef Amer",
    specialty: "Ophthalmology",
    rating: 4.9,
    reviews: 95,
    experience: "13 Years",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Sun, 02:00 PM", "Wed, 06:00 PM"],
    location: "Rehab City, Cairo",
    fee: 550,
    about: "Senior eye consultant specializing in LASIK surgery.",
  },
  {
    id: 5,
    name: "Dr. Mariam Farouk",
    specialty: "General Medicine",
    rating: 4.8,
    reviews: 55,
    experience: "4 Years",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Mon, 09:00 AM", "Fri, 02:00 PM"],
    location: "Sidi Gaber, Alexandria",
    fee: 250,
    about: "Focused on comprehensive family medicine and internal care.",
  },
  {
    id: 6,
    name: "Dr. Kareem Saeed",
    specialty: "Orthopedics",
    rating: 4.3,
    reviews: 12,
    experience: "1 Year",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Sat, 01:00 PM", "Tue, 04:00 PM"],
    location: "Shubra, Cairo",
    fee: 200,
    about: "Junior neurologist specializing in neuro-muscular diagnostics.",
  },
  {
    id: 7,
    name: "Dr. Sherif Younis",
    specialty: "Pediatrics",
    rating: 4.8,
    reviews: 58,
    experience: "8 Years",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Mon, 03:00 PM", "Thu, 07:00 PM"],
    location: "Loran, Alexandria",
    fee: 450,
    about: "Expert in spine disorders and sports physiotherapy.",
  },
  {
    id: 8,
    name: "Dr. Mona Ibrahim", // تغيير من Sarah Ahmed
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 120,
    experience: "12 Years",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Mon, 10:00 AM", "Wed, 02:00 PM"],
    location: "Zamalek, Cairo",
    fee: 600,
    about: "Senior consultant cardiologist with expertise in heart failure.",
  },
  {
    id: 9,
    name: "Dr. Ingy Ashour",
    specialty: "Ophthalmology",
    rating: 4.9,
    reviews: 110,
    experience: "9 Years",
    image:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Sun, 04:00 PM", "Wed, 08:00 PM"],
    location: "Nasr City, Cairo",
    fee: 400,
    about: "Specialized in retinal diseases and medical contact lenses.",
  },
  {
    id: 10,
    name: "Dr. Tarek Hegazy",
    specialty: "General Medicine",
    rating: 4.7,
    reviews: 35,
    experience: "5 Years",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Mon, 08:00 AM", "Fri, 12:00 PM"],
    location: "Damanhour, Egypt",
    fee: 150,
    about: "General practitioner for chronic illness management.",
  },
  {
    id: 11,
    name: "Dr. Laila Hassan",
    specialty: "Dentistry",
    rating: 5.0,
    reviews: 320,
    experience: "10 Years",
    image:
      "https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Sat, 12:00 PM", "Tue, 03:00 PM"],
    location: "Dokki, Giza",
    fee: 500,
    about: "Specialized in orthodontics and advanced dental surgery.",
  },
  {
    id: 12,
    name: "Dr. Dina El-Masry",
    specialty: "Dermatology",
    rating: 4.8,
    reviews: 180,
    experience: "9 Years",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Mon, 04:00 PM", "Thu, 08:00 PM"],
    location: "Mohandessin, Giza",
    fee: 450,
    about: "Expert in aesthetic medicine and clinical dermatology.",
  },
  {
    id: 13,
    name: "Dr. Hany Shaker", // تغيير من Tarek Hegazy
    specialty: "General Medicine",
    rating: 4.7,
    reviews: 35,
    experience: "5 Years",
    image:
      "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Mon, 08:00 AM", "Fri, 12:00 PM"],
    location: "Damanhour, Egypt",
    fee: 150,
    about: "Chronic illness care.",
  },
  {
    id: 14,
    name: "Dr. Nadia El-Sawy",
    specialty: "Neurology",
    rating: 4.8,
    reviews: 44,
    experience: "6 Years",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Tue, 11:00 AM", "Thu, 03:00 PM"],
    location: "Ismailia, Egypt",
    fee: 350,
    about: "Pediatric epilepsy specialist.",
  },
  {
    id: 15,
    name: "Dr. Salma Khaled", // تغيير من Nadia El-Sawy
    specialty: "Neurology",
    rating: 4.8,
    reviews: 44,
    experience: "6 Years",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=300",
    availableTime: ["Tue, 11:00 AM", "Thu, 03:00 PM"],
    location: "Ismailia, Egypt",
    fee: 350,
    about: "Neurology specialist focusing on pediatric epilepsy.",
  },
];
