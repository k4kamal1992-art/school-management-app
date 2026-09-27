import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Tenant
  const tenant = await prisma.tenant.create({
    data: {
      schoolId: "DEMO001",
      name: "Demo High School",
      type: "High School",
      address: "123 School Road, Kolkata",
      district: "Kolkata",
      state: "West Bengal",
      phone: "+913312345678",
      email: "admin@demoschool.edu",
    },
  });

  // Create Admin
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      name: "Rahul Kumar",
      mobile: "9876543210",
      email: "rahul@demoschool.edu",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create Academic Year
  const academicYear = await prisma.academicYear.create({
    data: {
      tenantId: tenant.id,
      name: "2025-2026",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2026-03-31"),
      isActive: true,
    },
  });

  // Create Settings
  await prisma.setting.create({
    data: {
      tenantId: tenant.id,
      currentAcademicYearId: academicYear.id,
      attendanceMethod: "DAILY",
      gradingSystem: "GPA",
    },
  });

  // Create Classes
  const class8 = await prisma.class.create({
    data: { tenantId: tenant.id, name: "Class 8", numericValue: 8 },
  });
  const class9 = await prisma.class.create({
    data: { tenantId: tenant.id, name: "Class 9", numericValue: 9 },
  });
  const class10 = await prisma.class.create({
    data: { tenantId: tenant.id, name: "Class 10", numericValue: 10 },
  });

  // Create Sections
  const sec8A = await prisma.section.create({ data: { classId: class8.id, name: "A" } });
  const sec8B = await prisma.section.create({ data: { classId: class8.id, name: "B" } });
  const sec9A = await prisma.section.create({ data: { classId: class9.id, name: "A" } });
  const sec9B = await prisma.section.create({ data: { classId: class9.id, name: "B" } });

  // Create Subjects
  const subjects = await Promise.all(
    ["Bengali", "English", "Mathematics", "Science", "History", "Geography"].map((name) =>
      prisma.subject.create({
        data: { tenantId: tenant.id, name, code: name.substring(0, 4).toUpperCase() },
      })
    )
  );

  // Link subjects to classes
  for (const cls of [class8, class9, class10]) {
    for (const sub of subjects) {
      await prisma.classSubject.create({
        data: { classId: cls.id, subjectId: sub.id },
      }).catch(() => {}); // Ignore duplicates
    }
  }

  // Create Teacher
  const teacherPassword = await hash("teacher123", 12);
  const teacherUser = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      name: "Priya Sharma",
      mobile: "9876543211",
      email: "priya@demoschool.edu",
      password: teacherPassword,
      role: "TEACHER",
    },
  });

  const teacher = await prisma.teacher.create({
    data: {
      tenantId: tenant.id,
      userId: teacherUser.id,
      teacherId: "T001",
      qualification: "M.Sc., B.Ed.",
      specialization: "Mathematics",
      gender: "FEMALE",
    },
  });

  // Assign subjects to teacher
  await prisma.subjectAssignment.create({
    data: {
      teacherId: teacher.id,
      subjectId: subjects[2].id, // Mathematics
      classId: class8.id,
      sectionId: sec8A.id,
      isClassTeacher: true,
    },
  });

  // Create Students
  const studentData = [
    { name: "Rohan Das", roll: "01", mobile: "9876543220" },
    { name: "Sneha Kaur", roll: "02", mobile: "9876543221" },
    { name: "Arun Pal", roll: "03", mobile: "9876543222" },
    { name: "Mina Barman", roll: "04", mobile: "9876543223" },
    { name: "Kunal Roy", roll: "05", mobile: "9876543224" },
    { name: "Tina Saha", roll: "06", mobile: "9876543225" },
  ];

  const studentPassword = await hash("student123", 12);

  for (let i = 0; i < studentData.length; i++) {
    const s = studentData[i];
    const user = await prisma.user.create({
      data: {
        tenantId: tenant.id,
        name: s.name,
        mobile: s.mobile,
        password: studentPassword,
        role: "STUDENT",
      },
    });

    await prisma.student.create({
      data: {
        tenantId: tenant.id,
        userId: user.id,
        admissionNo: `A2025${String(i + 1).padStart(3, "0")}`,
        rollNumber: s.roll,
        classId: class8.id,
        sectionId: sec8A.id,
        dob: new Date(`2010-${String(i + 1).padStart(2, "0")}-15`),
        bloodGroup: ["A+", "B+", "O+", "AB+"][i % 4],
        address: `${i + 1} Sample Street, Kolkata`,
        guardianName: `Parent of ${s.name.split(" ")[0]}`,
      },
    });
  }

  // Create Parent
  const parentPassword = await hash("parent123", 12);
  const parentUser = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      name: "Mr. Das",
      mobile: "9876543230",
      password: parentPassword,
      role: "PARENT",
    },
  });

  await prisma.parent.create({
    data: {
      tenantId: tenant.id,
      userId: parentUser.id,
      relation: "Father",
      isPrimary: true,
    },
  });

  // Create Exam
  const exam = await prisma.exam.create({
    data: {
      tenantId: tenant.id,
      name: "First Term Exam 2026",
      examType: "TERM",
      startDate: new Date("2026-06-15"),
      endDate: new Date("2026-06-25"),
    },
  });

  // Create Exam Subjects
  for (const sub of subjects) {
    await prisma.examSubject.create({
      data: {
        examId: exam.id,
        subjectId: sub.id,
        classId: class8.id,
        examDate: new Date(`2026-06-${15 + subjects.indexOf(sub)}`),
        fullMarks: 100,
        passMarks: 33,
        startTime: "10:00",
      },
    });
  }

  // Create Fee Structure
  await prisma.feeStructure.create({
    data: {
      tenantId: tenant.id,
      name: "Tuition Fee",
      amount: 1200,
      frequency: "MONTHLY",
      dueDay: 10,
    },
  });

  await prisma.feeStructure.create({
    data: {
      tenantId: tenant.id,
      name: "Exam Fee",
      amount: 500,
      frequency: "ONETIME",
    },
  });

  // Create Notices
  await prisma.notice.create({
    data: {
      tenantId: tenant.id,
      title: "Annual Sports Day on July 15",
      content: "All students are requested to participate in the Annual Sports Day event.",
      targetRole: "ALL",
      isPinned: true,
      createdBy: admin.id,
    },
  });

  await prisma.notice.create({
    data: {
      tenantId: tenant.id,
      title: "Fee Payment Deadline Extended",
      content: "The last date for fee payment has been extended to June 20.",
      targetRole: "PARENT",
      isPinned: false,
      createdBy: admin.id,
    },
  });

  console.log("Seed completed successfully!");
  console.log("Login credentials:");
  console.log("  Admin:    9876543210 / admin123");
  console.log("  Teacher:  9876543211 / teacher123");
  console.log("  Student:  9876543220 / student123");
  console.log("  Parent:   9876543230 / parent123");
  console.log("  School ID: DEMO001");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });