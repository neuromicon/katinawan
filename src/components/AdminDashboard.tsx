import React, { useState, useEffect } from 'react';
import {
  adminGetDashboardData,
  adminUpdateApplicationStatus,
  adminSaveEvent,
  adminUpdateSettings,
  exportApplicationsCSV,
  resetDemoData
} from '../services/api';
import {
  initAuth,
  googleSignIn,
  googleLogout,
  getAccessToken
} from '../services/googleAuth';
import {
  listDriveFiles,
  createDriveFolder,
  exportTrackerToDrive,
  saveFormSpecificationToDrive,
  deleteDriveFile,
  DriveFile
} from '../services/googleDrive';
import { GITHUB_CONFIG } from '../services/github';
import {
  CeremonyEvent,
  Application,
  SystemSettings,
  AuditLogEntry,
  ApplicationStatus,
  EventStatus
} from '../types';
import { User } from 'firebase/auth';
import {
  Shield,
  X,
  Users,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Edit,
  RotateCcw,
  Settings,
  ListFilter,
  Search,
  ExternalLink,
  Lock,
  HardDrive,
  FolderPlus,
  FileSpreadsheet,
  FileText,
  Trash2,
  RefreshCw,
  GitBranch,
  Terminal,
  Check,
  Copy
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'applications' | 'events' | 'drive' | 'github' | 'settings' | 'audit'>('applications');
  const [isLoading, setIsLoading] = useState(false);

  const [events, setEvents] = useState<CeremonyEvent[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [summary, setSummary] = useState<any>(null);

  // Filter & Search
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Event Edit / Create Modal state
  const [editingEvent, setEditingEvent] = useState<Partial<CeremonyEvent> | null>(null);

  // Status Action Modal state
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [actionNotes, setActionNotes] = useState('');

  // Google Drive & Auth State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isGoogleLoggingIn, setIsGoogleLoggingIn] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [driveSearch, setDriveSearch] = useState('');
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [driveSuccessMsg, setDriveSuccessMsg] = useState<string | null>(null);
  const [driveError, setDriveError] = useState<string | null>(null);

  // Git copy state
  const [copiedGit, setCopiedGit] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await adminGetDashboardData();
      setEvents(data.events);
      setApplications(data.applications);
      setSettings(data.settings);
      setAuditLogs(data.auditLogs);
      setSummary(data.summary);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  // Init Google Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoggingIn(true);
      setDriveError(null);
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        await fetchDriveFiles(res.accessToken);
      }
    } catch (e: any) {
      setDriveError(e.message || 'Google sign-in failed');
    } finally {
      setIsGoogleLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await googleLogout();
    setGoogleUser(null);
    setGoogleToken(null);
    setDriveFiles([]);
  };

  const fetchDriveFiles = async (token?: string) => {
    const tok = token || googleToken;
    if (!tok) return;
    try {
      setIsLoadingDrive(true);
      setDriveError(null);
      const files = await listDriveFiles(tok, driveSearch);
      setDriveFiles(files);
    } catch (err: any) {
      setDriveError(err.message || 'Failed to list Google Drive files');
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleExportTrackerToDrive = async () => {
    if (!googleToken) {
      alert('Please connect Google Drive first.');
      return;
    }
    try {
      setIsLoadingDrive(true);
      const csv = exportApplicationsCSV(applications);
      const file = await exportTrackerToDrive(googleToken, csv);
      setDriveSuccessMsg(`Tracker exported to Google Drive: "${file.name}"`);
      setTimeout(() => setDriveSuccessMsg(null), 5000);
      await fetchDriveFiles();
    } catch (err: any) {
      setDriveError(err.message || 'Failed to export tracker to Google Drive');
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleSaveFormSpecToDrive = async () => {
    if (!googleToken) {
      alert('Please connect Google Drive first.');
      return;
    }
    try {
      setIsLoadingDrive(true);
      const file = await saveFormSpecificationToDrive(googleToken);
      setDriveSuccessMsg(`Registration Form Specification created in Drive: "${file.name}"`);
      setTimeout(() => setDriveSuccessMsg(null), 5000);
      await fetchDriveFiles();
    } catch (err: any) {
      setDriveError(err.message || 'Failed to create form specification in Drive');
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleCreateSanctuaryFolder = async () => {
    if (!googleToken) return;
    try {
      setIsLoadingDrive(true);
      const folder = await createDriveFolder(googleToken, 'Katin-awan Ceremonies & Applications');
      setDriveSuccessMsg(`Sanctuary folder created in Drive: "${folder.name}"`);
      setTimeout(() => setDriveSuccessMsg(null), 5000);
      await fetchDriveFiles();
    } catch (err: any) {
      setDriveError(err.message || 'Failed to create folder');
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleDeleteFile = async (file: DriveFile) => {
    if (!googleToken) return;
    try {
      const ok = await deleteDriveFile(googleToken, file.id, file.name);
      if (ok) {
        setDriveSuccessMsg(`Deleted "${file.name}" from Google Drive.`);
        setTimeout(() => setDriveSuccessMsg(null), 4000);
        await fetchDriveFiles();
      }
    } catch (err: any) {
      setDriveError(err.message || 'Failed to delete file');
    }
  };

  if (!isOpen) return null;

  // Simple authentication gate (Demo PIN: 1234 or "katinawan")
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim().toLowerCase() === 'katinawan' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleUpdateStatus = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      await adminUpdateApplicationStatus(appId, newStatus, actionNotes);
      setSelectedApp(null);
      setActionNotes('');
      await loadData();
      if (onDataChanged) onDataChanged();
    } catch (e: any) {
      alert('Error updating status: ' + e.message);
    }
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    try {
      await adminSaveEvent(editingEvent);
      setEditingEvent(null);
      await loadData();
      if (onDataChanged) onDataChanged();
    } catch (err: any) {
      alert('Failed to save event: ' + err.message);
    }
  };

  const handleExportCSV = () => {
    const csvContent = exportApplicationsCSV(applications);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `katinawan-applications-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await adminUpdateSettings(settings);
      alert('Settings updated successfully.');
      await loadData();
    } catch (err: any) {
      alert('Error updating settings: ' + err.message);
    }
  };

  const handleReset = () => {
    if (confirm('Reset demo applications and gatherings to default state?')) {
      resetDemoData();
      loadData();
      if (onDataChanged) onDataChanged();
    }
  };

  const copyGitCommands = () => {
    const cmd = `git remote add origin ${GITHUB_CONFIG.cloneUrl}\ngit branch -M main\ngit add .\ngit commit -m "feat: deploy Katin-awan with Google Drive & Vercel CI/CD"\ngit push -u origin main`;
    navigator.clipboard.writeText(cmd);
    setCopiedGit(true);
    setTimeout(() => setCopiedGit(false), 2500);
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      app.application_id.toLowerCase().includes(query) ||
      app.full_name.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#FAF8F2] text-[#142A21] rounded-2xl shadow-2xl border border-[#B8C7AE]/50 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 border-b border-[#B8C7AE]/30 flex items-center justify-between bg-[#142A21] text-[#F4F0E6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C4A46A] text-[#142A21] flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#F4F0E6] flex items-center gap-2">
                Organizer Console
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#C4A46A] border border-[#C4A46A]/40 px-2 py-0.5 rounded">
                  Drive &amp; GitHub Ready
                </span>
              </h3>
              <span className="text-[11px] text-[#B8C7AE]">
                Sacred Plant Spirit Healing • Visayas, Philippines
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#142A21] text-[#C4A46A] mx-auto flex items-center justify-center shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-2xl text-[#142A21] mb-2">Organizer Authentication</h4>
              <p className="text-xs text-[#142A21]/75 leading-relaxed">
                Enter your administrative PIN or passkey to access ceremony applications, capacity control, Google Drive sync, and deposits.
              </p>
            </div>

            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Organizer Passcode"
                  className="w-full text-center px-4 py-3 rounded-lg border border-[#B8C7AE]/60 text-sm tracking-widest focus:border-[#C4A46A] focus:outline-none"
                  autoFocus
                />
                {pinError && (
                  <span className="text-xs text-red-600 mt-2 block">
                    Invalid passcode. Please enter the authorized organizer passcode.
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Metrics Row */}
            {summary && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-4 bg-[#F4F0E6] border-b border-[#B8C7AE]/30 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#B8C7AE]/30">
                  <span className="text-[10px] uppercase text-[#7a8c6f] block">Gatherings</span>
                  <span className="text-lg font-bold text-[#142A21] font-mono">{summary.totalEvents}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-amber-300 bg-amber-50/50">
                  <span className="text-[10px] uppercase text-amber-700 block">Pending Review</span>
                  <span className="text-lg font-bold text-amber-800 font-mono">{summary.pendingReview}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-300 bg-blue-50/50">
                  <span className="text-[10px] uppercase text-blue-700 block">Awaiting Deposit</span>
                  <span className="text-lg font-bold text-blue-800 font-mono">{summary.awaitingDeposit}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-300 bg-purple-50/50">
                  <span className="text-[10px] uppercase text-purple-700 block">Deposit Reported</span>
                  <span className="text-lg font-bold text-purple-800 font-mono">{summary.depositReported}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-300 bg-emerald-50/50">
                  <span className="text-[10px] uppercase text-emerald-700 block">Verified Deposits</span>
                  <span className="text-lg font-bold text-emerald-800 font-mono">{summary.depositVerified}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-400 bg-emerald-100/50">
                  <span className="text-[10px] uppercase text-emerald-800 block">Confirmed</span>
                  <span className="text-lg font-bold text-emerald-900 font-mono">{summary.confirmed}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-indigo-300 bg-indigo-50/50">
                  <span className="text-[10px] uppercase text-indigo-700 block">Waitlist</span>
                  <span className="text-lg font-bold text-indigo-800 font-mono">{summary.waitlisted}</span>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between px-6 pt-3 border-b border-[#B8C7AE]/30 bg-white overflow-x-auto">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === 'applications'
                      ? 'border-[#C4A46A] text-[#142A21]'
                      : 'border-transparent text-stone-500 hover:text-[#142A21]'
                  }`}
                >
                  Applications ({applications.length})
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === 'events'
                      ? 'border-[#C4A46A] text-[#142A21]'
                      : 'border-transparent text-stone-500 hover:text-[#142A21]'
                  }`}
                >
                  Ceremonies ({events.length})
                </button>
                <button
                  onClick={() => {
                    setActiveTab('drive');
                    if (googleToken) fetchDriveFiles();
                  }}
                  className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTab === 'drive'
                      ? 'border-[#C4A46A] text-[#142A21]'
                      : 'border-transparent text-stone-500 hover:text-[#142A21]'
                  }`}
                >
                  <HardDrive className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Drive</span>
                  {googleUser && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                </button>
                <button
                  onClick={() => setActiveTab('github')}
                  className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTab === 'github'
                      ? 'border-[#C4A46A] text-[#142A21]'
                      : 'border-transparent text-stone-500 hover:text-[#142A21]'
                  }`}
                >
                  <GitBranch className="w-3.5 h-3.5 text-purple-600" />
                  <span>GitHub &amp; CI/CD</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === 'settings'
                      ? 'border-[#C4A46A] text-[#142A21]'
                      : 'border-transparent text-stone-500 hover:text-[#142A21]'
                  }`}
                >
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === 'audit'
                      ? 'border-[#C4A46A] text-[#142A21]'
                      : 'border-transparent text-stone-500 hover:text-[#142A21]'
                  }`}
                >
                  Audit Log
                </button>
              </div>

              <div className="flex items-center gap-2 pb-2">
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded border border-[#B8C7AE]/60 hover:bg-[#FAF8F2] text-xs font-medium flex items-center gap-1.5"
                  title="Export Applications to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-[#7a8c6f]" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded text-stone-400 hover:text-[#142A21] hover:bg-stone-100"
                  title="Reset demo data"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab 1: Applications */}
            {activeTab === 'applications' && (
              <div className="flex-1 flex flex-col p-6 overflow-hidden">
                {/* Search & Filter row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ref, name or email..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#B8C7AE]/50 text-xs focus:outline-none focus:border-[#C4A46A]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
                    <span className="text-[11px] text-[#7a8c6f] whitespace-nowrap">Filter Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-[#B8C7AE]/50 text-xs focus:outline-none"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="PENDING_REVIEW">Pending Review</option>
                      <option value="AWAITING_DEPOSIT">Awaiting Deposit</option>
                      <option value="DEPOSIT_REPORTED">Deposit Reported</option>
                      <option value="DEPOSIT_VERIFIED">Deposit Verified</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="WAITLISTED">Waitlisted</option>
                      <option value="DECLINED">Declined</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-y-auto border border-[#B8C7AE]/30 rounded-xl bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F2] border-b border-[#B8C7AE]/30 text-[#7a8c6f] uppercase font-mono tracking-wider">
                        <th className="py-3 px-4">Ref ID</th>
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Gathering</th>
                        <th className="py-3 px-4">Spots</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Submitted</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#B8C7AE]/20">
                      {filteredApps.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-stone-400">
                            No applications match the selected criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredApps.map((app) => (
                          <tr key={app.application_id} className="hover:bg-[#FAF8F2]/60 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-[#142A21]">
                              {app.application_id}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold block text-[#142A21]">{app.full_name}</span>
                              <span className="text-[11px] text-[#7a8c6f]">{app.email}</span>
                            </td>
                            <td className="py-3 px-4 text-[#142A21]/90">
                              {app.event_title || app.event_id}
                            </td>
                            <td className="py-3 px-4 font-mono">
                              {app.attendee_count}
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-800 border">
                                {app.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[11px] text-[#7a8c6f]">
                              {new Date(app.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="px-3 py-1 rounded bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-[11px] font-semibold transition-colors"
                              >
                                Review &amp; Actions
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Events */}
            {activeTab === 'events' && (
              <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-xl text-[#142A21]">Gathering Management</h4>
                    <span className="text-xs text-[#7a8c6f]">Configure published dates, capacities and deposit settings</span>
                  </div>
                  <button
                    onClick={() => setEditingEvent({
                      title: 'New Velada Gathering',
                      capacity: 10,
                      status: 'AVAILABLE',
                      timezone: 'Asia/Manila (GMT+8)',
                      starts_at: new Date(Date.now() + 86400000 * 14).toISOString(),
                      ends_at: new Date(Date.now() + 86400000 * 16).toISOString(),
                      location_label: 'Sanctuary in Visayas (Disclosed upon confirmation)',
                      location_visibility: 'PRIVATE',
                      deposit_currency: 'PHP'
                    })}
                    className="px-3.5 py-2 rounded-lg bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Ceremony</span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                  {events.map((evt) => (
                    <div
                      key={evt.event_id}
                      className="p-5 rounded-xl bg-white border border-[#B8C7AE]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#7a8c6f]">{evt.event_id}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {evt.status}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-[#142A21] font-semibold">{evt.title}</h4>
                        <p className="text-xs text-[#7a8c6f]">
                          {new Date(evt.starts_at).toLocaleDateString()} to {new Date(evt.ends_at).toLocaleDateString()} • {evt.timezone}
                        </p>
                        <p className="text-xs text-[#142A21]/75">
                          Capacity: <strong>{evt.occupied_count} / {evt.capacity}</strong> filled ({evt.remaining_capacity} remaining)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingEvent(evt)}
                          className="px-3.5 py-1.5 rounded border border-[#B8C7AE]/60 hover:bg-[#FAF8F2] text-xs font-medium flex items-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#7a8c6f]" />
                          <span>Edit Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Google Drive Integration */}
            {activeTab === 'drive' && (
              <div className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6">
                {/* Auth Banner */}
                <div className="bg-white p-6 rounded-2xl border border-[#B8C7AE]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <HardDrive className="w-5 h-5 text-blue-600" />
                      <h4 className="font-serif text-xl text-[#142A21] font-semibold">Google Drive Integration</h4>
                    </div>
                    <p className="text-xs text-[#142A21]/80 max-w-xl">
                      Authenticate with Google to sync applications, export attendance spreadsheets, and archive sanctuary registration forms directly into your Drive.
                    </p>
                  </div>

                  <div>
                    {googleUser ? (
                      <div className="flex items-center gap-3 bg-[#FAF8F2] p-2 rounded-xl border border-[#B8C7AE]/40">
                        {googleUser.photoURL && (
                          <img
                            src={googleUser.photoURL}
                            alt="Google avatar"
                            className="w-8 h-8 rounded-full border"
                          />
                        )}
                        <div className="text-left">
                          <span className="text-xs font-semibold text-[#142A21] block leading-tight">
                            {googleUser.displayName || 'Authorized User'}
                          </span>
                          <span className="text-[10px] text-[#7a8c6f] block">
                            {googleUser.email}
                          </span>
                        </div>
                        <button
                          onClick={handleGoogleLogout}
                          className="ml-2 px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-[10px] text-stone-700 font-semibold"
                        >
                          Disconnect
                        </button>
                      </div>
                    ) : (
                      /* Official Sign in with Google Button */
                      <button
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoggingIn}
                        className="inline-flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 48 48">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        <span>{isGoogleLoggingIn ? 'Connecting...' : 'Sign in with Google'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {driveSuccessMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{driveSuccessMsg}</span>
                  </div>
                )}

                {driveError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs">
                    {driveError}
                  </div>
                )}

                {/* Quick Action Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-white rounded-xl border border-[#B8C7AE]/40 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <h5 className="font-serif text-base text-[#142A21] font-semibold mb-1">
                        Backup Tracker to Drive
                      </h5>
                      <p className="text-xs text-[#7a8c6f] mb-4">
                        Uploads current applications as CSV to your Google Drive.
                      </p>
                    </div>
                    <button
                      onClick={handleExportTrackerToDrive}
                      disabled={!googleToken || isLoadingDrive}
                      className="w-full py-2 rounded-lg bg-[#142A21] hover:bg-[#1b382c] disabled:opacity-40 text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Export to Drive
                    </button>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-[#B8C7AE]/40 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h5 className="font-serif text-base text-[#142A21] font-semibold mb-1">
                        Save Form Spec to Drive
                      </h5>
                      <p className="text-xs text-[#7a8c6f] mb-4">
                        Saves the Google Form 5-section questionnaire specification to Drive.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveFormSpecToDrive}
                      disabled={!googleToken || isLoadingDrive}
                      className="w-full py-2 rounded-lg bg-[#C4A46A] hover:bg-[#b08f53] disabled:opacity-40 text-[#142A21] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Save Spec File
                    </button>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-[#B8C7AE]/40 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                        <FolderPlus className="w-5 h-5" />
                      </div>
                      <h5 className="font-serif text-base text-[#142A21] font-semibold mb-1">
                        Create Sanctuary Folder
                      </h5>
                      <p className="text-xs text-[#7a8c6f] mb-4">
                        Creates dedicated &ldquo;Katin-awan Ceremonies&rdquo; folder in Drive.
                      </p>
                    </div>
                    <button
                      onClick={handleCreateSanctuaryFolder}
                      disabled={!googleToken || isLoadingDrive}
                      className="w-full py-2 rounded-lg border border-[#7a8c6f] hover:bg-[#FAF8F2] disabled:opacity-40 text-[#142A21] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Create Folder
                    </button>
                  </div>
                </div>

                {/* Google Drive File Explorer */}
                {googleToken && (
                  <div className="bg-white rounded-2xl border border-[#B8C7AE]/40 shadow-xs p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-[#B8C7AE]/20">
                      <h5 className="font-serif text-lg text-[#142A21] font-semibold flex items-center gap-2">
                        <span>Drive Files &amp; Sanctuary Documents</span>
                        <span className="text-xs font-sans text-[#7a8c6f]">({driveFiles.length})</span>
                      </h5>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          value={driveSearch}
                          onChange={(e) => setDriveSearch(e.target.value)}
                          placeholder="Search in Drive..."
                          className="px-3 py-1.5 rounded-lg border border-[#B8C7AE]/50 text-xs w-full sm:w-48"
                        />
                        <button
                          onClick={() => fetchDriveFiles()}
                          className="p-1.5 rounded border border-[#B8C7AE]/50 hover:bg-stone-50 text-stone-600"
                          title="Refresh Drive files"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDrive ? 'animate-spin' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="divide-y divide-[#B8C7AE]/20 max-h-72 overflow-y-auto">
                      {isLoadingDrive && driveFiles.length === 0 ? (
                        <div className="py-8 text-center text-xs text-[#7a8c6f]">Loading files from Drive...</div>
                      ) : driveFiles.length === 0 ? (
                        <div className="py-8 text-center text-xs text-stone-400">
                          No files found in Google Drive. Click &ldquo;Backup Tracker&rdquo; or &ldquo;Save Form Spec&rdquo; above to create one.
                        </div>
                      ) : (
                        driveFiles.map((file) => (
                          <div key={file.id} className="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-[#FAF8F2]/60 px-2 rounded">
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText className="w-4 h-4 text-[#7a8c6f] flex-shrink-0" />
                              <span className="font-medium text-[#142A21] truncate">{file.name}</span>
                              <span className="text-[10px] text-stone-400 hidden sm:inline">
                                {new Date(file.modifiedTime).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-700 hover:text-blue-900 text-[11px] flex items-center gap-1 underline"
                                >
                                  <span>Open</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              <button
                                onClick={() => handleDeleteFile(file)}
                                className="p-1 text-stone-400 hover:text-red-600 rounded transition-colors"
                                title="Delete from Drive (with confirmation)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: GitHub & CI/CD Integration */}
            {activeTab === 'github' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#B8C7AE]/40 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#142A21] text-white flex items-center justify-center">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-serif text-xl text-[#142A21] font-semibold">
                          GitHub Repository: {GITHUB_CONFIG.owner}/{GITHUB_CONFIG.repo}
                        </h4>
                        <span className="text-xs text-[#7a8c6f]">
                          Configured for Vercel automated continuous deployment (CI/CD)
                        </span>
                      </div>
                    </div>

                    <a
                      href={GITHUB_CONFIG.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#142A21] hover:bg-[#1b382c] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <span>Open on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* GitHub Links Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <a
                      href={GITHUB_CONFIG.actionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#B8C7AE]/40 hover:border-[#C4A46A] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#7a8c6f]" />
                        <span className="text-xs font-semibold text-[#142A21]">GitHub Actions CI</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#7a8c6f]" />
                    </a>

                    <a
                      href={GITHUB_CONFIG.commitsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#B8C7AE]/40 hover:border-[#C4A46A] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-[#7a8c6f]" />
                        <span className="text-xs font-semibold text-[#142A21]">Branch: main</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#7a8c6f]" />
                    </a>

                    <a
                      href={GITHUB_CONFIG.vercelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#B8C7AE]/40 hover:border-[#C4A46A] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">▲</span>
                        <span className="text-xs font-semibold text-[#142A21]">Vercel Production</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#7a8c6f]" />
                    </a>
                  </div>
                </div>

                {/* Git Push Quick Command Helper */}
                <div className="bg-[#142A21] text-[#F4F0E6] p-6 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#C4A46A] font-semibold">
                      Deploy / Push to GitHub &amp; Vercel
                    </span>
                    <button
                      onClick={copyGitCommands}
                      className="text-xs text-[#B8C7AE] hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded bg-[#1b382c] border border-[#C4A46A]/30"
                    >
                      {copiedGit ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedGit ? 'Copied!' : 'Copy Commands'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-[#0d1c16] font-mono text-xs text-[#B8C7AE] overflow-x-auto leading-relaxed border border-[#C4A46A]/20">
{`git remote add origin ${GITHUB_CONFIG.cloneUrl}
git branch -M main
git add .
git commit -m "feat: deploy Katin-awan with Google Drive & Vercel CI/CD"
git push -u origin main`}
                  </pre>
                  <p className="text-[11px] text-[#B8C7AE]/80">
                    Once pushed, Vercel automatically detects the update on branch <code>main</code> and builds the latest release.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 5: Settings */}
            {activeTab === 'settings' && settings && (
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSaveSettings} className="max-w-2xl bg-white p-6 rounded-xl border border-[#B8C7AE]/40 space-y-6">
                  <div>
                    <h4 className="font-serif text-xl text-[#142A21] mb-1">Backend Configuration</h4>
                    <p className="text-xs text-[#7a8c6f]">
                      Connect to your Google Apps Script Web App for direct sync with Google Sheets &amp; Gmail notifications.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1.5">
                      Google Apps Script Web App URL
                    </label>
                    <input
                      type="url"
                      value={settings.APPS_SCRIPT_URL || ''}
                      onChange={(e) => setSettings({ ...settings, APPS_SCRIPT_URL: e.target.value })}
                      placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#B8C7AE]/50 text-xs font-mono"
                    />
                    <span className="text-[11px] text-[#7a8c6f] mt-1 block">
                      Leave blank to use the autonomous reactive LocalStorage engine. Set to your Apps Script Web App deployment URL for live Google Sheets integration.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1.5">
                        Organizer Contact Email
                      </label>
                      <input
                        type="email"
                        value={settings.CONTACT_EMAIL}
                        onChange={(e) => setSettings({ ...settings, CONTACT_EMAIL: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-[#B8C7AE]/50 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1.5">
                        Default Currency
                      </label>
                      <input
                        type="text"
                        value={settings.DEFAULT_CURRENCY}
                        onChange={(e) => setSettings({ ...settings, DEFAULT_CURRENCY: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-[#B8C7AE]/50 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1.5">
                      Facebook Messenger Link
                    </label>
                    <input
                      type="url"
                      value={settings.MESSENGER_URL}
                      onChange={(e) => setSettings({ ...settings, MESSENGER_URL: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#B8C7AE]/50 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Save Configuration
                  </button>
                </form>
              </div>
            )}

            {/* Tab 6: Audit Log */}
            {activeTab === 'audit' && (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="border border-[#B8C7AE]/30 rounded-xl bg-white overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F2] border-b border-[#B8C7AE]/30 text-[#7a8c6f] uppercase font-mono">
                        <th className="py-2.5 px-4">Log ID</th>
                        <th className="py-2.5 px-4">Timestamp</th>
                        <th className="py-2.5 px-4">Action</th>
                        <th className="py-2.5 px-4">Entity</th>
                        <th className="py-2.5 px-4">Target ID</th>
                        <th className="py-2.5 px-4">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#B8C7AE]/20 font-mono text-[11px]">
                      {auditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-stone-400">
                            No audit log entries recorded yet.
                          </td>
                        </tr>
                      ) : (
                        auditLogs.map((log) => (
                          <tr key={log.log_id} className="hover:bg-[#FAF8F2]/60">
                            <td className="py-2.5 px-4 font-bold">{log.log_id}</td>
                            <td className="py-2.5 px-4 text-[#7a8c6f]">{new Date(log.timestamp).toLocaleTimeString()}</td>
                            <td className="py-2.5 px-4 text-[#142A21] font-bold">{log.action}</td>
                            <td className="py-2.5 px-4 text-[#7a8c6f]">{log.entity_type}</td>
                            <td className="py-2.5 px-4">{log.entity_id}</td>
                            <td className="py-2.5 px-4 text-emerald-700">{log.result}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal: Review Application & Status Transition */}
        {selectedApp && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
            <div className="w-full max-w-lg bg-[#FAF8F2] rounded-2xl border border-[#B8C7AE]/50 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#B8C7AE]/30">
                <div>
                  <span className="font-mono text-xs text-[#7a8c6f]">{selectedApp.application_id}</span>
                  <h4 className="font-serif text-xl text-[#142A21] font-semibold">{selectedApp.full_name}</h4>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1 text-stone-400 hover:text-[#142A21]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-[#142A21]/80">
                <p><strong>Email:</strong> {selectedApp.email}</p>
                <p><strong>Gathering:</strong> {selectedApp.event_title || selectedApp.event_id}</p>
                <p><strong>Spots Requested:</strong> {selectedApp.attendee_count}</p>
                <p><strong>Preferred Contact:</strong> {selectedApp.preferred_contact}</p>
                {selectedApp.message && (
                  <p className="p-3 bg-white rounded-lg border border-[#B8C7AE]/30 italic text-[#142A21]">
                    &ldquo;{selectedApp.message}&rdquo;
                  </p>
                )}
                {selectedApp.deposit_reported_reference && (
                  <p className="p-2.5 bg-purple-50 text-purple-900 border border-purple-200 rounded">
                    <strong>Reported Payment Ref:</strong> {selectedApp.deposit_reported_reference}
                  </p>
                )}
              </div>

              {/* Status Workflow Action Buttons */}
              <div className="pt-3 border-t border-[#B8C7AE]/30 space-y-2">
                <span className="text-[11px] font-semibold text-[#7a8c6f] uppercase block">
                  Permitted Status Transitions
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedApp.status === 'PENDING_REVIEW' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(selectedApp.application_id, 'AWAITING_DEPOSIT')}
                        className="py-2 px-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-medium"
                      >
                        Approve &amp; Request Deposit
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedApp.application_id, 'WAITLISTED')}
                        className="py-2 px-3 rounded bg-indigo-700 hover:bg-indigo-800 text-white font-medium"
                      >
                        Place on Waitlist
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedApp.application_id, 'DECLINED')}
                        className="py-2 px-3 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {(selectedApp.status === 'AWAITING_DEPOSIT' || selectedApp.status === 'DEPOSIT_REPORTED') && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(selectedApp.application_id, 'CONFIRMED')}
                        className="py-2 px-3 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-medium"
                      >
                        Verify Payment &amp; Confirm Booking
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedApp.application_id, 'CANCELLED')}
                        className="py-2 px-3 rounded bg-red-100 hover:bg-red-200 text-red-800 font-medium"
                      >
                        Cancel Application
                      </button>
                    </>
                  )}

                  {selectedApp.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.application_id, 'CANCELLED')}
                      className="py-2 px-3 rounded bg-red-100 hover:bg-red-200 text-red-800 font-medium col-span-2"
                    >
                      Cancel Confirmed Booking
                    </button>
                  )}

                  {selectedApp.status === 'WAITLISTED' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.application_id, 'AWAITING_DEPOSIT')}
                      className="py-2 px-3 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-medium col-span-2"
                    >
                      Offer Spot &amp; Request Deposit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Create / Edit Event */}
        {editingEvent && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
            <form
              onSubmit={handleSaveEvent}
              className="w-full max-w-lg bg-[#FAF8F2] rounded-2xl border border-[#B8C7AE]/50 p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[85vh]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#B8C7AE]/30">
                <h4 className="font-serif text-xl text-[#142A21] font-semibold">
                  {editingEvent.event_id ? 'Edit Ceremony Details' : 'Create New Ceremony'}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="p-1 text-stone-400 hover:text-[#142A21]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1">
                  Ceremony Title
                </label>
                <input
                  type="text"
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#B8C7AE]/50 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-[#B8C7AE]/50 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1">
                    Max Capacity (10–12)
                  </label>
                  <input
                    type="number"
                    value={editingEvent.capacity || 10}
                    onChange={(e) => setEditingEvent({ ...editingEvent, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded border border-[#B8C7AE]/50 text-xs"
                    min={1}
                    max={25}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1">
                    Container Status
                  </label>
                  <select
                    value={editingEvent.status || 'AVAILABLE'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as EventStatus })}
                    className="w-full px-3 py-2 rounded border border-[#B8C7AE]/50 text-xs"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="ALMOST_FULL">ALMOST_FULL</option>
                    <option value="WAITLIST">WAITLIST</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#7a8c6f] mb-1">
                  Starts At (ISO / Date)
                </label>
                <input
                  type="text"
                  value={editingEvent.starts_at || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, starts_at: e.target.value })}
                  placeholder="2026-11-06T15:00:00+08:00"
                  className="w-full px-3 py-2 rounded border border-[#B8C7AE]/50 text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#B8C7AE]/30">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded text-xs text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#142A21] hover:bg-[#1b382c] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Save Ceremony
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
