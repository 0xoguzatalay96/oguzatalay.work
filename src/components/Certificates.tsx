import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CertificateItem, TranslationSet } from "../types";

interface CertificatesProps {
  certificates: CertificateItem[];
  t: TranslationSet;
  lang: "EN" | "TR";
}

export default function Certificates({ certificates, t, lang }: CertificatesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="py-16 md:py-24 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 06 ]</span>
          <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
            {t.certificatesTitle}
          </h2>
          <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Section Subtitle */}
        <p className="font-sans text-sm md:text-base text-[#A0A0A0] max-w-3xl mb-10 leading-relaxed">
          {t.certificatesSub}
        </p>

        {/* Minimalist Visual Certificates Grid (SelectedWorks Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert, idx) => {
            return (
              <motion.a
                key={cert.id}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group block border border-[#2a2a2a] bg-black/40 hover:border-[#FF0000]/80 transition-all duration-300 overflow-hidden cursor-pointer"
                title={`${cert.title} — ${cert.issuer}`}
              >
                {/* Visual Snapshot with Grayscale-to-Color Transition */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#181818] border-b border-[#2a2a2a]">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top filter grayscale contrast-[1.05] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Arrow Indicator Icon (SelectedWorks style) */}
                  <div className="absolute top-3 right-3 p-1.5 bg-black/80 border border-white/10 text-white/80 group-hover:text-[#FF0000] group-hover:border-[#FF0000]/60 transition-colors backdrop-blur-md">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Body Content: Title & Subtle Subtext */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <h3 className="font-archivo text-base md:text-lg font-bold text-white tracking-wide group-hover:text-[#FF0000] transition-colors leading-snug mb-2 min-h-[48px] flex items-center">
                    {cert.title}
                  </h3>

                  <p className="font-mono text-xs text-[#888] group-hover:text-[#aaa] transition-colors">
                    {cert.issuer}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
