import { ContactPage } from "@/components/ui/contact-page";
import AppIcons from "@/components/ui/boxy-app-icons";
import Image from "next/image";
import swarpLogo from "@/assets/swarplogo.png";

export default function Contact() {
  return (
    <>
      <ContactPage />
      <footer className="py-12 border-t border-swarp-cyan/20">
        <div className="max-w-7xl mx-auto px-4 mb-8 flex justify-center items-center space-x-3">
          <Image 
            src={swarpLogo} 
            alt="Swarp Foundation" 
            width={60} 
            height={60} 
            className="object-contain mix-blend-lighten" 
          />
          <span className="text-2xl font-bold text-swarp-cyan">Swarp Foundation</span>
        </div>
        <AppIcons />
      </footer>
    </>
  );
}