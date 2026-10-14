import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Navigation, Radio, Play, RotateCcw, Volume2, Sparkles, Smartphone, BellRing, MapPin, Gauge, ShieldCheck, Car, Activity, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SensorState, CrashIncidentLog } from '../types';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface AccidentSimulatorProps {
  onIncidentLogged?: (incident: CrashIncidentLog) => void;
  onNavigateToSos?: () => void;
}

export const AccidentSimulator: React.FC<AccidentSimulatorProps> = ({ onIncidentLogged, onNavigateToSos }) => {
  const { currentLang, t, speak } = useLanguage();

  // Sensors & State
  const [sensor, setSensor] = useState<SensorState>({
    accelX: 0.12,
    accelY: 0.08,
    accelZ: 0.98,
    resultantG: 0.99,
    tiltAngle: 2.5,
    vibrationTriggered: false,
    systemState: 'MONITORING',
    speedKmH: 48
  });

  const [countdownSeconds, setCountdownSeconds] = useState<number>(10);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number }>({
    lat: 17.751571,
    lng: 82.984722
  });
  const [usingDeviceSensors, setUsingDeviceSensors] = useState<boolean>(false);
  const [recentIncidents, setRecentIncidents] = useState<CrashIncidentLog[]>([]);
  const [isDriveModeActive, setIsDriveModeActive] = useState<boolean>(true);
  const [audioBuzzerMuted, setAudioBuzzerMuted] = useState<boolean>(false);

  const isTelugu = currentLang === 'te';
  const timerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play hardware buzzer beep using Web Audio API
  const playBuzzerBeep = () => {
    if (audioBuzzerMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.log("Audio buzzer beep triggered", e);
    }
  };

  // Acquire actual device GPS if allowed
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsCoords({
            lat: Number(pos.coords.latitude.toFixed(6)),
            lng: Number(pos.coords.longitude.toFixed(6))
          });
        },
        (err) => {
          console.log("Using standard GPS coordinates for demo", err);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // Countdown timer logic with audible pulsing beep
  useEffect(() => {
    if (sensor.systemState === 'COUNTDOWN_ACTIVE') {
      playBuzzerBeep();
      if (countdownSeconds > 0) {
        timerRef.current = setTimeout(() => {
          setCountdownSeconds((prev) => prev - 1);
        }, 1000);
      } else {
        // Countdown reached zero -> Trigger automatic SOS dispatch!
        handleDispatchEmergencySOS();
      }
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sensor.systemState, countdownSeconds]);

  // Subtle live vibration and road jitter during normal driving mode
  useEffect(() => {
    if (!isDriveModeActive || sensor.systemState !== 'MONITORING' || usingDeviceSensors) return;

    const interval = setInterval(() => {
      const jitterX = Number(((Math.random() - 0.5) * 0.15).toFixed(2));
      const jitterY = Number(((Math.random() - 0.5) * 0.12).toFixed(2));
      const baseZ = 0.98 + (Math.random() - 0.5) * 0.08;
      const resultant = Math.sqrt(jitterX * jitterX + jitterY * jitterY + baseZ * baseZ);
      const simulatedSpeed = Math.floor(55 + (Math.random() - 0.5) * 10);

      setSensor((prev) => ({
        ...prev,
        accelX: jitterX,
        accelY: jitterY,
        accelZ: Number(baseZ.toFixed(2)),
        resultantG: Number(resultant.toFixed(2)),
        speedKmH: simulatedSpeed,
        tiltAngle: Number((2.0 + Math.random() * 1.5).toFixed(1))
      }));
    }, 1200);

    return () => clearInterval(interval);
  }, [isDriveModeActive, sensor.systemState, usingDeviceSensors]);

  // Handle device motion listeners if toggled
  useEffect(() => {
    if (!usingDeviceSensors) return;

    const handleMotion = (event: DeviceMotionEvent) => {
      if (event.accelerationIncludingGravity) {
        const ax = (event.accelerationIncludingGravity.x || 0) / 9.8;
        const ay = (event.accelerationIncludingGravity.y || 0) / 9.8;
        const az = (event.accelerationIncludingGravity.z || 9.8) / 9.8;
        const resultant = Math.sqrt(ax * ax + ay * ay + az * az);

        setSensor((prev) => {
          if (prev.systemState === 'MONITORING' && resultant > 2.5) {
            triggerAbnormalEvent(resultant, prev.tiltAngle, true);
          }
          return {
            ...prev,
            accelX: Number(ax.toFixed(2)),
            accelY: Number(ay.toFixed(2)),
            accelZ: Number(az.toFixed(2)),
            resultantG: Number(resultant.toFixed(2)),
          };
        });
      }
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const tilt = Math.abs(event.gamma || 0);
      setSensor((prev) => {
        if (prev.systemState === 'MONITORING' && tilt > 60) {
          triggerAbnormalEvent(prev.resultantG, tilt, prev.vibrationTriggered);
        }
        return {
          ...prev,
          tiltAngle: Number(tilt.toFixed(1))
        };
      });
    };

    window.addEventListener('devicemotion', handleMotion);
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [usingDeviceSensors]);

  // Trigger abnormal detection
  const triggerAbnormalEvent = (gForce: number, tilt: number, vib: boolean) => {
    setSensor((prev) => ({
      ...prev,
      resultantG: Number(gForce.toFixed(2)),
      tiltAngle: Number(tilt.toFixed(1)),
      vibrationTriggered: vib,
      systemState: 'COUNTDOWN_ACTIVE'
    }));
    setCountdownSeconds(10);
    playBuzzerBeep();

    if (isTelugu) {
      speak("హెచ్చరిక! తీవ్రమైన ప్రమాద కుదుపు నమోదైంది. పది సెకన్లలో రద్దు చేయకపోతే అత్యవసర సందేశం పంపబడుతుంది.");
    } else {
      speak("Warning! Potential vehicle crash detected. Ten second cancellation countdown active. Press cancel if you are safe.");
    }
  };

  // Driver Cancel Button
  const handleCancelAlert = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSensor((prev) => ({
      ...prev,
      systemState: 'ALERT_CANCELLED',
      resultantG: 1.0,
      vibrationTriggered: false
    }));

    if (isTelugu) {
      speak("అలారం రద్దు చేయబడింది. సిస్టమ్ తిరిగి సాధారణ స్థితికి చేరింది.");
    } else {
      speak("Alert cancelled by driver. System returned to normal monitoring.");
    }

    setTimeout(() => {
      setSensor((prev) => ({ ...prev, systemState: 'MONITORING' }));
    }, 2500);
  };

  // Automatic SOS Dispatch
  const handleDispatchEmergencySOS = () => {
    setSensor((prev) => ({
      ...prev,
      systemState: 'SOS_DISPATCHED'
    }));

    const newLog: CrashIncidentLog = {
      id: `INC-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      resultantG: sensor.resultantG,
      tiltAngle: sensor.tiltAngle,
      latitude: gpsCoords.lat,
      longitude: gpsCoords.lng,
      status: 'Dispatched',
      mapUrl: `https://maps.google.com/?q=${gpsCoords.lat},${gpsCoords.lng}`
    };

    setRecentIncidents((prev) => [newLog, ...prev.slice(0, 4)]);
    if (onIncidentLogged) onIncidentLogged(newLog);

    if (isTelugu) {
      speak(`ప్రమాదం ధృవీకరించబడింది. లైవ్ లొకేషన్ తో అత్యవసర ఎస్.ఎం.ఎస్ మరియు గూగుల్ మ్యాప్స్ లింక్ రెస్పాండర్లకు పంపబడింది.`);
    } else {
      speak(`Crash confirmed. Emergency SOS with live GPS location dispatched to stored contacts.`);
    }
  };

  // Manual Test Simulation Presets
  const runPresetTest = (presetName: string) => {
    if (presetName === 'normal') {
      setSensor({
        accelX: 0.15,
        accelY: 0.12,
        accelZ: 0.98,
        resultantG: 0.99,
        tiltAngle: 3.0,
        vibrationTriggered: false,
        systemState: 'MONITORING',
        speedKmH: 52
      });
      if (isTelugu) speak("సాధారణ డ్రైవింగ్: సెన్సార్ రీడింగ్స్ సురక్షిత పరిధిలో ఉన్నాయి.");
      else speak("Normal driving condition: Sensor readings within safe threshold.");
    } else if (presetName === 'pothole') {
      setSensor({
        accelX: 0.65,
        accelY: 0.42,
        accelZ: 1.15,
        resultantG: 1.38,
        tiltAngle: 8.5,
        vibrationTriggered: true,
        systemState: 'MONITORING',
        speedKmH: 35
      });
      if (isTelugu) speak("రోడ్డు గుంత లేదా స్పీడ్ బ్రేకర్: ఫిల్టర్ ద్వారా తప్పుడు అలారం ఆపబడింది.");
      else speak("Speed bump detected: 1.38 G-Force filtered out by moving average algorithm. No false alarm.");
    } else if (presetName === 'crash') {
      triggerAbnormalEvent(3.45, 14.2, true);
    } else if (presetName === 'rollover') {
      triggerAbnormalEvent(1.85, 78.4, true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Interactive Telematics Software Unit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.monitor.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {t.monitor.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <AudioSpeakerButton
            textToSpeak={isTelugu
              ? "వాహన ప్రమాద హెచ్చరిక వ్యవస్థ: సెన్సార్లు వాహన కదలికలను నిరంతరం గమనిస్తాయి. ప్రమాదం జరిగినప్పుడు పది సెకన్ల బజర్ కౌంట్‌డౌన్ ప్రారంభమవుతుంది. మీరు సురక్షితంగా ఉంటే రద్దు బటన్ నొక్కవచ్చు, లేకుంటే ఆటోమేటిక్ గా గూగుల్ మ్యాప్స్ లొకేషన్ తో ఎస్.ఎం.ఎస్ పంపబడుతుంది."
              : "Vehicle Accident Alarm System monitors real-time G-force and tilt. When a collision occurs, a 10-second buzzer countdown starts. If not cancelled by the driver, emergency SMS with exact GPS Google Maps link is automatically transmitted."}
            label="Listen Workflow"
            variant="primary"
          />

          <button
            onClick={() => setUsingDeviceSensors(!usingDeviceSensors)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              usingDeviceSensors
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
            }`}
            title="Use physical mobile accelerometer if on phone"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{usingDeviceSensors ? 'Phone Motion Active' : 'Use Phone Sensors'}</span>
          </button>
        </div>
      </div>

      {/* Hardware Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Polling Rate</div>
            <div className="text-sm font-black text-slate-900 font-mono">20 Hz (50ms)</div>
          </div>
          <Zap className="w-4 h-4 text-amber-500" />
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">GPS Satellite Fix</div>
            <div className="text-sm font-black text-emerald-600 font-mono">LOCKED (8 Sats)</div>
          </div>
          <Navigation className="w-4 h-4 text-emerald-500" />
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">GSM Network</div>
            <div className="text-sm font-black text-indigo-600 font-mono">CONNECTED (3GPP)</div>
          </div>
          <Radio className="w-4 h-4 text-indigo-500" />
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Vehicle Speed</div>
            <div className="text-sm font-black text-slate-900 font-mono">{sensor.speedKmH} km/h</div>
          </div>
          <Gauge className="w-4 h-4 text-rose-500" />
        </div>
      </div>

      {/* Main Monitoring Screen */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-lg transition-all duration-300 ${
        sensor.systemState === 'COUNTDOWN_ACTIVE'
          ? 'bg-rose-950 text-white border-rose-600 animate-pulse'
          : sensor.systemState === 'SOS_DISPATCHED'
          ? 'bg-slate-900 text-white border-emerald-500'
          : sensor.systemState === 'ALERT_CANCELLED'
          ? 'bg-emerald-950 text-white border-emerald-600'
          : 'bg-white border-slate-200'
      }`}>
        {/* System State Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/20 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full ${
              sensor.systemState === 'COUNTDOWN_ACTIVE'
                ? 'bg-rose-500 animate-ping'
                : sensor.systemState === 'SOS_DISPATCHED'
                ? 'bg-emerald-400'
                : 'bg-emerald-500'
            }`}></span>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest opacity-75">
                {t.monitor.currentState}
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {sensor.systemState.replace('_', ' ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-black/30 px-3.5 py-2 rounded-xl border border-white/10">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>GPS: {gpsCoords.lat.toFixed(5)}, {gpsCoords.lng.toFixed(5)}</span>
          </div>
        </div>

        {/* ACTIVE COUNTDOWN STATE WITH PIEZO BUZZER SOUND */}
        {sensor.systemState === 'COUNTDOWN_ACTIVE' && (
          <div className="p-6 bg-rose-900/90 rounded-2xl border-2 border-rose-500 text-center space-y-4 mb-6 shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-rose-200 text-xs font-bold uppercase tracking-wider">
              <BellRing className="w-5 h-5 text-rose-300 animate-bounce" />
              <span>{t.monitor.countdownNotice}</span>
            </div>

            <div className="text-6xl sm:text-7xl font-black font-mono text-white tracking-widest drop-shadow-lg">
              00:{countdownSeconds.toString().padStart(2, '0')}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
              <span>Audio Buzzer Beep Active (85dB Simulation)</span>
            </div>

            <p className="text-xs sm:text-sm text-rose-100 max-w-lg mx-auto">
              {isTelugu
                ? 'కుదుపు తీవ్రత 2.5G దాటింది. మీరు క్షేమంగా ఉంటే కింద ఉన్న రద్దు బటన్ నొక్కండి.'
                : 'Resultant impact exceeded 2.5g safety threshold. Press cancel if this was an accidental drop or harmless bump.'}
            </p>

            <button
              onClick={handleCancelAlert}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-base sm:text-lg shadow-xl transition-all transform active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              {t.monitor.cancelButton}
            </button>
          </div>
        )}

        {/* SOS DISPATCHED STATE */}
        {sensor.systemState === 'SOS_DISPATCHED' && (
          <div className="p-6 bg-emerald-950/90 rounded-2xl border border-emerald-500 text-center space-y-3 mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-black text-emerald-200">
              {t.monitor.sosSentNotice}
            </h3>
            <p className="text-xs text-emerald-300 max-w-md mx-auto font-mono">
              GPS Google Maps: https://maps.google.com/?q={gpsCoords.lat},{gpsCoords.lng}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => runPresetTest('normal')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Reset to Monitoring State
              </button>
              {onNavigateToSos && (
                <button
                  onClick={onNavigateToSos}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  View Dispatched Contacts
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sensor Gauges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Gauge 1: Resultant G-Force */}
          <div className={`p-5 rounded-2xl border ${
            sensor.systemState === 'COUNTDOWN_ACTIVE' ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-1">
              {t.monitor.acceleration}
            </span>
            <div className="text-3xl font-black font-mono tracking-tight">
              {sensor.resultantG} <span className="text-base font-normal opacity-70">g</span>
            </div>
            <div className="text-[11px] opacity-70 mt-1">
              Threshold: &gt; 2.50 g (Collision)
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-200/40 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  sensor.resultantG > 2.5 ? 'bg-rose-500' : 'bg-teal-500'
                }`}
                style={{ width: `${Math.min(100, (sensor.resultantG / 3.5) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Gauge 2: Tilt Angle */}
          <div className={`p-5 rounded-2xl border ${
            sensor.systemState === 'COUNTDOWN_ACTIVE' ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-1">
              {t.monitor.tiltAngle}
            </span>
            <div className="text-3xl font-black font-mono tracking-tight">
              {sensor.tiltAngle}° <span className="text-base font-normal opacity-70">roll</span>
            </div>
            <div className="text-[11px] opacity-70 mt-1">
              Threshold: &gt; 60° (Rollover Crash)
            </div>
            <div className="w-full h-2 bg-slate-200/40 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  sensor.tiltAngle > 60 ? 'bg-rose-500' : 'bg-cyan-500'
                }`}
                style={{ width: `${Math.min(100, (sensor.tiltAngle / 90) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Gauge 3: Shock Sensor */}
          <div className={`p-5 rounded-2xl border ${
            sensor.systemState === 'COUNTDOWN_ACTIVE' ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-1">
              {t.monitor.vibration}
            </span>
            <div className="text-3xl font-black font-mono tracking-tight flex items-center gap-2">
              <span className={`inline-block w-3.5 h-3.5 rounded-full ${sensor.vibrationTriggered ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
              <span>{sensor.vibrationTriggered ? 'SHOCK TRIGGERED' : 'NORMAL'}</span>
            </div>
            <div className="text-[11px] opacity-70 mt-1">
              SW-420 Mechanical Sensor
            </div>
            <div className="w-full h-2 bg-slate-200/40 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  sensor.vibrationTriggered ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: sensor.vibrationTriggered ? '100%' : '15%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Simulation Controls (To Test That It's Working) */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-70 mb-2">
            <span>{t.monitor.triggerSim} (Click to Test Real Scenarios)</span>
            <button
              onClick={() => setAudioBuzzerMuted(!audioBuzzerMuted)}
              className="text-[11px] normal-case opacity-90 hover:underline cursor-pointer"
            >
              {audioBuzzerMuted ? '🔇 Buzzer Muted' : '🔊 Buzzer Sound On'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => runPresetTest('normal')}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer text-left"
            >
              🟢 Normal Drive (0.9g)
              <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Smooth highway cruise</span>
            </button>

            <button
              onClick={() => runPresetTest('pothole')}
              className="p-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition cursor-pointer text-left"
            >
              🟡 Pothole / Speed Bump
              <span className="block text-[10px] font-normal text-amber-700 mt-0.5">1.38g filtered by moving avg</span>
            </button>

            <button
              onClick={() => runPresetTest('crash')}
              className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition cursor-pointer text-left shadow-sm"
            >
              🔴 Severe Collision (3.45g)
              <span className="block text-[10px] font-normal text-rose-100 mt-0.5">Triggers 10s countdown beep</span>
            </button>

            <button
              onClick={() => runPresetTest('rollover')}
              className="p-3 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition cursor-pointer text-left shadow-sm"
            >
              🟣 Vehicle Rollover (78°)
              <span className="block text-[10px] font-normal text-purple-200 mt-0.5">Overturn detection active</span>
            </button>
          </div>
        </div>
      </div>

      {/* Incident Dispatch Log */}
      {recentIncidents.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <span>Verified Incident Dispatch Log</span>
          </h3>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
            {recentIncidents.map((inc) => (
              <div key={inc.id} className="p-3.5 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-900">{inc.id}</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">{inc.timestamp}</span>
                </div>
                <div className="text-slate-700">
                  Impact: <strong className="text-rose-600">{inc.resultantG}g</strong> • Tilt: <strong>{inc.tiltAngle}°</strong>
                </div>
                <a
                  href={inc.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition"
                >
                  View Google Maps Pin ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
