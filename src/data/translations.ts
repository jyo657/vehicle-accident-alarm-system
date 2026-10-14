import { SupportedLanguage, LanguageOption } from '../types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు (Telugu)', voiceLang: 'te-IN' },
  { code: 'en', name: 'English', nativeName: 'English', voiceLang: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी (Hindi)', voiceLang: 'hi-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ் (Tamil)', voiceLang: 'ta-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ (Kannada)', voiceLang: 'kn-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ (Odia)', voiceLang: 'or-IN' },
];

export interface VehicleTranslations {
  appName: string;
  tagline: string;
  listenToPage: string;
  stopVoice: string;
  voicePlaying: string;
  emergencyBanner: string;
  tabs: {
    monitor: string;
    benefits: string;
    sos: string;
    firstAid: string;
    hardware: string;
    firmware: string;
    driveSync: string;
  };
  monitor: {
    title: string;
    subtitle: string;
    currentState: string;
    acceleration: string;
    tiltAngle: string;
    vibration: string;
    triggerSim: string;
    cancelButton: string;
    countdownNotice: string;
    sosSentNotice: string;
    gpsCoordinates: string;
  };
  sos: {
    title: string;
    subtitle: string;
    primaryContacts: string;
    addContact: string;
    testSms: string;
    emergencyCallTitle: string;
    police: string;
    ambulance: string;
    highwayHelpline: string;
    nationalEmergency: string;
  };
  firstAid: {
    title: string;
    subtitle: string;
    goldenHourDef: string;
    listenGuide: string;
  };
  benefits: {
    title: string;
    subtitle: string;
  };
  hardware: {
    title: string;
    subtitle: string;
  };
  firmware: {
    title: string;
    subtitle: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, VehicleTranslations> = {
  te: {
    appName: "వాహన ప్రమాద హెచ్చరిక వ్యవస్థ (VAAS)",
    tagline: "స్మార్ట్ రోడ్డు భద్రత, ఆటోమేటిక్ యాక్సిడెంట్ గుర్తింపు & అత్యవసర స్పందన వేదిక",
    listenToPage: "తెలుగులో వినండి",
    stopVoice: "ఆపండి",
    voicePlaying: "చదువుతోంది...",
    emergencyBanner: "అత్యవసర హెల్ప్‌లైన్: 112 (జాతీయ ఎమర్జెన్సీ) | 108 (అంబులెన్స్) | 1033 (నేషనల్ హైవే)",
    tabs: {
      monitor: "లైవ్ యాక్సిడెంట్ మానిటర్",
      benefits: "ప్రజలకు ఎలా ఉపయోగపడుతుంది?",
      sos: "అత్యవసర SOS & కాంటాక్ట్స్",
      firstAid: "గోల్డెన్ అవర్ ప్రథమ చికిత్స",
      hardware: "హార్డ్‌వేర్ & సెన్సార్లు",
      firmware: "ఆర్డునో C++ ప్రోగ్రామ్",
      driveSync: "గూగుల్ డ్రైవ్ బ్యాకప్"
    },
    monitor: {
      title: "రియల్-టైమ్ యాక్సిడెంట్ డిటెక్షన్ & సేఫ్టీ మానిటర్",
      subtitle: "MPU6050 యాక్సిలరోమీటర్, SW-420 వైబ్రేషన్ మరియు 10-సెకన్ల ఫాల్స్-అలారం రద్దు వ్యవస్థ",
      currentState: "సిస్టమ్ స్థితి",
      acceleration: "రిజల్టెంట్ యాక్సిలరేషన్ (G-Force)",
      tiltAngle: "వాహన కోణం (Tilt Angle)",
      vibration: "వైబ్రేషన్ షాక్ స్థితి",
      triggerSim: "సిమ్యులేషన్ పరీక్షలు (టెస్ట్ డ్రైవ్)",
      cancelButton: "నేను క్షేమంగా ఉన్నాను - అలారం రద్దు చేయి",
      countdownNotice: "హెచ్చరిక: తీవ్రమైన కుదుపు నమోదైంది! మీరు క్షేమంగా ఉంటే 10 సెకన్లలో రద్దు బటన్ నొక్కండి.",
      sosSentNotice: "అత్యవసర SMS విజయవంతంగా GPS లొకేషన్‌తో కుటుంబ సభ్యులకు పంపబడింది!",
      gpsCoordinates: "లైవ్ GPS కోఆర్డినేట్స్"
    },
    sos: {
      title: "అత్యవసర రెస్పాండర్ & లొకేషన్ డిస్పాచర్",
      subtitle: "ప్రమాదం జరిగిన వెంటనే గూగుల్ మ్యాప్స్ లింక్‌తో తక్షణ సహాయం",
      primaryContacts: "నమోదైన అత్యవసర నెంబర్లు",
      addContact: "కొత్త కాంటాక్ట్ జోడించండి",
      testSms: "టెస్ట్ SMS చూడండి",
      emergencyCallTitle: "ప్రభుత్వ అత్యవసర కాల్ లైన్లు",
      police: "పోలీస్ (100 / 112)",
      ambulance: "అంబులెన్స్ (108)",
      highwayHelpline: "హైవే హెల్ప్‌లైన్ (1033)",
      nationalEmergency: "జాతీయ ఎమర్జెన్సీ (112)"
    },
    firstAid: {
      title: "గోల్డెన్ అవర్: రోడ్డు ప్రమాద బాధితులకు తక్షణ ప్రథమ చికిత్స",
      subtitle: "ప్రమాదం జరిగిన మొదటి 60 నిమిషాల్లో సరైన సహాయం అందించి ప్రాణాలు కాపాడండి",
      goldenHourDef: "తీవ్ర గాయాలైన బాధితుడికి మొదటి గంటలో సరైన వైద్యం అందితే ప్రాణాపాయం 80% తగ్గుతుంది.",
      listenGuide: "ప్రథమ చికిత్స సూచనలు వినండి"
    },
    benefits: {
      title: "ఈ వ్యవస్థ ప్రజలకు ఎలా ఉపయోగపడుతుంది? (User Benefits)",
      subtitle: "మారుమూల రహదారులు, రాత్రి ప్రయాణాలు మరియు ఒంటరి ద్విచక్ర వాహనదారుల ప్రాణ రక్షణ"
    },
    hardware: {
      title: "ఎంబెడెడ్ హార్డ్‌వేర్ ఆర్కిటెక్చర్ & సెన్సార్లు",
      subtitle: "MPU6050, SW-420, NEO-6M GPS మరియు SIM800L కనెక్టివిటీ సూత్రాలు"
    },
    firmware: {
      title: "ఆర్డునో C++ ఎంబెడెడ్ ఫర్మ్‌వేర్ కోడ్",
      subtitle: "సెన్సార్ రీడింగ్స్, బజర్ కౌంట్‌డౌన్ మరియు GSM SMS పంపే ప్రోగ్రామ్"
    }
  },
  en: {
    appName: "Vehicle Accident Alarm System (VAAS)",
    tagline: "Intelligent Road Safety, Automatic Crash Detection & Rapid Emergency Response",
    listenToPage: "Listen in English",
    stopVoice: "Stop Audio",
    voicePlaying: "Speaking aloud...",
    emergencyBanner: "Emergency Hotlines: 112 (National Emergency) | 108 (Ambulance) | 1033 (National Highways)",
    tabs: {
      monitor: "Live Crash Monitor",
      benefits: "How It Helps Users",
      sos: "Emergency Contacts & SOS",
      firstAid: "Golden Hour First Aid",
      hardware: "Hardware & Sensors",
      firmware: "Arduino C++ Firmware",
      driveSync: "Google Drive Cloud Backup"
    },
    monitor: {
      title: "Real-Time Impact & Collision Detection Monitor",
      subtitle: "Accelerometer (MPU6050), Vibration (SW-420), and 10-Second Driver Cancellation Logic",
      currentState: "System State",
      acceleration: "Resultant G-Force (Acceleration)",
      tiltAngle: "Vehicle Tilt Angle",
      vibration: "Shock / Vibration Sensor",
      triggerSim: "Crash Simulation Tests",
      cancelButton: "I AM SAFE - CANCEL ALERT",
      countdownNotice: "WARNING: High impact detected! Press Cancel within 10s if this is a false alarm.",
      sosSentNotice: "CRASH CONFIRMED: Emergency SMS dispatched with exact GPS coordinates!",
      gpsCoordinates: "Live GPS Coordinates"
    },
    sos: {
      title: "Emergency Dispatcher & Location Sharing",
      subtitle: "Instantly sends precise Google Maps navigation links to pre-stored contacts without human witnesses",
      primaryContacts: "Pre-Stored Emergency Contacts",
      addContact: "Add Emergency Contact",
      testSms: "Preview Emergency SMS",
      emergencyCallTitle: "Government Emergency Direct Lines",
      police: "Police (100 / 112)",
      ambulance: "Medical Ambulance (108)",
      highwayHelpline: "National Highway Patrol (1033)",
      nationalEmergency: "All-in-One Emergency (112)"
    },
    firstAid: {
      title: "Golden Hour Road Accident First Aid Protocol",
      subtitle: "Crucial medical procedures within the first 60 minutes that save lives before ambulance arrival",
      goldenHourDef: "The first hour after a collision is the 'Golden Hour'—immediate proper care prevents fatal hemorrhagic shock and airway blockage.",
      listenGuide: "Listen to First Aid Audio"
    },
    benefits: {
      title: "How This System Is Useful For Users & Drivers",
      subtitle: "Real-world life-saving benefits for solo drivers, highway commuters, and families"
    },
    hardware: {
      title: "Embedded Hardware Architecture & Sensors",
      subtitle: "Detailed specifications for MPU6050, SW-420, NEO-6M GPS, and SIM800L modules"
    },
    firmware: {
      title: "Arduino C++ Embedded Source Firmware",
      subtitle: "Production-ready microcontroller code with multi-sensor fusion and cancellation logic"
    }
  },
  hi: {
    appName: "वाहन दुर्घटना अलार्म प्रणाली (VAAS)",
    tagline: "स्मार्ट सड़क सुरक्षा, स्वचालित दुर्घटना पहचान एवं त्वरित आपातकालीन अलर्ट",
    listenToPage: "हिन्दी में सुनें",
    stopVoice: "रोकें",
    voicePlaying: "बोल रहा है...",
    emergencyBanner: "आपातकालीन नंबर: 112 (राष्ट्रीय आपातकाल) | 108 (एम्बुलेंस) | 1033 (राष्ट्रीय राजमार्ग)",
    tabs: {
      monitor: "लाइव क्रैश मॉनिटर",
      benefits: "यह लोगों के लिए कैसे उपयोगी है?",
      sos: "आपातकालीन संपर्क व SOS",
      firstAid: "गोल्डन आवर प्राथमिक उपचार",
      hardware: "हार्डवेयर एवं सेंसर",
      firmware: "आर्डुइनो C++ कोड",
      driveSync: "गूगल ड्राइव बैकअप"
    },
    monitor: {
      title: "रीयल-टाइम प्रभाव एवं दुर्घटना पहचान मॉनिटर",
      subtitle: "एक्सेलेरोमीटर (MPU6050), कंपन सेंसर (SW-420) और 10-सेकंड का अलार्म रद्दीकरण चक्र",
      currentState: "सिस्टम की स्थिति",
      acceleration: "परिणामी त्वरण (G-Force)",
      tiltAngle: "वाहन झुकाव कोण (Tilt Angle)",
      vibration: "कंपन / झटका सेंसर",
      triggerSim: "दुर्घटना सिमुलेशन परीक्षण",
      cancelButton: "मैं सुरक्षित हूँ - अलार्म रद्द करें",
      countdownNotice: "चेतावनी: तीव्र झटका दर्ज हुआ! यदि आप सुरक्षित हैं तो 10 सेकंड में रद्द करें।",
      sosSentNotice: "आपातकालीन संदेश (SMS) जीपीएस लोकेशन के साथ संपर्कों को भेज दिया गया है!",
      gpsCoordinates: "लाइव जीपीएस निर्देशांक"
    },
    sos: {
      title: "आपातकालीन प्रेषक एवं स्थान साझाकरण",
      subtitle: "दुर्घटना की स्थिति में गूगल मैप्स पिन के साथ तत्काल स्थान सहायता",
      primaryContacts: "सहेजे गए आपातकालीन संपर्क",
      addContact: "नया संपर्क जोड़ें",
      testSms: "अलर्ट एसएमएस देखें",
      emergencyCallTitle: "सरकारी आपातकालीन नंबर",
      police: "पुलिस (100 / 112)",
      ambulance: "एम्बुलेंस (108)",
      highwayHelpline: "राजमार्ग हेल्पलाइन (1033)",
      nationalEmergency: "राष्ट्रीय आपातकालीन (112)"
    },
    firstAid: {
      title: "गोल्डन आवर: सड़क दुर्घटना प्राथमिक चिकित्सा",
      subtitle: "गंभीर चोट के बाद पहले 60 मिनट में सही मदद देकर जान बचाएं",
      goldenHourDef: "दुर्घटना के तुरंत बाद का पहला घंटा 'गोल्डन आवर' होता है, जिसमें सही देखभाल से जान बचती है।",
      listenGuide: "प्राथमिक उपचार ऑडियो सुनें"
    },
    benefits: {
      title: "यह प्रणाली उपयोगकर्ताओं के लिए कैसे उपयोगी है?",
      subtitle: "अकेले वाहन चालकों और राजमार्ग यात्रियों की सुरक्षा हेतु महत्वपूर्ण लाभ"
    },
    hardware: {
      title: "एंबेडेड हार्डवेयर आर्किटेक्चर एवं सेंसर",
      subtitle: "MPU6050, SW-420, NEO-6M जीपीएस और SIM800L जीएसएम की विशेषताएं"
    },
    firmware: {
      title: "आर्डुइनो C++ एम्बेडेड फर्मवेयर कोड",
      subtitle: "सेंसर रीडिंग, बजर चेतावनी और एसएमएस प्रेषण का संपूर्ण कोड"
    }
  },
  ta: {
    appName: "வாகன விபத்து எச்சரிக்கை தளம் (VAAS)",
    tagline: "தானியங்கி விபத்து கண்டறிதல், ஜிபிஎஸ் இருப்பிடம் & உடனடி அவசர உதவி",
    listenToPage: "தமிழில் கேட்கவும்",
    stopVoice: "நிறுத்து",
    voicePlaying: "ஒலிக்கிறது...",
    emergencyBanner: "அவசர எண்கள்: 112 (தேசிய அவசரம்) | 108 (ஆம்புலன்ஸ்) | 1033 (தேசிய நெடுஞ்சாலை)",
    tabs: {
      monitor: "விபத்து கண்காணிப்பான்",
      benefits: "மக்களுக்கு எவ்வாறு பயனுள்ளது?",
      sos: "அவசர தொடர்புகள்",
      firstAid: "முதலுதவி வழிகாட்டி",
      hardware: "ஹார்டுவேர் & சென்சார்கள்",
      firmware: "ஆர்டுயினோ C++ நிரல்",
      driveSync: "கூகுள் டிரைவ் பேக்கப்"
    },
    monitor: {
      title: "நிகழ்நேர விபத்து கண்டறிதல் அமைப்பு",
      subtitle: "முடுக்கமானி (MPU6050), அதிர்வு சென்சார் & 10-வினாடி ரத்து பொத்தான்",
      currentState: "நிலை",
      acceleration: "விசை (G-Force)",
      tiltAngle: "சாய்கோணம் (Tilt)",
      vibration: "அதிர்வு சென்சார்",
      triggerSim: "மாதிரி விபத்து சோதனை",
      cancelButton: "நான் நலமாக உள்ளேன் - ரத்து செய்",
      countdownNotice: "எச்சரிக்கை: கடும் விபத்து அதிர்வு பதிவானது! 10 வினாடிகளில் ரத்து செய்யவும்.",
      sosSentNotice: "அவசர SMS ஜிபிஎஸ் இருப்பிடத்துடன் அனுப்பப்பட்டது!",
      gpsCoordinates: "நேரடி ஜிபிஎஸ் இருப்பிடம்"
    },
    sos: {
      title: "அவசர உதவி & இருப்பிட பகிர்வு",
      subtitle: "கூகுள் மேப் இணைப்புடன் உடனடியாக உறவினர்களுக்கு தகவல்",
      primaryContacts: "அவசர தொடர்புகள்",
      addContact: "தொடர்பு சேர்க்க",
      testSms: "SMS மாதிரி",
      emergencyCallTitle: "அரசு அவசர உதவி எண்கள்",
      police: "காவல்துறை (100 / 112)",
      ambulance: "ஆம்புலன்ஸ் (108)",
      highwayHelpline: "நெடுஞ்சாலை உதவி (1033)",
      nationalEmergency: "அவசர எண் (112)"
    },
    firstAid: {
      title: "விபத்து முதலுதவி நெறிமுறைகள்",
      subtitle: "முதல் 60 நிமிடங்களில் உயிர் காக்கும் மருத்துவ உதவிகள்",
      goldenHourDef: "விபத்து நிகழ்ந்த முதல் ஒரு மணி நேரம் மிக முக்கியமானது.",
      listenGuide: "முதலுதவி ஆடியோ கேட்க"
    },
    benefits: {
      title: "பயனர்களுக்கு எவ்வாறு பயனுள்ளது?",
      subtitle: "நெடுஞ்சாலைப் பயணம் மற்றும் இருசக்கர வாகன ஓட்டிகளுக்கு பாதுகாப்பு"
    },
    hardware: {
      title: "ஹார்டுவேர் கட்டமைப்பு & சென்சார்கள்",
      subtitle: "சென்சார் விவரங்கள் மற்றும் இணைப்பு வழிகாட்டி"
    },
    firmware: {
      title: "ஆர்டுயினோ C++ நிரல்",
      subtitle: "முழுமையான ஃபார்ம்வேர் நிரல்"
    }
  },
  kn: {
    appName: "ವಾಹನ ಅಪಘಾತ ಎಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ (VAAS)",
    tagline: "ಸ್ಮಾರ್ಟ್ ರಸ್ತೆ ಸುರಕ್ಷತೆ, ಸ್ವಯಂಚಾಲಿತ ಅಪಘಾತ ಪತ್ತೆ & ತ್ವರಿತ ತುರ್ತು ಸ್ಪಂದನೆ",
    listenToPage: "ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ",
    stopVoice: "ನಿಲ್ಲಿಸಿ",
    voicePlaying: "ಧ್ವನಿ ಚಾಲನೆಯಲ್ಲಿದೆ...",
    emergencyBanner: "ತುರ್ತು ಸಹಾಯವಾಣಿ: 112 (ರಾಷ್ಟ್ರೀಯ ತುರ್ತು) | 108 (ಆಂಬ್ಯುಲೆನ್ಸ್) | 1033 (ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ)",
    tabs: {
      monitor: "ಲೈವ್ ಅಪಘಾತ ಮಾನಿಟರ್",
      benefits: "ಜನರಿಗೆ ಹೇಗೆ ಉಪಯುಕ್ತವಾಗಿದೆ?",
      sos: "ತುರ್ತು ಸಂಪರ್ಕಗಳು & SOS",
      firstAid: "ಗೋಲ್ಡನ್ ಅವರ್ ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ",
      hardware: "ಹಾರ್ಡ್‌ವೇರ್ & ಸಂವೇದಕಗಳು",
      firmware: "ಆರ್ಡುಯಿನೋ C++ ಕೋಡ್",
      driveSync: "ಗೂಗಲ್ ಡ್ರೈವ್ ಬ್ಯಾಕಪ್"
    },
    monitor: {
      title: "ನೈಜ-ಸಮಯದ ಅಪಘಾತ ಪತ್ತೆ ಮಾನಿಟರ್",
      subtitle: "ಅಕ್ಸೆಲೆರೊಮೀಟರ್ (MPU6050), ಕಂಪನ ಸಂವೇದಕ & 10-ಸೆಕೆಂಡು ರದ್ದತಿ ವ್ಯವಸ್ಥೆ",
      currentState: "ವ್ಯವಸ್ಥೆಯ ಸ್ಥಿತಿ",
      acceleration: "ವೇಗೋತ್ಕರ್ಷ (G-Force)",
      tiltAngle: "ವಾಹನ ಕೋನ (Tilt)",
      vibration: "ಕಂಪನ ಸ್ಥಿತಿ",
      triggerSim: "ಸಿಮ್ಯುಲೇಶನ್ ಪರೀಕ್ಷೆ",
      cancelButton: "ನಾನು ಸುರಕ್ಷಿತವಾಗಿದ್ದೇನೆ - ರದ್ದುಮಾಡಿ",
      countdownNotice: "ಎಚ್ಚರಿಕೆ: ತೀವ್ರ ಕಂಪನ ಪತ್ತೆಯಾಗಿದೆ! 10 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ರದ್ದುಮಾಡಿ.",
      sosSentNotice: "ತುರ್ತು SMS GPS ಸ್ಥಳದೊಂದಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ!",
      gpsCoordinates: "ಲೈವ್ GPS ನಿರ್ದೇಶಾಂಕಗಳು"
    },
    sos: {
      title: "ತುರ್ತು ರವಾನೆ & ಸ್ಥಳ ಹಂಚಿಕೆ",
      subtitle: "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಲಿಂಕ್‌ನೊಂದಿಗೆ ತಕ್ಷಣ ಕುಟುಂಬಕ್ಕೆ ಸಂದೇಶ",
      primaryContacts: "ತುರ್ತು ಸಂಪರ್ಕಗಳು",
      addContact: "ಸಂಪರ್ಕ ಸೇರಿಸಿ",
      testSms: "SMS ಪೂರ್ವವೀಕ್ಷಣೆ",
      emergencyCallTitle: "ಸರ್ಕಾರಿ ತುರ್ತು ಸಂಖ್ಯೆಗಳು",
      police: "ಪೊಲೀಸ್ (100 / 112)",
      ambulance: "ಆಂಬ್ಯುಲೆನ್ಸ್ (108)",
      highwayHelpline: "ಹೆದ್ದಾರಿ ಸಹಾಯವಾಣಿ (1033)",
      nationalEmergency: "ತುರ್ತು ಸಂಖ್ಯೆ (112)"
    },
    firstAid: {
      title: "ಗೋಲ್ಡನ್ ಅವರ್ ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶಿ",
      subtitle: "ಮೊದಲ 60 ನಿಮಿಷಗಳಲ್ಲಿ ಜೀವ ಉಳಿಸುವ ಕ್ರಮಗಳು",
      goldenHourDef: "ಅಪಘಾತದ ನಂತರದ ಮೊದಲ ಗಂಟೆಯು ಗೋಲ್ಡನ್ ಅವರ್ ಆಗಿರುತ್ತದೆ.",
      listenGuide: "ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಆಡಿಯೋ ಕೇಳಿ"
    },
    benefits: {
      title: "ಈ ವ್ಯವಸ್ಥೆ ಹೇಗೆ ಉಪಯುಕ್ತವಾಗಿದೆ?",
      subtitle: "ಚಾಲಕರು ಮತ್ತು ಪ್ರಯಾಣಿಕರ ರಕ್ಷಣೆಗಾಗಿ ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು"
    },
    hardware: {
      title: "ಹಾರ್ಡ್‌ವೇರ್ ವಿವರಣೆ & ಸಂವೇದಕಗಳು",
      subtitle: "MPU6050, SW-420, NEO-6M ಮತ್ತು SIM800L ಮಾಹಿತಿ"
    },
    firmware: {
      title: "ಆರ್ಡುಯಿನೋ C++ ಕೋಡ್",
      subtitle: "ಎಂಬೆಡೆಡ್ ಪ್ರೋಗ್ರಾಂ ಕೋಡ್"
    }
  },
  or: {
    appName: "ଯାନ ଦୁର୍ଘଟଣା ସତର୍କତା ପ୍ରଣାଳୀ (VAAS)",
    tagline: "ସ୍ମାର୍ଟ ସଡ଼କ ସୁରକ୍ଷା, ସ୍ୱୟଂଚାଳିତ ଦୁର୍ଘଟଣା ଚିହ୍ନଟ ଓ ତ୍ୱରିତ ଜରୁରୀକାଳୀନ ସେବା",
    listenToPage: "ଓଡ଼ିଆରେ ଶୁଣନ୍ତୁ",
    stopVoice: "ବନ୍ଦ କରନ୍ତୁ",
    voicePlaying: "ପଢୁଅଛି...",
    emergencyBanner: "ଜରୁରୀକାଳୀନ ନମ୍ବର: 112 (ଜାତୀୟ ଜରୁରୀ) | 108 (ଆମ୍ବୁଲାନ୍ସ) | 1033 (ଜାତୀୟ ରାଜପଥ)",
    tabs: {
      monitor: "ଲାଇଭ୍ ଦୁର୍ଘଟଣା ମନିଟର୍",
      benefits: "ଲୋକଙ୍କ ପାଇଁ କିପରି ଉପଯୋଗୀ?",
      sos: "ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ",
      firstAid: "ପ୍ରାଥମିକ ଚିକିତ୍ସା",
      hardware: "ହାର୍ଡୱେର୍ ଓ ସେନସର",
      firmware: "ଆର୍ଡୁଇନୋ C++ କୋଡ୍",
      driveSync: "ଗୁଗୁଲ୍ ଡ୍ରାଇଭ୍ ବ୍ୟାକଅପ୍"
    },
    monitor: {
      title: "ନିଜ-ସମୟ ଦୁର୍ଘଟଣା ଚିହ୍ନଟ ମନିଟର୍",
      subtitle: "ଏକ୍ସିଲେରୋମିଟର (MPU6050), କମ୍ପନ ସେନସର ଓ ୧୦-ସେକେଣ୍ଡ ବାତିଲ ବଟନ୍",
      currentState: "ସିଷ୍ଟମ୍ ସ୍ଥିତି",
      acceleration: "ତ୍ୱରଣ (G-Force)",
      tiltAngle: "ଗାଡ଼ିର କୋଣ (Tilt)",
      vibration: "କମ୍ପନ ସ୍ଥିତି",
      triggerSim: "ଦୁର୍ଘଟଣା ପରୀକ୍ଷଣ",
      cancelButton: "ମୁଁ ସୁରକ୍ଷିତ ଅଛି - ବାତିଲ କରନ୍ତୁ",
      countdownNotice: "ଚେତାବନୀ: ଅସ୍ୱାଭାବିକ ଝଟକା ଚିହ୍ନଟ! ୧୦ ସେକେଣ୍ଡରେ ବାତିଲ କରନ୍ତୁ।",
      sosSentNotice: "ଜରୁରୀକାଳୀନ SMS ଜିପିଏସ୍ ଲୋକେସନ୍ ସହ ପଠାଯାଇଛି!",
      gpsCoordinates: "ଲାଇଭ୍ ଜିପିଏସ୍ ଲୋକେସନ୍"
    },
    sos: {
      title: "ଜରୁରୀକାଳୀନ ସହାୟତା ଓ ଲୋକେସନ୍",
      subtitle: "ଗୁଗୁଲ୍ ମ୍ୟାପ୍ସ ଲିଙ୍କ୍ ସହ ସଙ୍ଗେ ସଙ୍ଗେ ସୂଚନା ପ୍ରେରଣ",
      primaryContacts: "ସାଇତା ଯାଇଥିବା ନମ୍ବର",
      addContact: "ନମ୍ବର ଯୋଡ଼ନ୍ତୁ",
      testSms: "ନମୁନା SMS",
      emergencyCallTitle: "ସରକାରୀ ହେଲ୍ପଲାଇନ୍",
      police: "ପୋଲିସ୍ (100 / 112)",
      ambulance: "ଆମ୍ବୁଲାନ୍ସ (108)",
      highwayHelpline: "ରାଜପଥ ହେଲ୍ପଲାଇନ୍ (1033)",
      nationalEmergency: "ଜରୁରୀକାଳୀନ (112)"
    },
    firstAid: {
      title: "ଗୋଲଡେନ୍ ଆୱାର୍ ପ୍ରାଥମିକ ଚିକିତ୍ସା",
      subtitle: "ଦୁର୍ଘଟଣାର ପ୍ରଥମ ୬୦ ମିନିଟରେ ଜୀବନ ରକ୍ଷାକାରୀ ଉପାୟ",
      goldenHourDef: "ଦୁର୍ଘଟଣା ପରେ ପ୍ରଥମ ଏକ ଘଣ୍ଟା ମଧ୍ୟରେ ଉପଯୁକ୍ତ ଚିକିତ୍ସା ଜୀବନ ବଞ୍ଚାଏ।",
      listenGuide: "ପ୍ରାଥମିକ ଚିକିତ୍ସା ଶୁଣନ୍ତୁ"
    },
    benefits: {
      title: "ଏହା କିପରି ଉପଯୋଗୀ?",
      subtitle: "ରାଜପଥ ଯାତ୍ରୀ ଏବଂ ବାଇକ୍ ଚାଳକଙ୍କ ପାଇଁ ବିଶେଷ ସୁରକ୍ଷା"
    },
    hardware: {
      title: "ହାର୍ଡୱେର୍ ଓ ସେନସର ବିବରଣୀ",
      subtitle: "ସେନସର ଫ୍ୟୁଜନ୍ ଏବଂ ସର୍କିଟ୍ ସଂଯୋଗ"
    },
    firmware: {
      title: "ଆର୍ଡୁଇନୋ C++ କୋଡ୍",
      subtitle: "ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରୋଗ୍ରାମ୍ କୋଡ୍"
    }
  }
};

export type TranslationStrings = VehicleTranslations;
