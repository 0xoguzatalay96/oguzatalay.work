import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
export default function Footer() {
  return (
        <footer className="bg-[#0e0e0e] border-t border-[#2a2a2a] py-12 relative overflow-hidden" id="footer-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand & Short Info */}
          <div className="text-center md:text-left">
            <h2 className="font-archivo text-2xl md:text-4xl font-black tracking-widest text-white mb-2">
              OĞUZ ATALAY
            </h2>
            <div className="font-mono text-[11px] text-[#555] flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center md:justify-start">
              <span>ISTANBUL / AYDIN / BUDVA</span>
              <span className="hidden sm:inline">|</span>
              <a href="tel:+905437725066" className="hover:text-[#FF0000] transition-colors">+90 543 772 50 66</a>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/ogicimnapiyon/" target="_blank" rel="noopener noreferrer" className="p-3 border border-[#2a2a2a] hover:border-[#FF0000] text-[#A0A0A0] hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-all rounded-full">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/oguzatalay96/" target="_blank" rel="noopener noreferrer" className="p-3 border border-[#2a2a2a] hover:border-[#FF0000] text-[#A0A0A0] hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-all rounded-full">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:oguz@oguzatalay.work" className="p-3 border border-[#2a2a2a] hover:border-[#FF0000] text-[#A0A0A0] hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-all rounded-full">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://wa.me/905437725066" target="_blank" rel="noopener noreferrer" className="p-3 border border-[#2a2a2a] hover:border-[#FF0000] text-[#A0A0A0] hover:text-[#00FF66] hover:bg-[#00FF66]/10 transition-all rounded-full" title="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] text-[#555] text-center sm:text-left">
          <span>© 2026 OĞUZ ATALAY. ALL RIGHTS RESERVED.</span>
          <span>CRAFTED IN NOCTURNAL MONOLITH THEME</span>
        </div>
      </div>
    </footer>
  );
}
