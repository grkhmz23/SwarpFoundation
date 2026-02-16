"use client";

import React, { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedFolder, Project } from "@/components/ui/portfolio-folder";
import { AetherBackground } from "@/components/ui/aether-background";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { useTranslations } from "next-intl";

export default function WorksPage() {
  const t = useTranslations("works");

  const portfolioData: Array<{ title: string; gradient: string; projects: Project[] }> = useMemo(
    () => [
      {
        title: t("folders.web.title"),
        gradient: "linear-gradient(135deg, #00d4aa, #00b894)",
        projects: [
          { id: "web1", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", title: t("folders.web.projects.0.title"), description: t("folders.web.projects.0.description"), link: "#" },
          { id: "web2", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", title: t("folders.web.projects.1.title"), description: t("folders.web.projects.1.description"), link: "#" },
          { id: "web3", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800", title: t("folders.web.projects.2.title"), description: t("folders.web.projects.2.description"), link: "#" },
          { id: "web4", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", title: t("folders.web.projects.3.title"), description: t("folders.web.projects.3.description"), link: "#" },
          { id: "web5", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", title: t("folders.web.projects.4.title"), description: t("folders.web.projects.4.description"), link: "#" },
        ],
      },
      {
        title: t("folders.blockchain.title"),
        gradient: "linear-gradient(135deg, #9d4edd, #7b2cbf)",
        projects: [
          { id: "bc1", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800", title: t("folders.blockchain.projects.0.title"), description: t("folders.blockchain.projects.0.description"), link: "#" },
          { id: "bc2", image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=800", title: t("folders.blockchain.projects.1.title"), description: t("folders.blockchain.projects.1.description"), link: "#" },
          { id: "bc3", image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80&w=800", title: t("folders.blockchain.projects.2.title"), description: t("folders.blockchain.projects.2.description"), link: "#" },
          { id: "bc4", image: "https://images.unsplash.com/photo-1642388738814-3c8d6c2f1e7a?auto=format&fit=crop&q=80&w=800", title: t("folders.blockchain.projects.3.title"), description: t("folders.blockchain.projects.3.description"), link: "#" },
          { id: "bc5", image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=800", title: t("folders.blockchain.projects.4.title"), description: t("folders.blockchain.projects.4.description"), link: "#" },
        ],
      },
      {
        title: t("folders.ai.title"),
        gradient: "linear-gradient(135deg, #00b4d8, #0077b6)",
        projects: [
          { id: "ai1", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", title: t("folders.ai.projects.0.title"), description: t("folders.ai.projects.0.description"), link: "#" },
          { id: "ai2", image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800", title: t("folders.ai.projects.1.title"), description: t("folders.ai.projects.1.description"), link: "#" },
          { id: "ai3", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", title: t("folders.ai.projects.2.title"), description: t("folders.ai.projects.2.description"), link: "#" },
          { id: "ai4", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800", title: t("folders.ai.projects.3.title"), description: t("folders.ai.projects.3.description"), link: "#" },
        ],
      },
      {
        title: t("folders.mobile.title"),
        gradient: "linear-gradient(135deg, #f72585, #b5179e)",
        projects: [
          { id: "mob1", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800", title: t("folders.mobile.projects.0.title"), description: t("folders.mobile.projects.0.description"), link: "#" },
          { id: "mob2", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800", title: t("folders.mobile.projects.1.title"), description: t("folders.mobile.projects.1.description"), link: "#" },
          { id: "mob3", image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800", title: t("folders.mobile.projects.2.title"), description: t("folders.mobile.projects.2.description"), link: "#" },
        ],
      },
      {
        title: t("folders.hardware.title"),
        gradient: "linear-gradient(135deg, #ff6b35, #f7931e)",
        projects: [
          { id: "hw1", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", title: t("folders.hardware.projects.0.title"), description: t("folders.hardware.projects.0.description"), link: "#" },
          { id: "hw2", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800", title: t("folders.hardware.projects.1.title"), description: t("folders.hardware.projects.1.description"), link: "#" },
          { id: "hw3", image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800", title: t("folders.hardware.projects.2.title"), description: t("folders.hardware.projects.2.description"), link: "#" },
        ],
      },
      {
        title: t("folders.design.title"),
        gradient: "linear-gradient(135deg, #4cc9f0, #4361ee)",
        projects: [
          { id: "ui1", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800", title: t("folders.design.projects.0.title"), description: t("folders.design.projects.0.description"), link: "#" },
          { id: "ui2", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800", title: t("folders.design.projects.1.title"), description: t("folders.design.projects.1.description"), link: "#" },
          { id: "ui3", image: "https://images.unsplash.com/photo-1541462608141-ad4d4f942177?auto=format&fit=crop&q=80&w=800", title: t("folders.design.projects.2.title"), description: t("folders.design.projects.2.description"), link: "#" },
          { id: "ui4", image: "https://images.unsplash.com/photo-1522542550221-31fd19fe4af0?auto=format&fit=crop&q=80&w=800", title: t("folders.design.projects.3.title"), description: t("folders.design.projects.3.description"), link: "#" },
        ],
      },
    ],
    [t]
  );

  return (
    <AetherBackground className="min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          {t("hero.titlePrefix")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 italic">{t("hero.titleAccent")}</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("hero.description")}</p>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {portfolioData.map((folder, index) => (
            <div
              key={folder.title}
              className="w-full"
              style={{
                animation: `fadeInUp 0.7s ease-out ${200 + index * 100}ms both`,
              }}
            >
              <AnimatedFolder
                title={folder.title}
                projects={folder.projects}
                gradient={folder.gradient}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t("cta.title")}</h2>
          <p className="text-gray-400 mb-8">{t("cta.description")}</p>
          <KeyboardLink href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            {t("cta.button")}
          </KeyboardLink>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </AetherBackground>
  );
}
