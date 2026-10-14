import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Cpu, Download, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { ARDUINO_FIRMWARE_CODE } from '../data/accidentProjectData';
import { useLanguage } from '../context/LanguageContext';
import { AudioSpeakerButton } from './AudioSpeakerButton';

export const FirmwareCodeSection: React.FC = () => {
  const { currentLang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const isTelugu = currentLang === 'te';

  const handleCopy = () => {
    navigator.clipboard.writeText(ARDUINO_FIRMWARE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const firmwareAudio = isTelugu
    ? "ఆర్డునో సి++ ఫర్మ్‌వేర్ కోడ్: ఈ ప్రోగ్రామ్ ఎంపీయూ 6050 సెన్సార్ నుండి నిరంతరం డేటాను చదువుతుంది. ప్రమాద కుదుపు 2.5G దాటినప్పుడు లేదా వాహనం బోల్తా పడినప్పుడు పది సెకన్ల కౌంట్‌డౌన్ ప్రారంభిస్తుంది. డ్రైవర్ రద్దు చేయకపోతే జీపీఎస్ లొకేషన్ తో ఎస్.ఎం.ఎస్ పంపుతుంది."
    : "Arduino C++ firmware overview: Embedded sketch that continuously polls MPU6050 via I2C, evaluates Euclidean G-force magnitude, initiates non-blocking 10-second cancellation countdown via millis(), and transmits Google Maps links using GSM AT commands.";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" />
            <span>Embedded C++ Microcontroller Source</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.firmware.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {t.firmware.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AudioSpeakerButton
            textToSpeak={firmwareAudio}
            label="Listen Firmware Overview"
            variant="primary"
          />

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Code Copied!' : 'Copy Arduino Sketch'}</span>
          </button>
        </div>
      </div>

      {/* Code Display Card */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-4 text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-indigo-300">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Vehicle_Accident_Alarm_Firmware.ino</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Target: Arduino Uno / Nano / ESP32
          </span>
        </div>

        <pre className="p-4 bg-slate-900/90 rounded-2xl overflow-x-auto text-xs font-mono text-emerald-400 leading-relaxed border border-slate-800 max-h-[500px] scrollbar-thin">
          {ARDUINO_FIRMWARE_CODE}
        </pre>
      </div>

      {/* Step-by-Step Upload & Flashing Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 text-lg">
          Step-by-Step Arduino IDE Uploading & Flashing Instructions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px]">
              1
            </span>
            <h4 className="font-bold text-slate-900">Install Required Libraries</h4>
            <p className="text-slate-600">
              Open Arduino IDE &rarr; Sketch &rarr; Include Library &rarr; Manage Libraries. Search for <strong>TinyGPS++</strong> by Mikal Hart and <strong>Wire.h</strong> (built-in).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px]">
              2
            </span>
            <h4 className="font-bold text-slate-900">Configure Emergency Contact</h4>
            <p className="text-slate-600">
              In line 28, update <code>EMERGENCY_PHONE[]</code> with your intended target mobile number with country code (e.g., <code>+91XXXXXXXXXX</code>).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px]">
              3
            </span>
            <h4 className="font-bold text-slate-900">Connect Hardware &amp; Select Port</h4>
            <p className="text-slate-600">
              Select <strong>Arduino Uno</strong> under Tools &rarr; Board and select the matching COM port. Ensure the GSM module is powered via external 4V 2A buck output.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px]">
              4
            </span>
            <h4 className="font-bold text-slate-900">Upload & Open Serial Monitor</h4>
            <p className="text-slate-600">
              Click <strong>Upload</strong>. Open Serial Monitor at <strong>9600 baud</strong>. Verify <code>[SYSTEM READY]</code> message and live coordinate acquisition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
