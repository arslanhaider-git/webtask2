import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  School,
  ExternalLink,
  GraduationCap,
  Calendar,
  AlertCircle,
  CheckCircle2,
  X,
  FileCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

export interface StudentRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  university: string;
  studyLevel: string;
  course: string;
  intake: string;
  status: 'Inquiry' | 'Documents Pending' | 'Under Review' | 'Offer Issued' | 'Visa Lodged' | 'Visa Approved';
  createdAt: string;
  notes?: string;
}

export interface UniversityApiItem {
  name: string;
  web_pages: string[];
  domains: string[];
  country: string;
  'state-province': string | null;
}

const STORAGE_KEY = 'aussiepath_students_v1';

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'STU-1001',
    fullName: 'Amina Khan',
    email: 'amina.k@example.com',
    phone: '+92 300 1234567',
    country: 'Pakistan',
    university: 'University of Melbourne',
    studyLevel: "Master's",
    course: 'Master of Information Technology',
    intake: 'Feb 2025',
    status: 'Visa Approved',
    createdAt: '2024-10-15',
    notes: 'IELTS 7.5; Full tuition deposit paid.',
  },
  {
    id: 'STU-1002',
    fullName: 'Rohan Sharma',
    email: 'rohan.sharma@example.com',
    phone: '+91 98765 43210',
    country: 'India',
    university: 'University of New South Wales (UNSW)',
    studyLevel: "Bachelor's",
    course: 'Bachelor of Computer Science',
    intake: 'July 2025',
    status: 'Offer Issued',
    createdAt: '2024-11-02',
    notes: 'Conditional offer letter received; awaiting final transcript.',
  },
  {
    id: 'STU-1003',
    fullName: 'Tanvir Hossain',
    email: 'tanvir.h@example.com',
    phone: '+880 1711 234567',
    country: 'Bangladesh',
    university: 'University of Sydney',
    studyLevel: "Master's",
    course: 'Master of Data Science',
    intake: 'Feb 2025',
    status: 'Under Review',
    createdAt: '2024-11-18',
    notes: 'SOP reviewed by senior counselor. Application submitted to faculty.',
  },
  {
    id: 'STU-1004',
    fullName: 'Pooja Thapa',
    email: 'pooja.thapa@example.com',
    phone: '+977 9841 000000',
    country: 'Nepal',
    university: 'Monash University',
    studyLevel: "Bachelor's",
    course: 'Bachelor of Nursing',
    intake: 'Feb 2025',
    status: 'Documents Pending',
    createdAt: '2024-11-25',
    notes: 'Needs certified bank statement and updated passport scan.',
  },
  {
    id: 'STU-1005',
    fullName: 'Dinuka Perera',
    email: 'dinuka.p@example.com',
    phone: '+94 77 123 4567',
    country: 'Sri Lanka',
    university: 'University of Queensland',
    studyLevel: 'PhD',
    course: 'PhD in Renewable Energy Systems',
    intake: 'July 2025',
    status: 'Inquiry',
    createdAt: '2024-12-01',
    notes: 'Draft research proposal attached. Contacting potential supervisor.',
  },
];

const FALLBACK_UNIVERSITIES: UniversityApiItem[] = [
  {
    name: 'University of Melbourne',
    web_pages: ['https://www.unimelb.edu.au'],
    domains: ['unimelb.edu.au'],
    country: 'Australia',
    'state-province': 'Victoria',
  },
  {
    name: 'University of Sydney',
    web_pages: ['https://www.sydney.edu.au'],
    domains: ['sydney.edu.au'],
    country: 'Australia',
    'state-province': 'New South Wales',
  },
  {
    name: 'University of New South Wales (UNSW Sydney)',
    web_pages: ['https://www.unsw.edu.au'],
    domains: ['unsw.edu.au'],
    country: 'Australia',
    'state-province': 'New South Wales',
  },
  {
    name: 'Australian National University (ANU)',
    web_pages: ['https://www.anu.edu.au'],
    domains: ['anu.edu.au'],
    country: 'Australia',
    'state-province': 'Australian Capital Territory',
  },
  {
    name: 'Monash University',
    web_pages: ['https://www.monash.edu'],
    domains: ['monash.edu'],
    country: 'Australia',
    'state-province': 'Victoria',
  },
  {
    name: 'University of Queensland (UQ)',
    web_pages: ['https://www.uq.edu.au'],
    domains: ['uq.edu.au'],
    country: 'Australia',
    'state-province': 'Queensland',
  },
  {
    name: 'University of Western Australia (UWA)',
    web_pages: ['https://www.uwa.edu.au'],
    domains: ['uwa.edu.au'],
    country: 'Australia',
    'state-province': 'Western Australia',
  },
  {
    name: 'University of Adelaide',
    web_pages: ['https://www.adelaide.edu.au'],
    domains: ['adelaide.edu.au'],
    country: 'Australia',
    'state-province': 'South Australia',
  },
  {
    name: 'University of Technology Sydney (UTS)',
    web_pages: ['https://www.uts.edu.au'],
    domains: ['uts.edu.au'],
    country: 'Australia',
    'state-province': 'New South Wales',
  },
  {
    name: 'RMIT University',
    web_pages: ['https://www.rmit.edu.au'],
    domains: ['rmit.edu.au'],
    country: 'Australia',
    'state-province': 'Victoria',
  },
];

export const StudentPortalPage: React.FC = () => {
  // --- 1. LOCAL STORAGE & CRUD STATE ---
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to read localStorage:', e);
    }
    // Default seed
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
    return INITIAL_STUDENTS;
  });

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'createdAt' | 'fullName' | 'university'>('createdAt');

  // Modal & Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<Omit<StudentRecord, 'id' | 'createdAt'>>({
    fullName: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    university: 'University of Melbourne',
    studyLevel: "Master's",
    course: '',
    intake: 'Feb 2025',
    status: 'Inquiry',
    notes: '',
  });

  const [formError, setFormError] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  const saveToLocalStorage = (updated: StudentRecord[]) => {
    setStudents(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- JAVASCRIPT ARRAY METHODS: FILTER, FIND, SOME, EVERY ---
  const filteredStudents = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return students
      .filter((s) => {
        // Search across name, email, university, and course using Array methods
        const matchesSearch =
          q === '' ||
          s.fullName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.university.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q);

        const matchesLevel = levelFilter === 'All' || s.studyLevel === levelFilter;
        const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

        return matchesSearch && matchesLevel && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'fullName') return a.fullName.localeCompare(b.fullName);
        if (sortBy === 'university') return a.university.localeCompare(b.university);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [students, searchTerm, levelFilter, statusFilter, sortBy]);

  // Status stats using .filter() & .length
  const totalCount = students.length;
  const underReviewCount = students.filter((s) => s.status === 'Under Review').length;
  const offerIssuedCount = students.filter((s) => s.status === 'Offer Issued').length;
  const visaApprovedCount = students.filter((s) => s.status === 'Visa Approved').length;

  // Handle open modal for CREATE
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormValues({
      fullName: '',
      email: '',
      phone: '',
      country: 'Pakistan',
      university: 'University of Melbourne',
      studyLevel: "Master's",
      course: '',
      intake: 'Feb 2025',
      status: 'Inquiry',
      notes: '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Handle open modal for UPDATE (using .find())
  const handleOpenEdit = (id: string) => {
    const record = students.find((s) => s.id === id);
    if (!record) return;

    setEditingId(id);
    setFormValues({
      fullName: record.fullName,
      email: record.email,
      phone: record.phone,
      country: record.country,
      university: record.university,
      studyLevel: record.studyLevel,
      course: record.course,
      intake: record.intake,
      status: record.status,
      notes: record.notes || '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Handle Form Submit (CREATE & UPDATE)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Array method: .every() for required field validation
    const requiredFields = [
      formValues.fullName.trim(),
      formValues.email.trim(),
      formValues.phone.trim(),
      formValues.course.trim(),
      formValues.university.trim(),
    ];

    const allValid = requiredFields.every((f) => f.length > 0);
    if (!allValid) {
      setFormError('Please fill in all required fields.');
      return;
    }

    // Array method: .some() to check duplicate emails on create
    if (!editingId) {
      const emailExists = students.some(
        (s) => s.email.toLowerCase() === formValues.email.trim().toLowerCase()
      );
      if (emailExists) {
        setFormError('A student record with this email address already exists.');
        return;
      }
    }

    if (editingId) {
      // UPDATE using .map()
      const updated = students.map((s) =>
        s.id === editingId
          ? {
              ...s,
              ...formValues,
            }
          : s
      );
      saveToLocalStorage(updated);
      showToast(`Updated application for ${formValues.fullName}`);
    } else {
      // CREATE
      const newRecord: StudentRecord = {
        id: `STU-${Date.now().toString().slice(-4)}`,
        ...formValues,
        createdAt: new Date().toISOString().split('T')[0],
      };
      saveToLocalStorage([newRecord, ...students]);
      showToast(`Created new student application for ${newRecord.fullName}`);
    }

    setIsModalOpen(false);
  };

  // Handle DELETE (using .filter())
  const handleDelete = (id: string) => {
    const studentToDelete = students.find((s) => s.id === id);
    const updated = students.filter((s) => s.id !== id);
    saveToLocalStorage(updated);
    setDeleteConfirmId(null);
    if (studentToDelete) {
      showToast(`Deleted record for ${studentToDelete.fullName}`);
    }
  };

  // Reset to default sample records
  const handleResetSampleData = () => {
    if (window.confirm('Reset student records to default sample data?')) {
      saveToLocalStorage(INITIAL_STUDENTS);
      showToast('Student database reset to initial demonstration records.');
    }
  };

  // --- 2. PUBLIC API INTEGRATION VIA AXIOS ---
  const [universities, setUniversities] = useState<UniversityApiItem[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSearch, setApiSearch] = useState('');
  const [apiSuccessCount, setApiSuccessCount] = useState<number | null>(null);

  // Fetch from live public universities endpoint via Axios
  const fetchUniversities = async () => {
    setApiLoading(true);
    setApiError(null);
    try {
      // Using axios.get() to fetch public Australian university data
      const response = await axios.get<UniversityApiItem[]>(
        'https://universities.hipolabs.com/search?country=Australia',
        { timeout: 7000 }
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        setUniversities(response.data);
        setApiSuccessCount(response.data.length);
      } else {
        setUniversities(FALLBACK_UNIVERSITIES);
        setApiSuccessCount(FALLBACK_UNIVERSITIES.length);
      }
    } catch (err: unknown) {
      console.warn('Axios fetch to Hipolabs failed, using verified fallback list:', err);
      // Clean error message and graceful fallback
      setUniversities(FALLBACK_UNIVERSITIES);
      setApiSuccessCount(FALLBACK_UNIVERSITIES.length);
      setApiError('Notice: Public API server took too long. Loaded official university catalog from backup.');
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  // Filter universities live
  const filteredUniversities = useMemo(() => {
    const q = apiSearch.toLowerCase().trim();
    if (!q) return universities.slice(0, 8); // show top 8
    return universities.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        (u['state-province'] && u['state-province'].toLowerCase().includes(q)) ||
        (u.domains[0] && u.domains[0].toLowerCase().includes(q))
    ).slice(0, 12);
  }, [universities, apiSearch]);

  const selectUniversityForForm = (uniName: string) => {
    setFormValues((prev) => ({ ...prev, university: uniName }));
    handleOpenCreate();
    setFormValues((prev) => ({ ...prev, university: uniName }));
    showToast(`Selected "${uniName}" for new application!`);
  };

  const getStatusBadge = (status: StudentRecord['status']) => {
    switch (status) {
      case 'Visa Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Offer Issued':
        return 'bg-blue-100 text-brand-blue border-blue-200';
      case 'Under Review':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Documents Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Visa Lodged':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <main className="flex-grow bg-[#F8FAFC]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-navy text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-brand-blue/30 animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Hero */}
      <section className="bg-brand-navy text-white py-12 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-blue/30 text-brand-gold text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-brand-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Management & University Directory</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Student Applications Portal
              </h1>
              <p className="text-gray-300 text-base mt-2 max-w-2xl">
                Manage, search, update, and track Australian university admissions using local storage persistence and live public university data fetched via Axios.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleOpenCreate}
                className="bg-brand-gold hover:bg-yellow-400 text-brand-navy font-bold px-5 py-3 rounded-lg shadow-md transition-all flex items-center space-x-2 text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Student Record</span>
              </button>
              <button
                type="button"
                onClick={handleResetSampleData}
                className="bg-white/10 hover:bg-white/20 text-gray-200 text-sm font-medium px-4 py-3 rounded-lg border border-white/20 transition-colors flex items-center space-x-2 cursor-pointer"
                title="Restore default sample data"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Data</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-xs text-gray-300 font-medium">Total Applications</span>
              <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-xs text-purple-200 font-medium">Under Review</span>
              <p className="text-2xl font-bold text-purple-300 mt-1">{underReviewCount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-xs text-blue-200 font-medium">Offers Issued</span>
              <p className="text-2xl font-bold text-blue-300 mt-1">{offerIssuedCount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-xs text-green-200 font-medium">Visas Approved</span>
              <p className="text-2xl font-bold text-green-300 mt-1">{visaApprovedCount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* SECTION 1: CRUD Application & LocalStorage Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header & Search Toolbar */}
          <div className="p-6 border-b border-gray-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-brand-navy flex items-center space-x-2">
                  <Users className="h-5 w-5 text-brand-blue" />
                  <span>Student Records Management</span>
                </h2>
                <p className="text-xs text-brand-slate mt-1">
                  Persisted with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-brand-navy">localStorage.setItem()</code> • Real-time search and filter
                </p>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 self-start sm:self-auto">
                Showing <strong>{filteredStudents.length}</strong> of {totalCount} records
              </div>
            </div>

            {/* Filter Controls Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search name, course, country..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Study Level filter */}
              <div>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
                >
                  <option value="All">All Study Levels</option>
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="PhD">PhD / Doctorate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Foundation">Foundation</option>
                </select>
              </div>

              {/* Status filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Inquiry">Inquiry</option>
                  <option value="Documents Pending">Documents Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Offer Issued">Offer Issued</option>
                  <option value="Visa Lodged">Visa Lodged</option>
                  <option value="Visa Approved">Visa Approved</option>
                </select>
              </div>

              {/* Sort selector */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'fullName' | 'university')}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
                >
                  <option value="createdAt">Sort by Date Added</option>
                  <option value="fullName">Sort by Student Name</option>
                  <option value="university">Sort by University</option>
                </select>
              </div>
            </div>
          </div>

          {/* Records Table */}
          <div className="overflow-x-auto">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Users className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-brand-navy">No matching student records found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search criteria or add a new student application record.
                </p>
                <button
                  onClick={handleOpenCreate}
                  className="mt-4 inline-flex items-center space-x-2 bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-navy transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Student</span>
                </button>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-50/75 text-xs text-brand-navy font-semibold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4">Student & ID</th>
                    <th scope="col" className="px-6 py-4">Contact Info</th>
                    <th scope="col" className="px-6 py-4">Target University & Course</th>
                    <th scope="col" className="px-6 py-4">Intake & Level</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name & ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="h-9 w-9 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center shrink-0">
                            {student.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-brand-navy">{student.fullName}</div>
                            <div className="text-xs text-gray-400 font-mono">{student.id} • {student.country}</div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-brand-slate">{student.email}</div>
                        <div className="text-xs text-gray-500">{student.phone}</div>
                      </td>

                      {/* University & Course */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-brand-navy flex items-center space-x-1.5">
                          <School className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span className="truncate max-w-[220px]" title={student.university}>
                            {student.university}
                          </span>
                        </div>
                        <div className="text-xs text-brand-slate truncate max-w-[220px]" title={student.course}>
                          {student.course}
                        </div>
                      </td>

                      {/* Intake & Level */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 text-xs text-brand-navy font-medium">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{student.intake}</span>
                        </div>
                        <span className="inline-block mt-0.5 text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {student.studyLevel}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(student.id)}
                            className="p-1.5 text-brand-blue hover:text-brand-navy hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Edit Student Record"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(student.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete Student Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* SECTION 2: PUBLIC API INTEGRATION VIA AXIOS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-brand-blue text-xs font-bold px-2.5 py-1 rounded-md mb-2">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Public API Integration via Axios</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-navy">
                Australian Universities Directory
              </h2>
              <p className="text-sm text-brand-slate mt-1 max-w-2xl">
                Fetched dynamically using <code className="bg-gray-100 px-1 py-0.5 rounded text-brand-navy font-mono text-xs">axios.get('https://universities.hipolabs.com/search?country=Australia')</code> with live loading and error fallback states.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={fetchUniversities}
                disabled={apiLoading}
                className="inline-flex items-center space-x-2 bg-brand-bg hover:bg-blue-100 text-brand-blue border border-brand-blue/30 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${apiLoading ? 'animate-spin' : ''}`} />
                <span>{apiLoading ? 'Fetching...' : 'Refresh API'}</span>
              </button>
            </div>
          </div>

          {/* Search bar for API results */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={apiSearch}
                onChange={(e) => setApiSearch(e.target.value)}
                placeholder="Filter live universities..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
              />
            </div>
            {apiSuccessCount !== null && (
              <span className="text-xs text-gray-500">
                Connected to public dataset • <strong>{universities.length}</strong> institutions loaded
              </span>
            )}
          </div>

          {/* API Loading, Error, and Cards Display */}
          {apiLoading ? (
            <div className="py-16 text-center">
              <div className="inline-block p-4 rounded-full bg-blue-50 text-brand-blue mb-4">
                <Clock className="w-8 h-8 animate-spin" />
              </div>
              <h4 className="text-base font-semibold text-brand-navy">Connecting to Public University API...</h4>
              <p className="text-xs text-gray-500 mt-1">Executing axios.get() request for Australian university registry</p>
            </div>
          ) : (
            <>
              {apiError && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-amber-600" />
                  <span>{apiError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {filteredUniversities.map((uni, idx) => (
                  <div
                    key={`${uni.name}-${idx}`}
                    className="p-5 rounded-xl border border-gray-200 bg-white hover:border-brand-blue/50 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-10 w-10 bg-brand-bg rounded-lg flex items-center justify-center mb-3 group-hover:bg-brand-blue group-hover:text-white transition-colors text-brand-blue">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-brand-navy text-sm line-clamp-2 leading-snug mb-1">
                        {uni.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {uni['state-province'] ? `${uni['state-province']}, Australia` : 'Australia'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      {uni.web_pages[0] ? (
                        <a
                          href={uni.web_pages[0]}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-brand-blue font-medium hover:underline inline-flex items-center"
                        >
                          Website <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Official Portal</span>
                      )}

                      <button
                        type="button"
                        onClick={() => selectUniversityForForm(uni.name)}
                        className="text-xs bg-brand-bg hover:bg-brand-blue hover:text-white text-brand-navy font-semibold px-2 py-1 rounded transition-colors cursor-pointer"
                        title="Use this university in new application"
                      >
                        + Use in Record
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      {/* CREATE & EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-brand-bg">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">
                  {editingId ? 'Edit Student Application Record' : 'Add New Student Application'}
                </h3>
                <p className="text-xs text-brand-slate">
                  Stored locally via localStorage with real-time validation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formValues.fullName}
                    onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value })}
                    placeholder="e.g. Fatima Ali"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    placeholder="fatima@example.com"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formValues.phone}
                    onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Country of Origin
                  </label>
                  <select
                    value={formValues.country}
                    onChange={(e) => setFormValues({ ...formValues, country: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Target University in Australia <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formValues.university}
                    onChange={(e) => setFormValues({ ...formValues, university: e.target.value })}
                    placeholder="e.g. University of Melbourne"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Study Level
                  </label>
                  <select
                    value={formValues.studyLevel}
                    onChange={(e) => setFormValues({ ...formValues, studyLevel: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
                  >
                    <option value="Bachelor's">Bachelor's Degree</option>
                    <option value="Master's">Master's Degree</option>
                    <option value="PhD">PhD / Doctorate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Course / Major <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formValues.course}
                    onChange={(e) => setFormValues({ ...formValues, course: e.target.value })}
                    placeholder="e.g. Master of Data Science"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Target Intake Date
                  </label>
                  <input
                    type="text"
                    value={formValues.intake}
                    onChange={(e) => setFormValues({ ...formValues, intake: e.target.value })}
                    placeholder="e.g. Feb 2025"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Application Status
                </label>
                <select
                  value={formValues.status}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      status: e.target.value as StudentRecord['status'],
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
                >
                  <option value="Inquiry">Inquiry</option>
                  <option value="Documents Pending">Documents Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Offer Issued">Offer Issued</option>
                  <option value="Visa Lodged">Visa Lodged</option>
                  <option value="Visa Approved">Visa Approved</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Counselor Notes & Remarks
                </label>
                <textarea
                  rows={2}
                  value={formValues.notes}
                  onChange={(e) => setFormValues({ ...formValues, notes: e.target.value })}
                  placeholder="Additional notes about IELTS, transcripts, or financial affidavits..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-navy text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 animate-scale-up">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-center text-brand-navy mb-2">
              Delete Student Application?
            </h3>
            <p className="text-xs text-center text-gray-500 mb-6">
              Are you sure you want to delete this record? This action will remove the record from local storage.
            </p>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
