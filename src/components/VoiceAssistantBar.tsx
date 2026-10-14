import React from 'react';
import { Volume2, VolumeX, Pause, Play, Square, FastForward, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VoiceAssistantBar: React.FC = () => {
  const {
    isSpeaking,
    isPaused,
    activeSpeechText,
    speechRate,
    setSpeechRate,
    pauseSpeech,
    resumeSpeech,
    stopSpeech,
    currentLang,
    languages,
    t
  } = useLanguage();

  if (!isSpeaking && !isPaused) return null;

  const currentLangObj = languages.find(l => l.code === currentLang);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-teal-500/30 p-4 transition-all duration-300 animate-in slide-in-from-bottom">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
            {t.voicePlaying} ({currentLangObj?.nativeName})
          </span>
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 text-xs text-slate-300">
          <button
            onClick={() => setSpeechRate(0.8)}
            className={`px-1.5 py-0.5 rounded ${speechRate === 0.8 ? 'bg-teal-600 text-white font-bold' : 'hover:text-white'}`}
            title="Slow speed"
          >
            0.8x
          </button>
          <button
            onClick={() => setSpeechRate(0.95)}
            className={`px-1.5 py-0.5 rounded ${speechRate === 0.95 ? 'bg-teal-600 text-white font-bold' : 'hover:text-white'}`}
            title="Normal speed"
          >
            1.0x
          </button>
          <button
            onClick={() => setSpeechRate(1.2)}
            className={`px-1.5 py-0.5 rounded ${speechRate === 1.2 ? 'bg-teal-600 text-white font-bold' : 'hover:text-white'}`}
            title="Fast speed"
          >
            1.2x
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-200 line-clamp-2 italic mb-3">
        "{activeSpeechText || 'Speaking...'}"
      </p>

      {/* Control buttons */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-800 pt-2">
        <div className="flex items-center gap-2">
          {isPaused ? (
            <button
              onClick={resumeSpeech}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-medium transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={pauseSpeech}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 rounded-lg text-xs font-medium transition"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={stopSpeech}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/80 hover:bg-rose-600 rounded-lg text-xs font-medium transition"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Stop</span>
          </button>
        </div>

        <span className="text-[11px] text-teal-300/80 font-mono">
          JalaRaksha Voice
        </span>
      </div>
    </div>
  );
};
