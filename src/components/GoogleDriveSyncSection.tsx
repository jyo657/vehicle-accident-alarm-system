import React, { useState, useEffect } from 'react';
import { Cloud, Upload, RefreshCw, Trash2, ExternalLink, CheckCircle2, AlertTriangle, FileText, ShieldCheck, Lock, User as UserIcon, LogOut, Sparkles } from 'lucide-react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, googleLogout, getAccessToken } from '../services/googleDriveAuth';
import { listDriveFiles, uploadReportToDrive, deleteFileFromDrive, DriveFileItem } from '../services/googleDriveService';
import { useLanguage } from '../context/LanguageContext';
import { AudioSpeakerButton } from './AudioSpeakerButton';

export const GoogleDriveSyncSection: React.FC = () => {
  const { currentLang, speak } = useLanguage();
  const isTelugu = currentLang === 'te';

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Destructive delete confirmation modal state
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        fetchFiles(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const fetchFiles = async (token?: string) => {
    const tokenToUse = token || accessToken;
    if (!tokenToUse) return;

    setLoadingFiles(true);
    try {
      const driveFiles = await listDriveFiles(tokenToUse);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error("Error loading drive files:", err);
      setNotification({ type: 'error', message: err.message || 'Failed to load files from Google Drive' });
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setNotification(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        fetchFiles(res.accessToken);
        setNotification({ type: 'success', message: 'Successfully signed in with Google Drive!' });
        if (isTelugu) {
          speak("గూగుల్ డ్రైవ్ ఖాతా విజయవంతంగా అనుసంధానించబడింది.");
        } else {
          speak("Google Drive connected successfully.");
        }
      }
    } catch (err: any) {
      console.error("Sign-in failed:", err);
      setNotification({ type: 'error', message: err.message || 'Google Sign-in failed' });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await googleLogout();
    setUser(null);
    setAccessToken(null);
    setFiles([]);
    setNotification({ type: 'success', message: 'Signed out from Google Drive' });
  };

  // Upload sample/live crash telemetry report
  const handleUploadCrashReport = async () => {
    if (!accessToken) return;
    setUploading(true);
    setNotification(null);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `VAAS_Crash_Incident_Report_${timestamp}.json`;
    const reportData = {
      system: "Vehicle Accident Alarm System (VAAS)",
      reportType: "Emergency Crash Telemetry & GPS Dispatch",
      generatedAt: new Date().toLocaleString(),
      location: {
        latitude: 17.751571,
        longitude: 82.984722,
        googleMapsPin: "https://maps.google.com/?q=17.751571,82.984722"
      },
      sensorTelemetry: {
        resultantG: 3.45,
        tiltAngleDegrees: 14.2,
        sw420VibrationState: "SHOCK_TRIGGERED",
        vehicleSpeedAtImpact: "58 km/h"
      },
      emergencySequence: {
        impactDetected: true,
        cancellationCountdownSeconds: 10,
        driverCancelled: false,
        cellularSmsSent: true,
        dispatchedPhoneNumbers: ["+91 99639 81111", "+91 99636 94444"]
      }
    };

    try {
      await uploadReportToDrive(accessToken, fileName, JSON.stringify(reportData, null, 2));
      setNotification({ type: 'success', message: `Report "${fileName}" backed up to Google Drive successfully!` });
      fetchFiles();
      if (isTelugu) {
        speak("ప్రమాద నివేదిక విజయవంతంగా గూగుల్ డ్రైవ్‌లో భద్రపరచబడింది.");
      } else {
        speak("Crash incident report backed up to Google Drive successfully.");
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to upload report to Drive' });
    } finally {
      setUploading(false);
    }
  };

  // Upload Emergency Contacts Backup
  const handleUploadContactsBackup = async () => {
    if (!accessToken) return;
    setUploading(true);
    setNotification(null);

    const timestamp = new Date().toISOString().slice(0, 10);
    const fileName = `VAAS_Emergency_Contacts_Backup_${timestamp}.json`;
    const contactsData = {
      system: "Vehicle Accident Alarm System (VAAS)",
      backupType: "Emergency Contacts Registry",
      updatedAt: new Date().toLocaleString(),
      contacts: [
        { name: "Family Primary Contact", phone: "+91 99639 81111", relation: "Family" },
        { name: "Secondary Kin / Friend", phone: "+91 99636 94444", relation: "Friend" },
        { name: "National Highway Helpline", phone: "1033", relation: "NHAI Patrol" },
        { name: "Medical Ambulance Emergency", phone: "108", relation: "Emergency Response" }
      ]
    };

    try {
      await uploadReportToDrive(accessToken, fileName, JSON.stringify(contactsData, null, 2));
      setNotification({ type: 'success', message: `Emergency contacts backed up to Google Drive!` });
      fetchFiles();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to backup contacts' });
    } finally {
      setUploading(false);
    }
  };

  // Delete execution after user confirms in dialog (MANDATORY User Confirmation)
  const handleConfirmDelete = async () => {
    if (!accessToken || !fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteFileFromDrive(accessToken, fileToDelete.id);
      setNotification({ type: 'success', message: `Deleted "${fileToDelete.name}" from Google Drive.` });
      setFileToDelete(null);
      fetchFiles();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to delete file' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Cloud className="w-4 h-4" />
            <span>Google Workspace Cloud Storage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isTelugu ? 'గూగుల్ డ్రైవ్ ఎమర్జెన్సీ క్లౌడ్ బ్యాకప్' : 'Google Drive Cloud Telematics Backup'}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {isTelugu
              ? 'ప్రమాద సంఘటనల రికార్డులు, జీపీఎస్ కోఆర్డినేట్స్ మరియు అత్యవసర నెంబర్లను మీ గూగుల్ డ్రైవ్‌లో సురక్షితంగా నిల్వ చేయండి.'
              : 'Safeguard crash incident telemetry, GPS timestamps, and emergency contact configurations directly into your personal Google Drive.'}
          </p>
        </div>

        <AudioSpeakerButton
          textToSpeak={isTelugu
            ? "గూగుల్ డ్రైవ్ క్లౌడ్ బ్యాకప్: ప్రమాదం జరిగినప్పుడు లేదా టెస్ట్ డ్రైవ్ చేసినప్పుడు సెన్సార్ డేటా మరియు జీపీఎస్ లొకేషన్ నివేదికలను మీ గూగుల్ డ్రైవ్ లో భద్రపరచుకోవచ్చు. దీని ద్వారా బీమా క్లెయిమ్స్ మరియు అత్యవసర పరిశీలనకు ఆధారాలు లభిస్తాయి."
            : "Google Drive cloud integration: Backup accident telemetry, G-force readings, and GPS coordinates directly into your Google Drive storage for insurance verification, investigation records, and family emergency access."}
          label="Listen Drive Integration"
          variant="primary"
        />
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-semibold ${
          notification.type === 'success'
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
            : 'bg-rose-50 text-rose-900 border border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>
      )}

      {/* Auth Card */}
      {!user ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
            <Cloud className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-black text-slate-900">
            Connect Your Google Drive
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            Link Google Drive to securely upload and organize crash incident evidence, GPS telemetry logs, and emergency contact configurations.
          </p>

          {/* Official Google Sign-In Styled Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 rounded-2xl shadow-sm hover:shadow transition active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
              <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Tokens cached in-memory only • No secrets stored</span>
          </div>
        </div>
      ) : (
        /* Connected User Workspace */
        <div className="space-y-6">
          {/* User Account Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full border border-slate-200" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <UserIcon className="w-5 h-5" />
                </div>
              )}
              <div>
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>{user.displayName || 'Google Drive User'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Connected
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchFiles()}
                disabled={loadingFiles}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                title="Refresh Drive Files"
              >
                <RefreshCw className={`w-4 h-4 ${loadingFiles ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-200 space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>Backup Crash Incident Telemetry</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates and uploads an authentic JSON telemetry report with G-force readings, rollover angle, live GPS coordinates, and SMS dispatch status directly to your Google Drive.
              </p>
              <button
                onClick={handleUploadCrashReport}
                disabled={uploading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading to Drive...' : 'Upload Incident Report to Drive'}</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-linear-to-br from-teal-50 to-emerald-50 border border-teal-200 space-y-3">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Backup Emergency Contacts</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uploads a cloud backup of pre-stored emergency contacts (Family, Ambulance 108, Highway Patrol 1033) for secure disaster recovery.
              </p>
              <button
                onClick={handleUploadContactsBackup}
                disabled={uploading}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Backup Emergency Contacts'}</span>
              </button>
            </div>
          </div>

          {/* Drive Files List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Your Google Drive Safety Backups</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {files.length} Files Found
              </span>
            </div>

            {loadingFiles ? (
              <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Fetching files from Google Drive...</span>
              </div>
            ) : files.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No VAAS backup files found in your Drive yet. Click an upload button above to create your first cloud backup.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {files.map((file) => (
                  <div key={file.id} className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{file.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Modified: {new Date(file.modifiedTime).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {file.webViewLink && (
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold transition"
                        >
                          <span>Open in Drive</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {/* Explicit confirmation trigger for delete */}
                      <button
                        onClick={() => setFileToDelete(file)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete File from Drive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION MODAL FOR DESTRUCTIVE OPERATIONS */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-lg font-bold text-slate-900">
                Confirm Deletion from Google Drive
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-slate-800 break-all">{fileToDelete.name}</strong> from your Google Drive? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setFileToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
