import React from 'react';
import { Github, Heart, Database, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 mt-16 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-200 font-heading">BBC News Pulse</span>
          <span>•</span>
          <span>Automated Python Feed Parser & Supabase Service</span>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <a
            href="https://github.com/kaylapratter/newsscraper"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>GitHub Repository</span>
          </a>
          <a
            href="https://xidizxbsrwrkbgokxdnu.supabase.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors"
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Supabase Cloud</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
