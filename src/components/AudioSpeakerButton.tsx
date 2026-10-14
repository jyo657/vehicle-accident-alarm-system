import React from 'react';
import { Volume2, Square, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AudioSpeakerButtonProps {
  textToSpeak: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'subtle';
  className?: string;
}

export const AudioSpeakerButton: React.FC<AudioSpeakerButtonProps> = ({
  textToSpeak,
  label,
  size = 'md',
  variant = 'secondary',
  className = ''
}) => {
  const { speak, stopSpeech, isSpeaking, activeSpeechText } = useLanguage();

  const isCurrentTextSpeaking = isSpeaking && activeSpeechText.trim() === textToSpeak.replace(/[*_#`~[\]]/g, ' ').replace(/\s+/g, ' ').trim();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentTextSpeaking) {
      stopSpeech();
    } else {
      speak(textToSpeak);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2'
  };

  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    secondary: 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200',
    subtle: 'bg-slate-100 hover:bg-slate-200 text-slate-700'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={isCurrentTextSpeaking ? "Click to stop speaking" : "Click to listen in selected language"}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer ${sizeClasses[size]} ${
        isCurrentTextSpeaking
          ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
          : variantClasses[variant]
      } ${className}`}
    >
      {isCurrentTextSpeaking ? (
        <>
          <Square className="w-4 h-4 fill-current" />
          <span>{label ? 'Stop Voice' : 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-teal-600 shrink-0" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
};
