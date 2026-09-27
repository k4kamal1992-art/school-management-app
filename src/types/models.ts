import { AttendanceStatus, ExamType, FeeFrequency, NoticeTarget, PaymentMode, UserRole } from "./index";

export interface Teacher {
  id: string;
  tenantId: string;
  userId: string;
  teacherId: string;
  name: string;
  mobile: string;
  email?: string;
  qualification?: string;
  specialization?: string;
  joiningDate?: string;
  gender?: string;
  isClassTeacher: boolean;
  createdAt: string;
}

export interface Student {
  id: string;
  tenantId: string;
  userId: string;
  admissionNo: string;
  rollNumber: string;
  name: string;
  mobile: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  dob?: string;
  bloodGroup?: string;
  address?: string;
  guardianName?: string;
  isActive: boolean;
}

export interface Parent {
  id: string;
  tenantId: string;
  userId: string;
  name: string;
  mobile: string;
  occupation?: string;
  relation: string;
  isPrimary: boolean;
}

export interface StudentParentLink {
  id: string;
  studentId: string;
  parentId: string;
  studentName: string;
  isPrimary: boolean;
}

export interface Class {
  id: string;
  tenantId: string;
  name: string;
  numericValue: number;
  classTeacherId?: string;
  classTeacherName?: string;
  studentCount?: number;
  sectionCount?: number;
}

export interface Section {
  id: string;
  tenantId: string;
  classId: string;
  className: string;
  name: string;
  classTeacherId?: string;
  classTeacherName?: string;
  studentCount?: number;
}

export interface Subject {
  id: string;
  tenantId: string;
  name: string;
  code?: string;
  classIds?: string[];
}

export interface ClassSubject {
  id: string;
  classId: string;
  subjectId: string;
  subjectName: string;
  isActive: boolean;
}

export interface SubjectAssignment {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  isClassTeacher: boolean;
}

export interface Routine {
  id: string;
  tenantId: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  roomNumber?: string;
  isBreak: boolean;
}

export interface AttendanceRecord {
  id: string;
  tenantId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  teacherId: string;
  classId: string;
  sectionId: string;
  date: string;
  status: AttendanceStatus;
  remark?: string;
}

export interface AttendanceSummary {
  date: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  present: number;
  absent: number;
  late: number;
  total: number;
}

export interface Exam {
  id: string;
  tenantId: string;
  name: string;
  examType: ExamType;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  createdAt: string;
}

export interface ExamSubject {
  id: string;
  examId: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  examDate: string;
  fullMarks: number;
  passMarks: number;
  startTime: string;
  roomNumber?: string;
}

export interface Mark {
  id: string;
  tenantId: string;
  examId: string;
  examName: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  marksObtained?: number;
  isAbsent: boolean;
  grade?: string;
  isApproved: boolean;
  fullMarks: number;
  passMarks: number;
}

export interface Homework {
  id: string;
  tenantId: string;
  teacherId: string;
  teacherName: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  title: string;
  description?: string;
  attachmentUrl?: string;
  assignedDate: string;
  dueDate: string;
  status?: "PENDING" | "SUBMITTED";
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName: string;
  submissionUrl?: string;
  submittedAt: string;
  status: string;
  feedback?: string;
}

export interface FeeStructure {
  id: string;
  tenantId: string;
  name: string;
  amount: number;
  frequency: FeeFrequency;
  classId?: string;
  className?: string;
  dueDay?: number;
  isActive: boolean;
}

export interface FeePayment {
  id: string;
  tenantId: string;
  studentId: string;
  studentName: string;
  feeStructureId: string;
  feeName: string;
  amount: number;
  monthYear: string;
  paymentDate: string;
  paymentMode: PaymentMode;
  receiptNo?: string;
  notes?: string;
}

export interface FeeDue {
  studentId: string;
  studentName: string;
  className: string;
  rollNumber: string;
  totalDue: number;
  monthsPending: number;
  feeItems: { name: string; amount: number; dueDate: string }[];
}

export interface Notice {
  id: string;
  tenantId: string;
  title: string;
  content: string;
  targetRole: NoticeTarget;
  classId?: string;
  className?: string;
  attachmentUrl?: string;
  isPinned: boolean;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  seenCount?: number;
  totalCount?: number;
}

export interface AcademicYear {
  id: string;
  tenantId: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalTeachers: number;
  totalStudents: number;
  totalClasses: number;
  todayAttendance: {
    present: number;
    absent: number;
    late: number;
    percentage: number;
  };
  feeDueTotal: number;
  recentNotices: Notice[];
}

export interface TeacherDashboard {
  todayClasses: number;
  todayRoutine: Routine[];
  totalStudents: number;
  pendingHomework: number;
}

export interface StudentDashboard {
  attendancePercentage: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  todayHomework: Homework[];
  upcomingExams: Exam[];
  recentNotices: Notice[];
}

export interface ParentDashboard {
  children: Student[];
  selectedChild?: Student;
  attendanceSummary: {
    studentId: string;
    percentage: number;
    present: number;
    absent: number;
  }[];
  totalFeeDue: number;
  recentNotices: Notice[];
}

export interface ResultCard {
  examName: string;
  studentName: string;
  className: string;
  rollNumber: string;
  subjects: {
    subjectName: string;
    marksObtained: number;
    fullMarks: number;
    grade: string;
  }[];
  totalMarks: number;
  totalObtained: number;
  percentage: number;
  overallGrade: string;
  gpa: number;
  rank?: number;
}