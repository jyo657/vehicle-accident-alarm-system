import React from 'react';
import { Car, Phone, MapPin, Globe, ShieldCheck, HeartPulse, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { currentLang, setLanguage, languages } = useLanguage();

  return (
    <footer className="mt-20 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: System Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white font-black shadow-md shadow-rose-600/30">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">VAAS Alert</span>
                <span className="block text-[11px] text-rose-400 font-semibold">Embedded Road Safety</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Intelligent Vehicle Accident Alarm System designed to sense severe collisions and rollovers, provide a 10-second false alarm cancellation window, and automatically transmit GPS coordinates via GSM SMS.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero-Internet Cellular Alerting</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>3GPP Standard GSM Communication</span>
              </div>
            </div>
          </div>

          {/* Col 2: Life Safety Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Life Safety Architecture
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span><strong>Multi-Sensor Fusion:</strong> MPU6050 Accelerometer + SW-420 Shock Sensor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span><strong>Human-in-the-Loop:</strong> 10-second audible cancellation window.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span><strong>Golden Hour Rescue:</strong> Rapid GPS dispatch within first 60 minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                <span><strong>Fail-Safe Power:</strong> Battery buck converter with Li-ion backup.</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Hardware Sensors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Embedded Hardware Architecture
            </h4>
            <ul className="text-xs text-slate-400 space-y-1.5 font-mono text-[11px]">
              <li>• MPU6050 3-Axis Accelerometer (I2C)</li>
              <li>• SW-420 High-Sensitivity Vibration Sensor</li>
              <li>• NEO-6M High-Precision GPS Receiver</li>
              <li>• SIM800L Cellular Quad-Band GSM Module</li>
              <li>• 10-Second Driver Cancellation Button</li>
              <li>• LM2596 Regulated Automotive Buck Converter</li>
            </ul>
          </div>

          {/* Col 4: National Emergency Lines */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              24x7 Roadside & Medical Hotlines
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:112"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold transition"
              >
                <span>National Emergency</span>
                <span className="font-mono text-sm">112</span>
              </a>
              <a
                href="tel:108"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold transition"
              >
                <span>Medical Ambulance</span>
                <span className="font-mono text-sm">108</span>
              </a>
              <a
                href="tel:1033"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-700/80 hover:bg-amber-700 text-white font-bold transition"
              >
                <span>NHAI Highway Patrol</span>
                <span className="font-mono text-sm">1033</span>
              </a>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Language / భాష:</span>
              <div className="flex flex-wrap gap-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                      currentLang === l.code ? 'bg-rose-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © Vehicle Accident Alarm System (VAAS) • Road Safety Engineering
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Specialization in</span>
            <span className="font-bold text-rose-400">Artificial Intelligence & Machine Learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
