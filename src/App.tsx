/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { AccidentSimulator } from './components/AccidentSimulator';
import { UserBenefitsSection } from './components/UserBenefitsSection';
import { EmergencyDispatcher } from './components/EmergencyDispatcher';
import { GoldenHourFirstAid } from './components/GoldenHourFirstAid';
import { HardwareSensorsSection } from './components/HardwareSensorsSection';
import { FirmwareCodeSection } from './components/FirmwareCodeSection';
import { GoogleDriveSyncSection } from './components/GoogleDriveSyncSection';
import { VoiceAssistantBar } from './components/VoiceAssistantBar';
import { Footer } from './components/Footer';
import { AudioSpeakerButton } from './components/AudioSpeakerButton';
import { Car, ShieldAlert, HeartPulse, Radio, PhoneCall, Sparkles, Navigation, CheckCircle2, ArrowRight, Cpu, Code2, LifeBuoy, Cloud } from 'lucide-react';
import { SYSTEM_INFO } from './data/accidentProjectData';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('monitor');
  const { currentLang, speak, stopSpeech, isSpeaking } = useLanguage();

  const isTelugu = currentLang === 'te';

  // Read current active tab overview aloud
  const handleReadCurrentTab = () => {
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    if (activeTab === 'monitor') {
      speak(
        isTelugu
          ? "లైవ్ యాక్సిడెంట్ మానిటర్: వాహనం వేగంగా ఢీకొన్నప్పుడు లేదా బోల్తా పడినప్పుడు ఎంపీయూ 6050 యాక్సిలరోమీటర్ మరియు వైబ్రేషన్ సెన్సార్లు గుర్తిస్తాయి. తప్పుడు అలారం కాకపోతే పది సెకన్ల వ్యవధిలో డ్రైవర్ రద్దు చేయవచ్చు, లేనిచో స్వయంచాలకంగా జీపీఎస్ లొకేషన్‌తో అత్యవసర ఎస్.ఎం.ఎస్ పంపబడుతుంది."
          : "Live crash monitor: Senses resultant impact acceleration and rollover tilt. Initiates a 10-second audible countdown allowing the driver to cancel false alarms. If uncancelled, GPS coordinates are automatically dispatched via SMS."
      );
    } else if (activeTab === 'benefits') {
      speak(
        isTelugu
          ? "ఈ వ్యవస్థ ప్రజలకు ఎలా ఉపయోగపడుతుంది? రోడ్డు ప్రమాదాల్లో క్షతగాత్రులు అపస్మారక స్థితిలో ఉన్నప్పుడు స్వయంచాలకంగా సమాచారం అందించడం, గోల్డెన్ అవర్ లోపు సహాయం అందడం మరియు ద్విచక్ర వాహనదారుల ప్రాణాలను కాపాడటంలో ఇది ముఖ్య పాత్ర పోషిస్తుంది."
          : "How this system helps users: Automatically reports accidents when occupants are unconscious, ensures help arrives within the crucial golden hour, and provides rollover protection for solo two-wheeler riders."
      );
    } else if (activeTab === 'sos') {
      speak(
        isTelugu
          ? "అత్యవసర రెస్పాండర్ మరియు కాల్ లైన్లు: జాతీయ ఎమర్జెన్సీ 112, అంబులెన్స్ 108 మరియు హైవే హెల్ప్‌లైన్ 1033. ప్రమాదం జరిగిన వెంటనే గూగుల్ మ్యాప్స్ లింక్ కుటుంబ సభ్యులకు పంపబడుతుంది."
          : "Emergency dispatcher: Direct dialing for 112 national emergency and 108 medical ambulance. Pre-stored family contacts receive instant Google Maps location links."
      );
    } else if (activeTab === 'firstAid') {
      speak(
        isTelugu
          ? "గోల్డెన్ అవర్ ప్రథమ చికిత్స మార్గదర్శకం: ప్రమాదం జరిగిన మొదటి అరవై నిమిషాలు అత్యంత కీలకం. మెడను కదల్చకూడదు, తీవ్ర రక్తస్రావాన్ని అదిమి పట్టుకోవాలి, స్పృహలేని వ్యక్తి నోట్లో నీళ్లు పోయకూడదు, శ్వాస లేకుంటే వెంటనే సీపీఆర్ ప్రారంభించాలి."
          : "Golden Hour First Aid: Life-saving steps within the first 60 minutes. Cervical spine protection, gentle helmet removal, direct pressure on bleeding, recovery position, and hands-only CPR."
      );
    } else if (activeTab === 'hardware') {
      speak(
        isTelugu
          ? "ఎంబెడెడ్ హార్డ్‌వేర్ ఆర్కిటెక్చర్: ఎంపీయూ 6050 యాక్సిలరోమీటర్, ఎస్.డబ్ల్యు 420 వైబ్రేషన్ సెన్సార్, నియో 6ఎం జీపీఎస్ మరియు సిమ్ 800ఎల్ జిఎస్ఎం మాడ్యూల్ తో రూపొందించబడిన సర్క్యూట్ వివరాలు."
          : "Embedded hardware architecture: Technical specifications for MPU6050 accelerometer, SW-420 vibration sensor, NEO-6M GPS receiver, and SIM800L cellular GSM module."
      );
    } else if (activeTab === 'firmware') {
      speak(
        isTelugu
          ? "ఆర్డునో సి++ ప్రోగ్రామ్: సెన్సార్ రీడింగ్స్, బజర్ కౌంట్‌డౌన్ మరియు జీఎస్ఎం ద్వారా ఎస్.ఎం.ఎస్ పంపే పూర్తి ఫర్మ్‌వేర్ కోడ్ మరియు అప్‌లోడ్ సూచనలు."
          : "Arduino C++ firmware code: Complete production sketch with non-blocking countdown, Euclidean G-force algorithm, GPS coordinate parsing, and AT-command SMS transmission."
      );
    } else if (activeTab === 'driveSync') {
      speak(
        isTelugu
          ? "గూగుల్ డ్రైవ్ క్లౌడ్ బ్యాకప్: మీ గూగుల్ డ్రైవ్ ఖాతాను అనుసంధానించి, వాహన ప్రమాద సెన్సార్ డేటా, జీపీఎస్ టెలిమెట్రీ మరియు అత్యవసర కాంటాక్టులను సురక్షితంగా బ్యాకప్ చేయండి."
          : "Google Drive Cloud Backup: Securely link your Google Drive account to backup vehicle collision telemetry, satellite GPS records, and emergency contact lists."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReadPageOverview={handleReadCurrentTab}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8">
        {/* Top Hero Banner on Monitor Tab */}
        {activeTab === 'monitor' && (
          <div className="relative overflow-hidden bg-linear-to-r from-slate-950 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-8 border border-rose-500/30 shadow-2xl">
            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Automated Life-Safety Telematics</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-300">
                  <span>Embedded Road Safety System</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {isTelugu ? 'వాహన ప్రమాద ఆటోమేటిక్ అలారం వ్యవస్థ' : 'Automated Vehicle Accident Alarm & Road Safety System'}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {isTelugu
                  ? 'ప్రమాదం జరిగినప్పుడు క్షతగాత్రులు అపస్మారక స్థితిలో ఉన్నా, ఎవరి సహాయం అవసరం లేకుండా వాహనమే స్వయంచాలకంగా జీపీఎస్ లొకేషన్‌తో కుటుంబ సభ్యులకు మరియు సహాయక బృందాలకు సమాచారం అందిస్తుంది.'
                  : 'Senses collisions and rollovers in real-time, initiates an audible 10-second driver cancellation window to avoid false alarms, and automatically dispatches exact satellite GPS coordinates to emergency responders.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-rose-600/30 cursor-pointer flex items-center gap-2"
                >
                  <LifeBuoy className="w-4 h-4" />
                  <span>How It Helps Users</span>
                </button>

                <button
                  onClick={() => setActiveTab('sos')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition cursor-pointer flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Emergency SOS Dispatcher</span>
                </button>

                <button
                  onClick={() => setActiveTab('hardware')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 font-semibold text-xs sm:text-sm border border-indigo-700/50 transition cursor-pointer flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Hardware & Sensors</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('driveSync')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold text-xs sm:text-sm border border-indigo-500/50 transition cursor-pointer flex items-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Google Drive Backup</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Routing */}
        {activeTab === 'monitor' && (
          <AccidentSimulator onNavigateToSos={() => setActiveTab('sos')} />
        )}
        {activeTab === 'benefits' && (
          <UserBenefitsSection
            onNavigateToMonitor={() => setActiveTab('monitor')}
            onNavigateToSos={() => setActiveTab('sos')}
          />
        )}
        {activeTab === 'sos' && <EmergencyDispatcher />}
        {activeTab === 'firstAid' && <GoldenHourFirstAid />}
        {activeTab === 'hardware' && <HardwareSensorsSection />}
        {activeTab === 'firmware' && <FirmwareCodeSection />}
        {activeTab === 'driveSync' && <GoogleDriveSyncSection />}
      </main>

      <Footer />
      <VoiceAssistantBar />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
