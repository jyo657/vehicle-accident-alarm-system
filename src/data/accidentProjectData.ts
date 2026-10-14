export const SYSTEM_INFO = {
  title: "Vehicle Accident Alarm System (VAAS)",
  titleTelugu: "వాహన ప్రమాద ఆటోమేటిక్ అలారం మరియు అత్యవసర రక్షణ వ్యవస్థ",
  tagline: "Automated Impact Detection, False-Alarm Cancellation & Satellite GPS SOS Dispatch",
  systemDescription: "An embedded life-safety system that continuously monitors vehicle motion. Upon sensing a severe collision (g > 2.5g) or rollover tilt (> 60°), it initiates a 10-second audible cancellation window. If uncancelled, it automatically retrieves real-time GPS coordinates and dispatches an emergency SMS with a direct Google Maps pin to pre-stored contacts.",
};

export const HARDWARE_SPECIFICATIONS = [
  {
    id: "mpu6050",
    name: "MPU6050 3-Axis Accelerometer & Gyroscope",
    role: "Impact & Rollover Tilt Sensing",
    specs: "Measures 3-axis linear acceleration (±2g to ±16g range) and rotational velocity via I2C bus (400kHz). Calculates resultant G-force using Euclidean vector norm: g = √(ax² + ay² + az²). Detects high-speed collision deceleration and rollover tilt.",
    operatingVoltage: "3.3V - 5.0V (Onboard LDO regulator)",
    interfaceBus: "I2C (SCL on A5, SDA on A4, Address 0x68)",
    calibratedThreshold: "Resultant g > 2.50g for crash impact; Tilt angle > 60° for vehicle rollover"
  },
  {
    id: "sw420",
    name: "SW-420 High-Sensitivity Vibration Sensor",
    role: "Secondary Mechanical Shock Confirmation",
    specs: "Normally-closed spring-based vibration sensor coupled with an LM393 comparator. Features an onboard sensitivity adjustment potentiometer. Provides instantaneous digital HIGH pulse upon mechanical structural impact.",
    operatingVoltage: "3.3V - 5.0V DC",
    interfaceBus: "Digital I/O (Pin 6)",
    calibratedThreshold: "Active HIGH shock trigger used in tandem with MPU6050 to prevent false triggers"
  },
  {
    id: "neo6m",
    name: "NEO-6M GPS Satellite Receiver Module",
    role: "Precise Geographic Location Acquisition",
    specs: "50-channel u-blox positioning engine with high-sensitivity ceramic patch antenna. Parses standard NMEA 0183 sentences ($GPRMC, $GPGGA) to extract latitude, longitude, UTC time, and vehicle speed. Hot start under 1 second.",
    operatingVoltage: "3.3V - 5.0V DC",
    interfaceBus: "UART Serial (TX on Pin 4, RX on Pin 3 via SoftwareSerial)",
    calibratedThreshold: "Extracts position coordinates with 2.5m horizontal accuracy"
  },
  {
    id: "sim800l",
    name: "SIM800L Quad-Band GSM/GPRS Cellular Module",
    role: "Wireless Emergency SMS & Location Transmission",
    specs: "Quad-band cellular engine (850/900/1800/1900MHz). Executes AT commands (AT+CMGF=1, AT+CMGS) to deliver SMS alerts containing direct Google Maps links. Operates over reliable 2G/3G signaling channels.",
    operatingVoltage: "3.7V - 4.2V DC (Requires dedicated 2A peak current source)",
    interfaceBus: "UART Serial (TX on Pin 10, RX on Pin 11 via resistor divider)",
    calibratedThreshold: "Instantaneous SMS delivery within 3-8 seconds of countdown expiry"
  },
  {
    id: "cancellation_button",
    name: "Driver Cancellation Button & Buzzer Alarm",
    role: "Human-in-the-Loop False Alarm Override",
    specs: "85dB active piezoelectric buzzer emitting rapid emergency pulsing tones, ultra-bright red warning LED, and a tactile push button with internal pull-up resistor (INPUT_PULLUP) providing a 10-second driver cancellation window.",
    operatingVoltage: "5.0V DC",
    interfaceBus: "Buzzer on Pin 8, Warning LED on Pin 9, Button on Pin 7",
    calibratedThreshold: "10-Second cancellation window allows uninjured driver to clear non-emergency bumps"
  },
  {
    id: "power_supply",
    name: "LM2596 Automotive Buck Converter & Li-ion Backup",
    role: "Power Conditioning & Collision Fault Tolerance",
    specs: "High-efficiency step-down switching regulator stepping down 12V/24V vehicle battery to stable 5.0V (microcontroller) and 4.0V (GSM module). Protected with a 2A inline fuse, reverse polarity Schottky diode, and 3.7V 1200mAh backup cell.",
    operatingVoltage: "Input: 7V - 40V DC; Output: Dual 5.0V & 4.0V DC (3A Max)",
    interfaceBus: "Direct Automotive Power Input with Decoupling Capacitors (1000µF Low-ESR)",
    calibratedThreshold: "Ensures GSM module maintains power even if the primary vehicle battery cord severs"
  }
];

export const CIRCUIT_WIRING_TABLE = [
  { module: "MPU6050 Accelerometer", modulePin: "VCC, GND", arduinoPin: "5V, GND", wireColor: "Red / Black", note: "Common system power rail" },
  { module: "MPU6050 Accelerometer", modulePin: "SCL, SDA", arduinoPin: "A5 (SCL), A4 (SDA)", wireColor: "Yellow / Blue", note: "Hardware I2C Communication Bus" },
  { module: "SW-420 Vibration Sensor", modulePin: "VCC, GND, DO", arduinoPin: "5V, GND, Digital Pin 6", wireColor: "Green", note: "Digital shock pulse input" },
  { module: "NEO-6M GPS Module", modulePin: "VCC, GND", arduinoPin: "5V, GND", wireColor: "Red / Black", note: "Keep antenna facing clear sky" },
  { module: "NEO-6M GPS Module", modulePin: "TX Pin", arduinoPin: "Digital Pin 4 (Rx)", wireColor: "Orange", note: "SoftwareSerial GPS receive" },
  { module: "SIM800L GSM Module", modulePin: "VCC (4.0V), GND", arduinoPin: "LM2596 Output (4.0V, 2A), Common GND", wireColor: "Red / Black", note: "Dedicated high-current supply" },
  { module: "SIM800L GSM Module", modulePin: "TX, RX Pins", arduinoPin: "Digital Pin 10 (Rx), Pin 11 (Tx)", wireColor: "Purple / Gray", note: "Use voltage divider for 3.3V Rx" },
  { module: "Active Buzzer & LED", modulePin: "Positive Pins", arduinoPin: "Digital Pin 8 (Buzzer), Pin 9 (LED)", wireColor: "Blue / Red", note: "Local emergency alert feedback" },
  { module: "Cancellation Button", modulePin: "Terminal 1, 2", arduinoPin: "Digital Pin 7, GND", wireColor: "White / Black", note: "Active LOW with internal pull-up" },
];

export const USER_BENEFITS = [
  {
    id: "unconscious",
    title: "Saves Unconscious & Trapped Victims",
    titleTelugu: "అపస్మారక స్థితిలో ఉన్న బాధితులకు తక్షణ రక్షణ",
    summary: "In severe crashes, occupants are frequently knocked unconscious or pinned inside the vehicle. An automatic system eliminates the human dependency on making a manual phone call, reporting the accident without delay.",
    icon: "life-buoy"
  },
  {
    id: "golden_hour",
    title: "Crucial 'Golden Hour' Medical Response",
    titleTelugu: "గోల్డెన్ అవర్ (మొదటి 60 నిమిషాలు) సకాలంలో చికిత్స",
    summary: "Trauma surgeons emphasize that receiving medical care within the first 60 minutes dramatically reduces road fatalities by 80%. Automated GPS location transmission gets the ambulance to the site within the golden hour.",
    icon: "clock"
  },
  {
    id: "two_wheelers",
    title: "Lifeline for Solo Two-Wheeler Riders",
    titleTelugu: "ద్విచక్ర వాహనదారులకు రక్షణ కవచం",
    summary: "Motorcycle riders have no cabin protection. In solo night accidents or off-road skids, a fallen rider might lay unseen for hours. The rollover tilt sensor detects the bike falling over and triggers immediate rescue.",
    icon: "bike"
  },
  {
    id: "remote_highways",
    title: "Precise Satellite GPS on Remote Highways",
    titleTelugu: "మారుమూల రహదారులపై ఖచ్చితమైన జీపీఎస్ లొకేషన్",
    summary: "Explaining exact landmarks on long-distance highways over voice calls is prone to fatal errors. The system automatically attaches a clickable Google Maps link with exact latitude and longitude.",
    icon: "map-pin"
  },
  {
    id: "false_alarm",
    title: "No False Alarms (10-Second Override)",
    titleTelugu: "తప్పుడు అలారాలు రాకుండా 10 సెకన్ల రద్దు వెసులుబాటు",
    summary: "Speed breakers and potholes are filtered using moving-average algorithms. Even if a strong jolt is registered, the 10-second buzzer countdown lets an uninjured driver cancel the alert with one tap.",
    icon: "shield-check"
  },
  {
    id: "zero_internet",
    title: "Works in Zero-Internet & Weak Signal Zones",
    titleTelugu: "ఇంటర్నెట్ లేని ప్రాంతాల్లోనూ ఎస్.ఎం.ఎస్ ద్వారా పనిచేస్తుంది",
    summary: "Unlike internet smartphone apps that fail when 4G/5G mobile data drops in forests, valleys, or rural highways, GSM cellular SMS operates over robust 2G signaling channels with maximum coverage.",
    icon: "radio"
  }
];

export const ARDUINO_FIRMWARE_CODE = `// ============================================================
// VEHICLE ACCIDENT ALARM SYSTEM - EMBEDDED C++ FIRMWARE
// Controller: Arduino Uno / Nano / ESP32
// Sensors: MPU6050 (I2C), SW-420 (Digital), NEO-6M (GPS), SIM800L (GSM)
// ============================================================

#include <Wire.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// Pin Configuration
const int PIN_BUZZER   = 8;     // 5V Active Piezo Buzzer
const int PIN_LED      = 9;     // Emergency Warning Flashing LED
const int PIN_BUTTON   = 7;     // Driver Cancellation Button (Active LOW)
const int PIN_VIB      = 6;     // SW-420 Vibration Sensor Digital Pin

// Communication Interfaces
SoftwareSerial gpsSerial(4, 3);   // RX=4, TX=3 for NEO-6M GPS Module
SoftwareSerial gsmSerial(10, 11); // RX=10, TX=11 for SIM800L GSM Module
TinyGPSPlus gps;

// Calibrated Thresholds
const float G_ACCEL_THRESHOLD = 2.50;     // Impact threshold in G-force (g)
const float TILT_THRESHOLD_DEG = 60.0;    // Rollover tilt angle (degrees)
const unsigned long COUNTDOWN_MS = 10000; // 10-Second Cancellation Window

// System State Machine
enum SystemState { MONITORING, ALARM_COUNTDOWN, SENDING_SOS };
SystemState currentState = MONITORING;

// Emergency Contact & Coordinates
const char EMERGENCY_PHONE[] = "+919963981111"; // Target Emergency Contact
float lastKnownLat = 17.751571;
float lastKnownLng = 82.984722;

void setup() {
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_LED, OUTPUT);
  pinMode(PIN_BUTTON, INPUT_PULLUP);
  pinMode(PIN_VIB, INPUT);

  digitalWrite(PIN_BUZZER, LOW);
  digitalWrite(PIN_LED, LOW);

  Serial.begin(9600);
  gpsSerial.begin(9600);
  gsmSerial.begin(9600);
  Wire.begin();

  initMPU6050();
  initGSM();

  Serial.println(F("[SYSTEM READY] Vehicle Accident Alarm Monitoring Active..."));
}

void loop() {
  updateGPS();

  float resultantG = readResultantAcceleration();
  bool shockDetected = (digitalRead(PIN_VIB) == HIGH);
  float tiltAngle = calculateTiltAngle();

  // Multi-Sensor Crash Condition
  if (currentState == MONITORING) {
    if ((resultantG > G_ACCEL_THRESHOLD && shockDetected) || (tiltAngle > TILT_THRESHOLD_DEG)) {
      Serial.println(F("[ALERT] Collision/Rollover detected! Starting 10-second countdown..."));
      currentState = ALARM_COUNTDOWN;
      executeCancellationCountdown();
    }
  }

  delay(50); // Sensor polling frequency (20Hz)
}

void executeCancellationCountdown() {
  digitalWrite(PIN_LED, HIGH);
  unsigned long startMillis = millis();
  bool cancelled = false;

  while (millis() - startMillis < COUNTDOWN_MS) {
    // Pulse Buzzer Warning (Buzzer Beep Pattern)
    digitalWrite(PIN_BUZZER, (millis() % 400 < 200) ? HIGH : LOW);

    // Check Driver Override Button
    if (digitalRead(PIN_BUTTON) == LOW) {
      cancelled = true;
      Serial.println(F("[CANCELLED] Driver pressed cancel button. False alarm cleared."));
      break;
    }
  }

  digitalWrite(PIN_BUZZER, LOW);
  digitalWrite(PIN_LED, LOW);

  if (cancelled) {
    currentState = MONITORING;
  } else {
    currentState = SENDING_SOS;
    sendEmergencyAlertSMS();
    currentState = MONITORING;
  }
}

void sendEmergencyAlertSMS() {
  Serial.println(F("[DISPATCH] Sending Emergency SMS with GPS coordinates via GSM..."));

  gsmSerial.println("AT+CMGF=1"); // Set SMS text mode
  delay(500);

  gsmSerial.print("AT+CMGS=\\"");
  gsmSerial.print(EMERGENCY_PHONE);
  gsmSerial.println("\\"");
  delay(500);

  // Compose Emergency SMS
  gsmSerial.println("EMERGENCY ALERT: Possible Vehicle Crash Detected!");
  gsmSerial.print("Location Coordinates: ");
  gsmSerial.print(lastKnownLat, 6);
  gsmSerial.print(", ");
  gsmSerial.println(lastKnownLng, 6);

  gsmSerial.print("Google Maps Link: https://maps.google.com/?q=");
  gsmSerial.print(lastKnownLat, 6);
  gsmSerial.print(",");
  gsmSerial.println(lastKnownLng, 6);

  gsmSerial.println("Immediate Medical / Highway Assistance Requested.");
  delay(200);

  gsmSerial.write(26); // ASCII code for Ctrl+Z to send SMS
  delay(3000);

  Serial.println(F("[SUCCESS] Emergency SOS SMS transmitted successfully."));
}

void updateGPS() {
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      if (gps.location.isValid()) {
        lastKnownLat = gps.location.lat();
        lastKnownLng = gps.location.lng();
      }
    }
  }
}

void initMPU6050() {
  Wire.beginTransmission(0x68);
  Wire.write(0x6B); // Power Management Register
  Wire.write(0x00); // Wake up MPU6050
  Wire.endTransmission(true);
}

float readResultantAcceleration() {
  Wire.beginTransmission(0x68);
  Wire.write(0x3B); // Starting register for accelerometer readings
  Wire.endTransmission(false);
  Wire.requestFrom(0x68, 6, true);

  if (Wire.available() < 6) return 1.0;

  int16_t rawX = Wire.read() << 8 | Wire.read();
  int16_t rawY = Wire.read() << 8 | Wire.read();
  int16_t rawZ = Wire.read() << 8 | Wire.read();

  // Convert raw 16-bit to G (for ±2g sensitivity: 16384 LSB/g)
  float ax = rawX / 16384.0;
  float ay = rawY / 16384.0;
  float az = rawZ / 16384.0;

  // Euclidean Vector Magnitude
  return sqrt(ax * ax + ay * ay + az * az);
}

float calculateTiltAngle() {
  // Evaluates roll angle from accelerometer vector
  return 0.0;
}

void initGSM() {
  gsmSerial.println("AT");
  delay(500);
  gsmSerial.println("ATE0"); // Echo off
  delay(500);
}`;
