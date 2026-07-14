import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Mail, Phone, MapPin, Send, Check, Copy, Terminal, ChevronRight } from "lucide-react";
import { TranslationSet } from "../types";

interface ContactSectionProps {
  t: TranslationSet;
}

export default function ContactSection({ t }: ContactSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-typing message simulation for quick templates
  const [isTyping, setIsTyping] = useState(false);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleTemplateSelect = (templateType: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setFormData((prev) => ({ ...prev, message: "" }));

    let fullText = "";
    if (templateType === "advisory") {
      fullText = "Hello Oğuz, I would love to schedule a strategic advisory session to discuss Web2 to Web3 transition for our global enterprise brand. Let's connect.";
    } else if (templateType === "campaign") {
      fullText = "Hi Oğuz, we are launching an upcoming metaverse land sale campaign and need a lead strategist to direct our community architecture and creator network. Looking forward to your reply.";
    } else {
      fullText = "Hello! We are hosting a panels panel/discussion on Web3 innovations at our upcoming conference and would love to invite you as a speaker. Please let us know your availability.";
    }

    let index = 0;
    const interval = setInterval(() => {
      setFormData((prev) => ({
        ...prev,
        message: prev.message + fullText.charAt(index)
      }));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15); // Auto typing speed
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    
    // Simulate API request transmit
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 6000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 md:py-32 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      {/* Brutalist Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a12_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a12_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* DISCOVER THE FOUNDATION BANNER */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-archivo text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 select-none"
          >
            DISCOVER <br />
            <span className="text-[#FF0000]">THE FOUNDATION</span>
          </motion.h2>

          {!formOpen && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormOpen(true)}
              className="cursor-pointer bg-[#FF0000] text-white hover:bg-[#d60000] transition-colors duration-300 font-archivo font-bold text-sm tracking-widest px-10 py-5 inline-flex items-center gap-3"
              style={{ borderRadius: "0px" }}
              id="connect-now-btn"
            >
              <span>{t.ctaBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* CONNECTION TERMINAL WORKSPACE FORM */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto border border-[#FF0000] bg-black/80 overflow-hidden"
              id="connection-workspace-terminal"
            >
              {/* Terminal Header */}
              <div className="bg-[#1c1c1c] border-b border-[#2a2a2a] px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FF0000]" />
                  <span className="font-mono text-[10px] font-bold text-white tracking-widest uppercase">
                    OĞUZ ATALAY // DIRECT LINK TERMINAL v1.0
                  </span>
                </div>
                <button
                  onClick={() => setFormOpen(false)}
                  className="font-mono text-[10px] text-white/50 hover:text-white transition-colors cursor-pointer"
                  id="close-terminal-btn"
                >
                  [ CLOSE_WORKSPACE ]
                </button>
              </div>

              {/* Terminal Content */}
              <div className="p-6 md:p-8">
                <p className="font-sans text-sm text-[#A0A0A0] mb-8 leading-relaxed">
                  {t.contactFormTitle}
                </p>

                {/* Quick Templates Selection */}
                <div className="mb-8">
                  <span className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-3">
                    {t.contactQuickTemplateLabel}:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      disabled={isTyping}
                      onClick={() => handleTemplateSelect("advisory")}
                      className="font-mono text-[11px] font-bold border border-[#2a2a2a] px-3 py-1.5 text-[#A0A0A0] hover:border-[#FF0000] hover:text-white transition-all bg-[#131313]"
                    >
                      &gt; {t.contactQuickTemplate1}
                    </button>
                    <button
                      type="button"
                      disabled={isTyping}
                      onClick={() => handleTemplateSelect("campaign")}
                      className="font-mono text-[11px] font-bold border border-[#2a2a2a] px-3 py-1.5 text-[#A0A0A0] hover:border-[#FF0000] hover:text-white transition-all bg-[#131313]"
                    >
                      &gt; {t.contactQuickTemplate2}
                    </button>
                    <button
                      type="button"
                      disabled={isTyping}
                      onClick={() => handleTemplateSelect("speaker")}
                      className="font-mono text-[11px] font-bold border border-[#2a2a2a] px-3 py-1.5 text-[#A0A0A0] hover:border-[#FF0000] hover:text-white transition-all bg-[#131313]"
                    >
                      &gt; {t.contactQuickTemplate3}
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder={t.contactNamePlaceholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/40 border border-[#2a2a2a] focus:border-[#FF0000] outline-none text-white font-mono text-xs px-4 py-4 uppercase tracking-wider transition-colors placeholder:text-[#555]"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder={t.contactEmailPlaceholder}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-[#2a2a2a] focus:border-[#FF0000] outline-none text-white font-mono text-xs px-4 py-4 tracking-wider transition-colors placeholder:text-[#555]"
                      />
                    </div>
                  </div>

                  {/* Message box */}
                  <div className="relative">
                    <textarea
                      required
                      rows={5}
                      placeholder={t.contactMessagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-black/40 border border-[#2a2a2a] focus:border-[#FF0000] outline-none text-white font-mono text-xs p-4 tracking-wider transition-colors placeholder:text-[#555] resize-none"
                    />
                  </div>

                  {/* Submit / Success Messages */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={submitting || isTyping}
                      className="w-full md:w-auto bg-[#FF0000] text-white hover:bg-[#d60000] disabled:bg-[#555] font-archivo font-bold text-xs tracking-widest px-8 py-4.5 flex items-center justify-center gap-2.5 transition-colors"
                      id="terminal-submit-btn"
                    >
                      {submitting ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-4 h-4 border-2 border-white border-t-transparent inline-block"
                          />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{t.contactSubmitBtn}</span>
                        </>
                      )}
                    </button>

                    {/* Success Message Banner */}
                    <AnimatePresence>
                      {success && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="font-mono text-xs text-[#00FF66] border border-[#00FF66]/30 bg-[#00FF66]/5 px-4 py-3 flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>{t.contactSuccessMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BRUTALIST CONTACT METADATA CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
          {/* Email */}
          <div className="border border-[#2a2a2a] p-6 flex flex-col justify-between h-36 relative group hover:border-[#FF0000] transition-colors">
            <div className="flex justify-between items-center">
              <Mail className="w-5 h-5 text-[#FF0000]" />
              <button
                onClick={() => copyToClipboard("oguz@oguzatalay.work", "email")}
                className="p-1.5 border border-[#2a2a2a] text-[#555] hover:text-white hover:border-[#FF0000] transition-all bg-black/40"
              >
                {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#A0A0A0] uppercase block mb-1">
                Direct Email
              </span>
              <span className="font-archivo text-base md:text-lg font-bold text-white">
                oguz@oguzatalay.work
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="border border-[#2a2a2a] p-6 flex flex-col justify-between h-36 relative group hover:border-[#FF0000] transition-colors">
            <div className="flex justify-between items-center">
              <Phone className="w-5 h-5 text-[#FF0000]" />
              <button
                onClick={() => copyToClipboard("+90 543 772 50 66", "phone")}
                className="p-1.5 border border-[#2a2a2a] text-[#555] hover:text-white hover:border-[#FF0000] transition-all bg-black/40"
              >
                {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#A0A0A0] uppercase block mb-1">
                Direct Telephone
              </span>
              <span className="font-archivo text-base md:text-lg font-bold text-white">
                +90 543 772 50 66
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="border border-[#2a2a2a] p-6 flex flex-col justify-between h-36 relative group hover:border-[#FF0000] transition-colors">
            <div className="flex justify-between items-center">
              <MapPin className="w-5 h-5 text-[#FF0000]" />
              <span className="font-mono text-[8px] text-[#FF0000] font-bold border border-[#FF0000]/40 px-1.5 py-0.5">
                UTC+3
              </span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#A0A0A0] uppercase block mb-1">
                Base Location
              </span>
              <span className="font-archivo text-base md:text-lg font-bold text-white">
                Istanbul / Aydın / Budva
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
