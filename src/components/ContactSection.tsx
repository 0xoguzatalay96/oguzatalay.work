import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Linkedin, Mail, Phone, MapPin, Check, Copy } from "lucide-react";
import { TranslationSet } from "../types";

interface ContactSectionProps {
  t: TranslationSet;
}

const WHATSAPP_URL = "https://wa.me/905437725066";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{
        WebkitMaskImage: "url('/images/icons/whatsapp-icons8.png')",
        maskImage: "url('/images/icons/whatsapp-icons8.png')",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain"
      }}
    />
  );
}

export default function ContactSection({ t }: ContactSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-7 md:py-8 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      {/* Brutalist Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a10_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-4 md:mb-5"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer bg-[#FF0000] text-white hover:bg-[#00A884] transition-colors duration-300 font-archivo font-bold text-xs tracking-widest px-6 py-3 inline-flex items-center gap-2.5"
            style={{ borderRadius: "0px" }}
            id="connect-now-btn"
          >
            <WhatsAppIcon className="w-[15px] h-[15px]" />
            <span>{t.ctaBtn}</span>
          </a>
        </motion.div>

        {/* BRUTALIST CONTACT METADATA CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {/* Email */}
          <div className="border border-[#2a2a2a] p-3.5 min-h-[74px] flex items-center gap-3 relative group hover:border-[#FF0000] transition-colors bg-[#131313]/70">
            <Mail className="w-[18px] h-[18px] text-[#FF0000] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[10px] text-[#A0A0A0] uppercase block mb-1">
                Direct Email
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-archivo text-[15px] font-bold text-white leading-tight truncate">
                  oguz@oguzatalay.work
                </span>
                <button
                  onClick={() => copyToClipboard("oguz@oguzatalay.work", "email")}
                  className="p-1 border border-[#2a2a2a] text-[#555] hover:text-white hover:border-[#FF0000] transition-all bg-black/40 flex-shrink-0"
                  aria-label="Copy email"
                >
                  {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="border border-[#2a2a2a] p-3.5 min-h-[74px] flex items-center gap-3 relative group hover:border-[#FF0000] transition-colors bg-[#131313]/70">
            <Phone className="w-[18px] h-[18px] text-[#FF0000] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[10px] text-[#A0A0A0] uppercase block mb-1">
                Direct Telephone
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-archivo text-[15px] font-bold text-white leading-tight truncate">
                  +90 543 772 50 66
                </span>
                <button
                  onClick={() => copyToClipboard("+90 543 772 50 66", "phone")}
                  className="p-1 border border-[#2a2a2a] text-[#555] hover:text-white hover:border-[#FF0000] transition-all bg-black/40 flex-shrink-0"
                  aria-label="Copy phone"
                >
                  {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/oguzatalay96/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#2a2a2a] p-3.5 min-h-[74px] flex items-center gap-3 relative group hover:border-[#FF0000] transition-colors bg-[#131313]/70"
          >
            <Linkedin className="w-[18px] h-[18px] text-[#FF0000] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[10px] text-[#A0A0A0] uppercase block mb-1">
                LinkedIn
              </span>
              <span className="block font-archivo text-[15px] font-bold text-white leading-tight truncate">
                /in/oguzatalay96
              </span>
            </div>
          </a>

          {/* Location */}
          <div className="border border-[#2a2a2a] p-3.5 min-h-[74px] flex items-center gap-3 relative group hover:border-[#FF0000] transition-colors bg-[#131313]/70">
            <MapPin className="w-[18px] h-[18px] text-[#FF0000] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-archivo text-[15px] font-bold text-white leading-tight">
                Istanbul
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
