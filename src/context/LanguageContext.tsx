import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SupportedLanguage, LanguageOption } from '../types';
import { LANGUAGE_OPTIONS, TRANSLATIONS, TranslationStrings } from '../data/translations';

interface LanguageContextType {
  currentLang: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationStrings;
  languages: LanguageOption[];
  // Audio speaker features
  isSpeaking: boolean;
  isPaused: boolean;
  activeSpeechText: string;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  speak: (text: string, customLang?: SupportedLanguage) => void;
  pauseSpeech: () => void;
  resumeSpeech: () => void;
  stopSpeech: () => void;
  availableVoices: SpeechSynthesisVoice[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('te'); // Default to Telugu as Bowluvada is in AP!
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSpeechText, setActiveSpeechText] = useState('');
  const [speechRate, setSpeechRate] = useState(0.95);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load available system voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveSpeechText('');
  }, []);

  const pauseSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSpeaking]);

  const resumeSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const speak = useCallback((text: string, customLang?: SupportedLanguage) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (!text || text.trim() === '') return;

    const langCode = customLang || currentLang;
    const selectedLangConfig = LANGUAGE_OPTIONS.find(l => l.code === langCode) || LANGUAGE_OPTIONS[0];

    // Clean text: strip markdown characters or extra technical symbols
    const cleanText = text.replace(/[*_#`~[\]]/g, ' ').replace(/\s+/g, ' ').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    utterance.lang = selectedLangConfig.voiceLang;

    // Find best matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => 
      v.lang.toLowerCase() === selectedLangConfig.voiceLang.toLowerCase() ||
      v.lang.toLowerCase().startsWith(langCode)
    ) || voices.find(v => v.lang.includes('IN')) || voices[0];

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setActiveSpeechText(cleanText);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSpeechText('');
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error or cancelled:", e);
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSpeechText('');
    };

    window.speechSynthesis.speak(utterance);
  }, [currentLang, speechRate]);

  const setLanguage = (lang: SupportedLanguage) => {
    stopSpeech();
    setCurrentLang(lang);
  };

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage,
        t,
        languages: LANGUAGE_OPTIONS,
        isSpeaking,
        isPaused,
        activeSpeechText,
        speechRate,
        setSpeechRate,
        speak,
        pauseSpeech,
        resumeSpeech,
        stopSpeech,
        availableVoices
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
