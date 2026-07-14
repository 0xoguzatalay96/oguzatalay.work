export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] border-t border-[#2a2a2a] py-16 relative overflow-hidden" id="footer-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <h2 className="font-archivo text-3xl md:text-5xl font-black tracking-wider text-white">
              OĞUZ ATALAY
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 font-mono text-xs text-[#555]">
              <span className="hover:text-[#FF0000] transition-colors cursor-default">ISTANBUL / AYDIN / BUDVA</span>
              <span>/</span>
              <a href="tel:+905437725066" className="hover:text-[#FF0000] transition-colors">+90 543 772 50 66</a>
              <span>/</span>
              <a href="mailto:oguz@oguzatalay.work" className="hover:text-[#FF0000] transition-colors">oguz@oguzatalay.work</a>
              <span>/</span>
              <a href="https://oguzatalay.work" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors">oguzatalay.work</a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 font-mono text-[10px] text-[#555]">
          <span>© 2026 OĞUZ ATALAY. ALL RIGHTS RESERVED.</span>
          <span>CRAFTED IN NOCTURNAL MONOLITH THEME</span>
        </div>

      </div>
    </footer>
  );
}
