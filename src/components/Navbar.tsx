import React, { useState } from 'react';
import { Car, Globe, Volume2, PhoneCall, Menu, X, Check, ShieldAlert, Cpu, HeartPulse, Code2, Sparkles, LifeBuoy, Cloud } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onReadPageOverview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onReadPageOverview }) => {
  const { currentLang, setLanguage, languages, t, isSpeaking } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'monitor', label: t.tabs.monitor, icon: <Car className="w-3.5 h-3.5" /> },
    { id: 'benefits', label: t.tabs.benefits, icon: <LifeBuoy className="w-3.5 h-3.5" />, highlight: true },
    { id: 'sos', label: t.tabs.sos, icon: <PhoneCall className="w-3.5 h-3.5" /> },
    { id: 'firstAid', label: t.tabs.firstAid, icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { id: 'hardware', label: t.tabs.hardware, icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'firmware', label: t.tabs.firmware, icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'driveSync', label: t.tabs.driveSync, icon: <Cloud className="w-3.5 h-3.5" /> },
  ];

  const currentLangObj = languages.find(l => l.code === currentLang);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Emergency Ribbon */}
      <div className="bg-linear-to-r from-slate-950 via-rose-950 to-slate-900 text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-extrabold text-rose-300">VEHICLE ACCIDENT ALARM SYSTEM (VAAS)</span>
            <span className="hidden md:inline text-slate-400">| Intelligent Crash Detection, Cancellation & Satellite GPS SOS</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="hidden sm:inline text-slate-300">Toll-Free Emergency:</span>
            <a 
              href="tel:112" 
              className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white px-2.5 py-0.5 rounded-full font-bold transition shadow-xs"
            >
              <PhoneCall className="w-3 h-3" />
              <span>SOS 112</span>
            </a>
            <a 
              href="tel:108" 
              className="hidden sm:flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold transition"
            >
              <span>Ambulance 108</span>
            </a>
            <a 
              href="tel:1033" 
              className="hidden md:flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold transition"
            >
              <span>Highway 1033</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('monitor')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-rose-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-rose-600/20 group-hover:scale-105 transition-transform">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                VAAS Alert
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                Road Safety
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs">
              Vehicle Accident Alarm System
            </p>
          </div>
        </div>

        {/* Audio Speaker & Multilingual Language Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Page Reader Button */}
          <button
            onClick={onReadPageOverview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer active:scale-95"
            title="Read current page aloud in selected language"
          >
            <Volume2 className={`w-4 h-4 text-rose-600 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">{isSpeaking ? t.stopVoice : t.listenToPage}</span>
            <span className="sm:hidden">Audio</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-300 transition cursor-pointer"
            >
              <Globe className="w-4 h-4 text-slate-600" />
              <span>{currentLangObj?.name}</span>
            </button>

            {langMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 divide-y divide-slate-100 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setLangMenuOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Language / భాష ఎంచుకోండి
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-rose-50 transition cursor-pointer ${
                      currentLang === lang.code ? 'bg-rose-50/80 text-rose-800 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{lang.nativeName}</div>
                      <div className="text-[10px] text-slate-500">{lang.name}</div>
                    </div>
                    {currentLang === lang.code && <Check className="w-4 h-4 text-rose-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <nav className="hidden md:block bg-slate-50 border-t border-slate-200 px-4 sm:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 py-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === item.id
                  ? 'bg-rose-700 text-white shadow-xs'
                  : item.highlight
                  ? 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white px-4 py-3 space-y-1 shadow-2xl animate-in slide-in-from-top border-t border-slate-800">
          <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-2">
            System Menu
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
