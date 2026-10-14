import React from 'react';
import { ShieldCheck, HeartPulse, LifeBuoy, Clock, Bike, MapPin, Radio, BellRing, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { USER_BENEFITS } from '../data/accidentProjectData';
import { useLanguage } from '../context/LanguageContext';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface UserBenefitsSectionProps {
  onNavigateToMonitor: () => void;
  onNavigateToSos: () => void;
}

export const UserBenefitsSection: React.FC<UserBenefitsSectionProps> = ({ onNavigateToMonitor, onNavigateToSos }) => {
  const { currentLang, t } = useLanguage();
  const isTelugu = currentLang === 'te';

  const iconsMap: Record<string, React.ReactNode> = {
    'life-buoy': <LifeBuoy className="w-6 h-6 text-rose-500" />,
    'clock': <Clock className="w-6 h-6 text-amber-500" />,
    'bike': <Bike className="w-6 h-6 text-indigo-500" />,
    'map-pin': <MapPin className="w-6 h-6 text-emerald-500" />,
    'shield-check': <ShieldCheck className="w-6 h-6 text-teal-500" />,
    'radio': <Radio className="w-6 h-6 text-purple-500" />,
  };

  const overviewAudio = isTelugu
    ? "వాహన ప్రమాద అలారం వ్యవస్థ ప్రజలకు ఎలా ఉపయోగపడుతుంది? మొదటిది: ప్రమాదం జరిగినప్పుడు బాధితుడు అపస్మారక స్థితిలో ఉన్నా వాహనమే స్వయంగా ఎమర్జెన్సీ కాల్ లేదా ఎస్.ఎం.ఎస్ చేస్తుంది. రెండవది: గోల్డెన్ అవర్ మొదటి అరవై నిమిషాల్లో ఆసుపత్రికి చేరడానికి ఖచ్చితమైన జీపీఎస్ లొకేషన్ పంపుతుంది. మూడవది: ద్విచక్ర వాహనాలు బోల్తా పడినప్పుడు వెంటనే గుర్తిస్తుంది. నాల్గవది: ఇంటర్నెట్ లేని అటవీ, కొండ ప్రాంతాల్లోనూ ఎస్.ఎం.ఎస్ పనిచేస్తుంది."
    : "How the Vehicle Accident Alarm System benefits users: First, it eliminates human dependency when occupants are unconscious, automatically reporting the accident. Second, it shortens response time during the vital Golden Hour by transmitting exact satellite GPS coordinates. Third, it provides rollover detection for vulnerable two-wheeler riders. Fourth, it operates via cellular SMS in zero mobile data zones.";

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            <span>Real-World Life Safety Value</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.benefits.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {t.benefits.subtitle}
          </p>
        </div>

        <AudioSpeakerButton
          textToSpeak={overviewAudio}
          label="Listen Benefits Overview"
          variant="primary"
        />
      </div>

      {/* Hero Problem vs Solution Card */}
      <div className="bg-linear-to-r from-slate-950 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>The Fatal Delay Problem Solved</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">
          Why Conventional Road Accident Reporting Fails
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 pt-2 leading-relaxed">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>The Problem with Manual Calling:</span>
            </div>
            <p>
              In highway crashes, victims are frequently knocked unconscious, in shock, or pinned inside wreckage. On lonely highway stretches or late at night, vehicles may remain unseen for hours. When witnesses do call, explaining vague rural landmarks creates fatal ambulance delays.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>How This System Solves It:</span>
            </div>
            <p>
              The system makes the vehicle itself an intelligent emergency beacon. Sensors detect high-G impact and rollover, activate a 10-second driver verification window to eliminate false alarms, and automatically broadcast exact GPS coordinates with a Google Maps pin to family and rescue teams.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Key Benefits Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {USER_BENEFITS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-400 transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                  {iconsMap[item.icon] || <ShieldCheck className="w-6 h-6 text-rose-500" />}
                </div>

                <AudioSpeakerButton
                  textToSpeak={`${isTelugu ? item.titleTelugu : item.title}. ${item.summary}`}
                  size="sm"
                  variant="subtle"
                />
              </div>

              <div>
                <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                  {isTelugu ? item.titleTelugu : item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-bold">
              <span>Verified Life Safety Protection</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Real-Life Comparison Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 text-lg">
          Manual Reporting vs. Automated Vehicle Alarm System
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-2xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px]">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Scenario Parameter</th>
                <th className="p-3.5 border-b border-slate-200 text-rose-700">Without Alarm System (Conventional)</th>
                <th className="p-3.5 border-b border-slate-200 text-emerald-700">With Vehicle Accident Alarm System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Unconscious Driver</td>
                <td className="p-3.5 text-rose-700">No emergency call made until a passerby stops.</td>
                <td className="p-3.5 text-emerald-700 font-semibold">Automatic alert dispatched within 10 seconds.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Location Accuracy</td>
                <td className="p-3.5 text-rose-700">Vague verbal descriptions causing lost search time.</td>
                <td className="p-3.5 text-emerald-700 font-semibold">Pinpoint GPS coordinates with Google Maps link.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Pothole / False Bumps</td>
                <td className="p-3.5 text-slate-500">N/A</td>
                <td className="p-3.5 text-emerald-700 font-semibold">Filtered by moving average; 10s cancel button.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Cellular Reception</td>
                <td className="p-3.5 text-rose-700">Internet apps fail without 4G/5G data.</td>
                <td className="p-3.5 text-emerald-700 font-semibold">SMS operates over reliable 2G/3G signaling channels.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">Golden Hour Arrival</td>
                <td className="p-3.5 text-rose-700">Often exceeded by 40-90 minutes delay.</td>
                <td className="p-3.5 text-emerald-700 font-semibold">Enables ambulance dispatch within initial golden hour.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onNavigateToMonitor}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition shadow-md cursor-pointer"
          >
            <span>Test Working Live Detector</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onNavigateToSos}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
          >
            <span>Configure Emergency Contacts</span>
          </button>
        </div>
      </div>
    </div>
  );
};
