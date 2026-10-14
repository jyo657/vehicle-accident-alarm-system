import React, { useState } from 'react';
import { Phone, MessageSquare, Plus, Trash2, ShieldCheck, MapPin, Send, AlertOctagon, CheckCircle2, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { EmergencyContact } from '../types';
import { AudioSpeakerButton } from './AudioSpeakerButton';

export const EmergencyDispatcher: React.FC = () => {
  const { currentLang, t, speak } = useLanguage();

  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Family Primary Contact', relation: 'Family', phone: '+91 99639 81111', isPrimary: true },
    { id: '2', name: 'Secondary Kin / Friend', relation: 'Friend', phone: '+91 99636 94444', isPrimary: false }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('Family');
  const [copiedSms, setCopiedSms] = useState(false);

  const isTelugu = currentLang === 'te';
  const sampleLat = 17.751571;
  const sampleLng = 82.984722;

  const sampleSmsText = `EMERGENCY ALERT: Possible Vehicle Crash Detected!
Location: Lat ${sampleLat}, Long ${sampleLng}
Google Maps Pin: https://maps.google.com/?q=${sampleLat},${sampleLng}
Immediate medical and roadside rescue requested.`;

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    const newEntry: EmergencyContact = {
      id: Date.now().toString(),
      name: newName,
      phone: newPhone,
      relation: newRelation,
      isPrimary: contacts.length === 0
    };
    setContacts([...contacts, newEntry]);
    setNewName('');
    setNewPhone('');

    if (isTelugu) {
      speak("అత్యవసర కాంటాక్ట్ విజయవంతంగా జోడించబడింది.");
    } else {
      speak("Emergency contact added successfully.");
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleCopySms = () => {
    navigator.clipboard.writeText(sampleSmsText);
    setCopiedSms(true);
    setTimeout(() => setCopiedSms(false), 2000);
  };

  const handleSendWhatsAppTest = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(sampleSmsText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Lifeline Communication Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.sos.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {t.sos.subtitle}
          </p>
        </div>

        <AudioSpeakerButton
          textToSpeak={isTelugu
            ? "అత్యవసర కాంటాక్ట్స్ మరియు ఎమర్జెన్సీ డిస్పాచర్: ప్రమాదం జరిగినప్పుడు ముందే నమోదు చేసుకున్న కుటుంబ సభ్యుల ఫోన్ నెంబర్లకు గూగుల్ మ్యాప్స్ లొకేషన్‌తో ఎస్.ఎం.ఎస్ వెళ్తుంది. తక్షణ సహాయానికి 112 లేదా 108 నెంబర్లకు కాల్ చేయవచ్చు."
            : "Emergency dispatcher: In case of an accident, an automated SMS containing exact Google Maps coordinates is dispatched to family contacts. Direct calling links for 112 national emergency and 108 ambulance are available."}
          label="Listen SOS Overview"
          variant="primary"
        />
      </div>

      {/* Direct Emergency Calling Hotlines */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-rose-500" />
          <span>{t.sos.emergencyCallTitle} (One-Touch Dial)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href="tel:112"
            className="p-4 bg-red-600 hover:bg-red-500 rounded-2xl text-center text-white transition flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer"
          >
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-2xl font-black">112</span>
            <span className="text-[11px] font-semibold opacity-90">{t.sos.nationalEmergency}</span>
          </a>

          <a
            href="tel:108"
            className="p-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-center text-white transition flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer"
          >
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-2xl font-black">108</span>
            <span className="text-[11px] font-semibold opacity-90">{t.sos.ambulance}</span>
          </a>

          <a
            href="tel:1033"
            className="p-4 bg-amber-600 hover:bg-amber-500 rounded-2xl text-center text-white transition flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer"
          >
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-2xl font-black">1033</span>
            <span className="text-[11px] font-semibold opacity-90">{t.sos.highwayHelpline}</span>
          </a>

          <a
            href="tel:100"
            className="p-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-center text-white transition flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer"
          >
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-2xl font-black">100</span>
            <span className="text-[11px] font-semibold opacity-90">{t.sos.police}</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Manager */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-900 text-base">
              {t.sos.primaryContacts}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              {contacts.length} Contacts Configured
            </span>
          </div>

          {/* Contact List */}
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                    {c.isPrimary && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-slate-600 mt-0.5">
                    {c.phone} • <span className="text-slate-400">{c.relation}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSendWhatsAppTest(c.phone)}
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition"
                    title="Send Test WhatsApp SOS"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <a
                    href={`tel:${c.phone}`}
                    className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 transition"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDeleteContact(c.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Contact Form */}
          <form onSubmit={handleAddContact} className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.sos.addContact}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                required
                placeholder="Name / Relationship"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="tel"
                required
                placeholder="+91 Mobile Number"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={newRelation}
                onChange={(e) => setNewRelation(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Family</option>
                <option>Parent</option>
                <option>Spouse</option>
                <option>Friend</option>
                <option>Doctor</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Save Emergency Contact</span>
            </button>
          </form>
        </div>

        {/* Right: Live GSM SMS Payload Preview */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                SIM800L GSM SMS Payload (160 Chars)
              </span>
              <button
                onClick={handleCopySms}
                className="flex items-center gap-1 text-xs text-teal-700 font-semibold hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSms ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed border border-slate-800 shadow-inner">
              <p className="whitespace-pre-wrap">{sampleSmsText}</p>
            </div>

            <div className="mt-4 p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-1">
              <span className="font-bold block">Why SMS is Vital for Highway Safety:</span>
              <p className="leading-relaxed">
                Unlike internet apps that freeze in zero-reception forest or ghat road corridors, cellular SMS uses the 2G/3G signaling band with superior range and direct map-tap capability.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Automated AT+CMGS GSM Sequence</span>
            <span className="text-teal-700 font-bold">Standard 3GPP GSM 07.05</span>
          </div>
        </div>
      </div>
    </div>
  );
};
