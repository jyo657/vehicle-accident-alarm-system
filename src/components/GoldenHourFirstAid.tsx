import React, { useState } from 'react';
import { HeartPulse, ShieldAlert, AlertTriangle, CheckCircle2, PhoneCall, Sparkles, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AudioSpeakerButton } from './AudioSpeakerButton';

export const GoldenHourFirstAid: React.FC = () => {
  const { currentLang, t, speak } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  const isTelugu = currentLang === 'te';

  const steps = [
    {
      id: 1,
      title: "1. Protect Cervical Spine & Do Not Yank Neck",
      titleTelugu: "1. మెడ మరియు వెన్నెముకను కదల్చవద్దు",
      desc: "In high-speed crashes, neck fractures are common. Never pull the victim by their hands or bend their head. Support the head and neck in a neutral straight line.",
      descTelugu: "రోడ్డు ప్రమాదాల్లో మెడ మరియు వెన్నెముక గాయాలు సర్వసాధారణం. బాధితుడి తలను లేదా మెడను వేగంగా అటూ ఇటూ కదల్చకూడదు. తల మరియు మెడను నేరుగా ఉంచాలి.",
      dos: ["Support head with both hands from behind", "Keep spine aligned on a flat firm surface"],
      dosTelugu: ["రెండు చేతులతో తలను కదలకుండా పట్టుకోవాలి", "వెన్నును సమాంతరంగా ఉంచాలి"],
      donts: ["Do not put pillows under head", "Do not pull victim out of wreckage hastily unless there is fire risk"],
      dontsTelugu: ["తల కింద ఎత్తుగా దిండు పెట్టకూడదు", "మంటలు ఉంటే తప్ప బలవంతంగా లాగకూడదు"]
    },
    {
      id: 2,
      title: "2. Safe Helmet Removal (Two-Person Protocol)",
      titleTelugu: "2. హెల్మెట్ తీసేటప్పుడు తీసుకోవాల్సిన జాగ్రత్తలు",
      desc: "If the rider is conscious and breathing freely, leave the helmet ON until medical professionals arrive. If unconscious or not breathing, remove it gently using two people without twisting the neck.",
      descTelugu: "బాధితుడు స్పృహలో ఉండి శ్వాస తీసుకుంటుంటే హెల్మెట్ తీయకుండా అలాగే ఉంచడం మంచిది. శ్వాస ఆడకపోతే ఇద్దరు వ్యక్తులు కలిసి మెడను కదల్చకుండా జాగ్రత్తగా తీయాలి.",
      dos: ["One person holds the mandible/neck stationary", "Second person unbuckles strap and expands sides outward"],
      dosTelugu: ["ఒక వ్యక్తి మెడను గట్టిగా పట్టుకోవాలి", "రెండవ వ్యక్తి స్ట్రాప్ విప్పి జాగ్రత్తగా తీయాలి"],
      donts: ["Never twist or force the helmet off roughly", "Do not let the head drop back onto the road"],
      dontsTelugu: ["హెల్మెట్‌ను మెలితిప్పి లాగకూడదు", "తల నేలకేసి కొట్టుకోకుండా చూసుకోవాలి"]
    },
    {
      id: 3,
      title: "3. Direct Pressure Hemorrhage Control",
      titleTelugu: "3. తీవ్ర రక్తస్రావాన్ని అరికట్టే విధానం",
      desc: "Severe arterial bleeding can drain fatal blood volume in under 3 minutes. Apply hard continuous pressure directly over the wound with a clean cloth or bandage.",
      descTelugu: "రక్తం ధారగా కారుతుంటే 3 నిమిషాల్లో ప్రాణాపాయం కలగవచ్చు. శుభ్రమైన కాటన్ గుడ్డ లేదా బట్టతో గాయంపై గట్టిగా అదిమి పట్టుకోవాలి.",
      dos: ["Maintain uninterrupted pressure for at least 10 minutes", "Elevate bleeding limb above heart level if no fracture"],
      dosTelugu: ["కనీసం 10 నిమిషాలు చేత్తో గట్టిగా అదిమి ఉంచాలి", "గాయమైన చేతిని లేదా కాలును పైకి ఎత్తాలి"],
      donts: ["Do not remove soaked cloth—place another cloth directly on top", "Do not apply tight tourniquets without medical training"],
      dontsTelugu: ["రక్తం తడిసిన బట్టను తీయకూడదు, దానిపైనే మరో బట్ట వేయాలి", "తీగలు లేదా బిగుతైన తాడులతో కట్టకూడదు"]
    },
    {
      id: 4,
      title: "4. Airway Clearing & Recovery Position",
      titleTelugu: "4. శ్వాస మార్గం తెరవడం & రికవరీ పొజిషన్",
      desc: "An unconscious victim lying on their back risks tongue falling backward or choking on vomit. If breathing, turn them gently to their side (Recovery Position) with one knee bent.",
      descTelugu: "స్పృహలేని వ్యక్తి వెల్లకిలా పడుకుంటే నాలుక వెనక్కి జారి శ్వాస ఆడక చనిపోవచ్చు. బాధితుడిని ఒక పక్కకు ఒత్తిగిలించి (Recovery Position) పడుకోబెట్టాలి.",
      dos: ["Tilt head slightly backwards with chin lift", "Clear mouth of visible mud, broken teeth, or vomit"],
      dosTelugu: ["దవడను కాస్త పైకి ఎత్తి శ్వాస మార్గాన్ని తెరవాలి", "నోట్లోని మట్టి లేదా రక్తాన్ని శుభ్రం చేయాలి"],
      donts: ["Do not pour water into the mouth of an unconscious person", "Do not crowd around the victim; allow fresh air"],
      dontsTelugu: ["స్పృహలేని వ్యక్తి నోట్లో నీళ్లు పోయకూడదు (ఊపిరితిత్తుల్లోకి వెళ్లే ప్రమాదం)", "చుట్టూ గుమిగూడి గాలి ఆడకుండా చేయకూడదు"]
    },
    {
      id: 5,
      title: "5. Hands-Only CPR for Non-Responsive Victims",
      titleTelugu: "5. గుండె ఆగిపోయినప్పుడు సీపీఆర్ (CPR) విధానం",
      desc: "If the victim does not breathe and has no pulse, begin immediate chest compressions at 100 to 120 beats per minute right in the center of the chest.",
      descTelugu: "బాధితుడి గుండె కొట్టుకోకపోయినా, శ్వాస లేకపోయినా వెంటనే ఛాతీ మధ్యలో రెండు చేతులు ఉంచి నిమిషానికి 100-120 సార్లు వేగంగా నొక్కాలి.",
      dos: ["Interlock fingers, keep elbows locked straight", "Compress chest 2 to 2.4 inches deep, allow full chest recoil"],
      dosTelugu: ["రెండు చేతులను కలిపి మోచేతులు వంచకుండా నొక్కాలి", "కనీసం 2 అంగుళాల లోతుకు ఛాతీని నొక్కాలి"],
      donts: ["Do not stop compressions until ambulance paramedics take over", "Do not hesitate—hands-only CPR saves lives"],
      dontsTelugu: ["అంబులెన్స్ వచ్చే వరకు ఛాతీ నొక్కడం ఆపకూడదు", "ఎలాంటి సంకోచం లేకుండా వెంటనే సీపీఆర్ ప్రారంభించాలి"]
    }
  ];

  const currentStepData = steps.find(s => s.id === activeStep) || steps[0];

  const getStepAudio = () => {
    if (isTelugu) {
      return `${currentStepData.titleTelugu}. ${currentStepData.descTelugu}. చేయవలసినవి: ${currentStepData.dosTelugu.join(', ')}. చేయకూడనివి: ${currentStepData.dontsTelugu.join(', ')}.`;
    }
    return `${currentStepData.title}. ${currentStepData.desc}. What to do: ${currentStepData.dos.join(', ')}. What not to do: ${currentStepData.donts.join(', ')}.`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            <span>Emergency Medical Response</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.firstAid.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {t.firstAid.subtitle}
          </p>
        </div>

        <AudioSpeakerButton
          textToSpeak={isTelugu
            ? "గోల్డెన్ అవర్ ప్రథమ చికిత్స: ప్రమాదం జరిగిన మొదటి అరవై నిమిషాలు అత్యంత కీలకం. మెడను కదల్చకూడదు, తీవ్ర రక్తస్రావం ఉంటే శుభ్రమైన బట్టతో అదిమి పట్టుకోవాలి, స్పృహలేని వ్యక్తి నోట్లో నీళ్లు పోయకూడదు, శ్వాస లేకుంటే వెంటనే సీపీఆర్ ఛాతీ కంప్రెషన్స్ ప్రారంభించాలి."
            : "Golden hour emergency first aid protocol: Protect cervical spine, control severe bleeding with direct pressure, never pour water into an unconscious person's mouth, and administer hands-only CPR if not breathing."}
          label={t.firstAid.listenGuide}
          variant="primary"
        />
      </div>

      {/* Golden Hour Science Card */}
      <div className="bg-linear-to-r from-rose-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
          <Activity className="w-3.5 h-3.5 text-rose-400" />
          <span>The Golden Hour Rule (ప్రథమ 60 నిమిషాలు)</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Why the First 60 Minutes Determine Survival
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {t.firstAid.goldenHourDef} In remote highway collisions, death often results from blocked airways or hemorrhagic shock before an ambulance arrives. The steps below provide immediate life support.
        </p>
      </div>

      {/* 5 Action Steps Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {steps.map((st) => (
          <button
            key={st.id}
            onClick={() => setActiveStep(st.id)}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
              activeStep === st.id
                ? 'bg-rose-700 text-white border-rose-700 shadow-md ring-2 ring-rose-500/30'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
              activeStep === st.id ? 'bg-white text-rose-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {st.id}
            </span>
            <span className="text-xs font-bold line-clamp-2 leading-tight">
              {isTelugu ? st.titleTelugu : st.title}
            </span>
          </button>
        ))}
      </div>

      {/* Step Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
              Step {currentStepData.id} of 5
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isTelugu ? currentStepData.titleTelugu : currentStepData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl">
              {isTelugu ? currentStepData.descTelugu : currentStepData.desc}
            </p>
          </div>

          <AudioSpeakerButton
            textToSpeak={getStepAudio()}
            label="Listen Step"
            size="md"
          />
        </div>

        {/* Dos and Don'ts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* DOs */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isTelugu ? 'తప్పక చేయవలసినవి (DOs)' : 'Recommended Actions (DO)'}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              {(isTelugu ? currentStepData.dosTelugu : currentStepData.dos).map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DONTs */}
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>{isTelugu ? 'చేయకూడనివి (DON’Ts)' : 'Fatal Errors to Avoid (DON’T)'}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              {(isTelugu ? currentStepData.dontsTelugu : currentStepData.donts).map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0"></span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
