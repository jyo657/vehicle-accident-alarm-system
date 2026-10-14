export type SupportedLanguage = 'te' | 'en' | 'hi' | 'ta' | 'kn' | 'or';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  voiceLang: string; // BCP-47 tag for speech synthesis
}

export interface SensorState {
  accelX: number;
  accelY: number;
  accelZ: number;
  resultantG: number; // in g
  tiltAngle: number; // degrees
  vibrationTriggered: boolean;
  systemState: 'MONITORING' | 'ABNORMAL_DETECTED' | 'COUNTDOWN_ACTIVE' | 'SOS_DISPATCHED' | 'ALERT_CANCELLED';
  speedKmH?: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary: boolean;
}

export interface CrashIncidentLog {
  id: string;
  timestamp: string;
  resultantG: number;
  tiltAngle: number;
  latitude: number;
  longitude: number;
  status: 'Dispatched' | 'Cancelled by Driver';
  mapUrl: string;
}

export interface RoadHazardReport {
  id: string;
  hazardType: 'Pothole' | 'Accident Zone' | 'Blind Turn' | 'No Streetlights' | 'Water Logging';
  location: string;
  description: string;
  timestamp: string;
  upvotes: number;
}

export interface TechnicalChapter {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  points: string[];
}

export interface StudentInfo {
  name: string;
  regNo: string;
}

export interface WeeklyLogDay {
  day: string;
  description: string;
  learningOutcome: string;
}

export interface WeeklyReportData {
  weekNumber: number;
  startDate: string;
  endDate: string;
  objective: string;
  detailedReport: string;
  learningOutcome: string;
  dailyLogs: WeeklyLogDay[];
  photoCaption?: string;
  gpsLocation?: string;
}

export interface SurveyQuestion {
  id: number;
  question: string;
  questionTelugu: string;
  options: string[];
  resultsData: { label: string; count: number; percentage: number }[];
}

export interface WaterborneDisease {
  id: string;
  name: string;
  teluguName: string;
  causativeAgent: string;
  symptoms: string[];
  symptomsTelugu: string[];
  prevention: string[];
  preventionTelugu: string[];
  emergencyAdvice: string;
  emergencyAdviceTelugu: string;
  severity: 'mild' | 'moderate' | 'high' | 'critical';
}

export interface WaterPurificationMethod {
  id: string;
  name: string;
  teluguName: string;
  tagline: string;
  steps: string[];
  stepsTelugu: string[];
  costLevel: 'Free / Zero Cost' | 'Low Cost' | 'Moderate' | 'High';
  effectiveness: string;
  bestFor: string;
  caution: string;
}

export interface VillageGrievance {
  id: string;
  name: string;
  phone: string;
  habitation: string;
  issueType: 'dirty_water' | 'pump_broken' | 'pipeline_leak' | 'tank_cleaning' | 'scarcity';
  location: string;
  description: string;
  timestamp: string;
  status: 'Received' | 'Assigned to Panchayat' | 'In Progress' | 'Resolved';
}
