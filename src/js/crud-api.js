/**
 * Web Assignment 03 - AussiePath Education
 * Modular Vanilla JavaScript for CRUD operations, LocalStorage persistence,
 * JavaScript Array Methods (filter, find, map, some, every),
 * and Public API Integration via Axios.
 */

// Local Storage Key
const STORAGE_KEY = 'aussiepath_students_v1';

// Initial sample records to seed if local storage is empty
const INITIAL_STUDENTS = [
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
    notes: 'IELTS 7.5; Full tuition deposit paid.'
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
    notes: 'Conditional offer letter received; awaiting final transcript.'
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
    notes: 'SOP reviewed by senior counselor. Application submitted.'
  }
];

// -------------------------------------------------------------
// 1. LOCAL STORAGE & CRUD FUNCTIONS
// -------------------------------------------------------------

/**
 * Retrieve all students from LocalStorage (READ)
 * @returns {Array<Object>}
 */
export function getStudents() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      // Seed default sample data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : INITIAL_STUDENTS;
  } catch (error) {
    console.error('Error reading localStorage:', error);
    return INITIAL_STUDENTS;
  }
}

/**
 * Save array of students to LocalStorage
 * @param {Array<Object>} students 
 */
export function saveStudents(students) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

/**
 * Add a new student record (CREATE)
 * Demonstrates: Array method .some() to check for duplicate emails,
 * and .every() for required field validation.
 * @param {Object} studentData 
 * @returns {{success: boolean, message: string, record?: Object}}
 */
export function addStudent(studentData) {
  const currentStudents = getStudents();

  // Array Method: .every() validates all required fields are provided
  const requiredFields = ['fullName', 'email', 'phone', 'university', 'course'];
  const hasAllRequired = requiredFields.every(field => Boolean(studentData[field]?.trim()));

  if (!hasAllRequired) {
    return { success: false, message: 'All required fields must be completed.' };
  }

  // Array Method: .some() checks for duplicate email
  const emailExists = currentStudents.some(
    s => s.email.toLowerCase() === studentData.email.trim().toLowerCase()
  );
  if (emailExists) {
    return { success: false, message: 'A student with this email address already exists.' };
  }

  const newRecord = {
    id: `STU-${Date.now().toString().slice(-4)}`,
    fullName: studentData.fullName.trim(),
    email: studentData.email.trim(),
    phone: studentData.phone.trim(),
    country: studentData.country || 'Pakistan',
    university: studentData.university.trim(),
    studyLevel: studentData.studyLevel || "Master's",
    course: studentData.course.trim(),
    intake: studentData.intake || 'Feb 2025',
    status: studentData.status || 'Inquiry',
    createdAt: new Date().toISOString().split('T')[0],
    notes: studentData.notes || ''
  };

  const updatedStudents = [newRecord, ...currentStudents];
  saveStudents(updatedStudents);

  return { success: true, message: 'Student application added successfully.', record: newRecord };
}

/**
 * Update an existing student record (UPDATE)
 * Demonstrates: Array method .find() to locate the record,
 * and .map() to produce the updated array.
 * @param {string} id 
 * @param {Object} updatedFields 
 * @returns {{success: boolean, message: string}}
 */
export function updateStudent(id, updatedFields) {
  const currentStudents = getStudents();

  // Array Method: .find() verifies the record exists
  const target = currentStudents.find(s => s.id === id);
  if (!target) {
    return { success: false, message: 'Student record not found.' };
  }

  // Array Method: .map() updates the target item immutably
  const updatedStudents = currentStudents.map(student => {
    if (student.id === id) {
      return {
        ...student,
        ...updatedFields
      };
    }
    return student;
  });

  saveStudents(updatedStudents);
  return { success: true, message: 'Student application updated successfully.' };
}

/**
 * Delete a student record by ID (DELETE)
 * Demonstrates: Array method .filter()
 * @param {string} id 
 * @returns {{success: boolean, message: string}}
 */
export function deleteStudent(id) {
  const currentStudents = getStudents();
  const updatedStudents = currentStudents.filter(student => student.id !== id);
  saveStudents(updatedStudents);
  return { success: true, message: 'Student record deleted successfully.' };
}

// -------------------------------------------------------------
// 2. SEARCH & FILTERING VIA ARRAY METHODS
// -------------------------------------------------------------

/**
 * Filter students in real-time
 * Demonstrates: Array method .filter() with multiple criteria
 * @param {Array<Object>} students 
 * @param {string} query 
 * @param {string} levelFilter 
 * @param {string} statusFilter 
 * @returns {Array<Object>}
 */
export function filterStudents(students, query = '', levelFilter = 'All', statusFilter = 'All') {
  const q = query.trim().toLowerCase();

  return students.filter(student => {
    const matchesSearch =
      q === '' ||
      student.fullName.toLowerCase().includes(q) ||
      student.email.toLowerCase().includes(q) ||
      student.university.toLowerCase().includes(q) ||
      student.course.toLowerCase().includes(q) ||
      student.country.toLowerCase().includes(q);

    const matchesLevel = levelFilter === 'All' || student.studyLevel === levelFilter;
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;

    return matchesSearch && matchesLevel && matchesStatus;
  });
}

// -------------------------------------------------------------
// 3. PUBLIC API INTEGRATION VIA AXIOS
// -------------------------------------------------------------

/**
 * Fetch Australian university registry from public unauthenticated endpoint
 * Demonstrates: axios.get() with async/await, loading and error handling
 * @param {Function} [onSuccess] callback
 * @param {Function} [onError] callback
 */
export async function fetchAustralianUniversities(onSuccess, onError) {
  const API_ENDPOINT = 'https://universities.hipolabs.com/search?country=Australia';

  try {
    // Axios GET request
    const response = await axios.get(API_ENDPOINT, { timeout: 8000 });
    if (response.data && Array.isArray(response.data)) {
      if (typeof onSuccess === 'function') {
        onSuccess(response.data);
      }
      return response.data;
    }
    throw new Error('Invalid format received from public university API.');
  } catch (error) {
    console.error('Axios error fetching public university API:', error);
    if (typeof onError === 'function') {
      onError(error.message || 'Failed to load public university data.');
    }
    return [];
  }
}
