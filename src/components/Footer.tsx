import { Instagram, Linkedin, Mail } from "lucide-react";
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
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.023-5.11-2.885-6.974C16.591 1.81 14.115.783 11.99.783c-5.442 0-9.863 4.42-9.867 9.861-.001 1.83.49 3.618 1.418 5.2l-.993 3.63 3.731-.978zm11.233-7.234c-.312-.156-1.848-.912-2.123-1.012-.275-.102-.476-.151-.676.151-.2.302-.776.1-.951.302-.175.201-.351.226-.663.07-.312-.156-1.316-.485-2.508-1.548-.928-.827-1.554-1.849-1.736-2.16-.18-.312-.02-.481.136-.636.141-.139.312-.363.469-.544.156-.181.208-.312.312-.522.104-.21.052-.393-.026-.544-.078-.151-.676-1.631-.926-2.236-.243-.585-.49-.506-.676-.516-.174-.008-.374-.01-.575-.01-.201 0-.527.075-.803.377-.276.302-1.053 1.03-1.053 2.513s1.078 2.916 1.228 3.117c.15.201 2.122 3.241 5.14 4.547.717.31 1.277.496 1.713.635.722.23 1.378.197 1.897.12.578-.087 1.848-.756 2.11-1.448.263-.693.263-1.287.185-1.412-.078-.125-.284-.201-.597-.357z"/>
              </svg>
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
