import React from 'react';
import { Newspaper, ShieldCheck, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-[#080b10] mt-16 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400">
                <Newspaper className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-editorial text-white tracking-wide">
                The Weekly News Pulse
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Delivering independent investigative reporting, national news analysis, and regional coverage. Updating every 3 hours with breaking news editions.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading mb-3 text-emerald-400">
              News Desks
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li className="hover:text-white cursor-pointer transition-colors">Kenya & East Africa</li>
              <li className="hover:text-white cursor-pointer transition-colors">National Politics</li>
              <li className="hover:text-white cursor-pointer transition-colors">Business & Economy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Technology & Science</li>
              <li className="hover:text-white cursor-pointer transition-colors">Health & Energy</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading mb-3 text-emerald-400">
              Editorial Standards
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Fact-Checked Reporting</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-teal-400" />
                <span>Global & Regional Desk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Press & Syndication</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 pt-2">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-200">The Weekly News Pulse</strong>. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-slate-400">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Editorial Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
