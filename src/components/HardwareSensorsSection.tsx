import React, { useState } from 'react';
import { Cpu, Layers, Radio, Zap, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { HARDWARE_SPECIFICATIONS, CIRCUIT_WIRING_TABLE } from '../data/accidentProjectData';
import { useLanguage } from '../context/LanguageContext';
import { AudioSpeakerButton } from './AudioSpeakerButton';

export const HardwareSensorsSection: React.FC = () => {
  const { currentLang, t } = useLanguage();
  const [selectedSensorId, setSelectedSensorId] = useState<string>('mpu6050');

  const isTelugu = currentLang === 'te';
  const selectedSensor = HARDWARE_SPECIFICATIONS.find(s => s.id === selectedSensorId) || HARDWARE_SPECIFICATIONS[0];

  const getHardwareAudio = () => {
    if (isTelugu) {
      return `హార్డ్‌వేర్ ఆర్కిటెక్చర్ మరియు సెన్సార్లు: వాహన ప్రమాద అలారం వ్యవస్థలో ఎంపీయూ 6050 యాక్సిలరోమీటర్, ఎస్.డబ్ల్యు 420 వైబ్రేషన్ సెన్సార్, నియో 6ఎం జీపీఎస్ రిసీవర్ మరియు సిమ్ 800ఎల్ సెల్యులార్ మాడ్యూల్ ప్రధాన భాగాలు. ఇవి ఐ2సి మరియు సీరియల్ బస్సుల ద్వారా మైక్రోకంట్రోలర్ కు అనుసంధానించబడతాయి.`;
    }
    return `Hardware architecture and sensors: The system integrates the MPU6050 accelerometer, SW-420 vibration sensor, NEO-6M GPS receiver, and SIM800L GSM module. Communicates over I2C and serial UART buses to detect collisions and transmit emergency alerts.`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>Embedded Sensor Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.hardware.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {t.hardware.subtitle}
          </p>
        </div>

        <AudioSpeakerButton
          textToSpeak={getHardwareAudio()}
          label="Listen Hardware Overview"
          variant="primary"
        />
      </div>

      {/* Sensor Selection Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {HARDWARE_SPECIFICATIONS.map((hw) => (
          <button
            key={hw.id}
            onClick={() => setSelectedSensorId(hw.id)}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
              selectedSensorId === hw.id
                ? 'bg-indigo-700 text-white border-indigo-700 shadow-md ring-2 ring-indigo-500/30'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-75 mb-1">
              {hw.role.split(' ')[0]}
            </div>
            <div className="font-bold text-xs leading-snug line-clamp-2">
              {hw.name.split(' ')[0]}
            </div>
          </button>
        ))}
      </div>

      {/* Active Sensor Deep Dive */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              {selectedSensor.role}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {selectedSensor.name}
            </h3>
          </div>

          <AudioSpeakerButton
            textToSpeak={`${selectedSensor.name}. Role: ${selectedSensor.role}. Technical specifications: ${selectedSensor.specs}. Operating Voltage: ${selectedSensor.operatingVoltage}. Interface Bus: ${selectedSensor.interfaceBus}. Calibrated threshold: ${selectedSensor.calibratedThreshold}`}
            label="Listen Component Details"
            size="md"
          />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {selectedSensor.specs}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="font-bold text-indigo-900 block mb-1">Operating Voltage</span>
            <span className="text-slate-700 font-mono">{selectedSensor.operatingVoltage}</span>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="font-bold text-indigo-900 block mb-1">Interface Bus & Pins</span>
            <span className="text-slate-700 font-mono">{selectedSensor.interfaceBus}</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="font-bold text-emerald-900 block mb-1">Calibration Threshold</span>
            <span className="text-slate-700">{selectedSensor.calibratedThreshold}</span>
          </div>
        </div>
      </div>

      {/* Pin-to-Pin Circuit Connection Wiring Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Hardware Circuit Connection & Pinout Table
            </h3>
            <p className="text-xs text-slate-500">
              Complete wiring schematic connecting all sensors to the microcontroller
            </p>
          </div>

          <span className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full text-xs font-bold font-mono">
            9 Interconnects
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-2xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px]">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Hardware Module</th>
                <th className="p-3.5 border-b border-slate-200">Module Pin</th>
                <th className="p-3.5 border-b border-slate-200 font-mono text-indigo-700">Microcontroller Pin</th>
                <th className="p-3.5 border-b border-slate-200">Wire Color</th>
                <th className="p-3.5 border-b border-slate-200">Functional Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {CIRCUIT_WIRING_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">{row.module}</td>
                  <td className="p-3.5 font-mono text-slate-600">{row.modulePin}</td>
                  <td className="p-3.5 font-mono font-bold text-indigo-700 bg-indigo-50/30">{row.arduinoPin}</td>
                  <td className="p-3.5 text-slate-500">{row.wireColor}</td>
                  <td className="p-3.5 text-slate-600 text-[11px]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
