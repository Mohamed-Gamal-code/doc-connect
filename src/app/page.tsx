import DoctorsList from "@/components/home/DoctorsList";
import HeroSection from "@/components/home/HeroSection";
import SpecialtiesSection from "@/components/home/SpecialtiesSection";

export default function Home() {
  return (
<div>
  <HeroSection/>
  <SpecialtiesSection/>
  <DoctorsList/>
</div>
  );
}
