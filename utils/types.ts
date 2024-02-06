/* eslint-disable import/prefer-default-export */

export enum ClassVariant {
  default = "default",
  primary = "primary",
  secondary = "secondary",
}

export enum QuestionType {
  multipleChoice = "Multiple Choice",
  trueOrFalse = "True or False",
  combination = "Combination",
}

export enum ClassNavLink {
  home = "Home",
  tests = "Tests",
  students = "Students",
  statistics = "Statistics",
}

export enum TestNavLink {
  settings = "About",
  file = "File",
  scan = "Scan",
  grades = "Grades",
  statistics = "statistics",
}

export type Choices = {
  choice: string;
  point: number;
};

export type Number = {
  number: number;
  choices: Choices[];
};

export type QuestionPart = {
  questionType: QuestionType;
  numberOfChoices: number;
  points: number;
  mdatPoints?: Number[];
  totalNumber: number;
};

export type TestInfo = {
  classId: string;
  testName: string;
  variant: ClassVariant;
  passingGrade: number;
  format?: string;
  answerIndices: number[];
  parts: QuestionPart[];
};

export type UploadedFile = {
  image: File | null;
  imageUrl: string;
};

export type ClassInfo = {
  course: string;
  section: string;
  schoolLevel: string;
  year: number;
  program: string;
  variant: ClassVariant;
  students: StudentInfo[];
};

export type StudentInfo = {
  lastName: string;
  firstName: string;
  middleName: string;
  rollNumber: number;
};

export type ProcessedImageData = {
  answerIndices: number[];
  processed_image: string;
};

export type Grade = {
  processedImage: ArrayBuffer;
  numberOfCorrect: number;
  numberOfIncorrect: number;
  answerIndices: number[];
  student: StudentInfo;
  status: string;
  totalScore: number;
  totalPerfectScore: number;
  createdAt: string;
  test: {
    id: string;
    answerIndices: number[];
    testParts?: QuestionPart;
    testName: string;
  };
};

export type Teacher = {
  username: string;
  email: string;
  password: string;
};

export type QuestionsMostGotRight = {
  index: number;
  studentCount: number;
  numberOfChoices: number;
  correctAnswer: number;
  studentNames: string[];
};

export type QuestionsMostGotWrong = {
  index: number;
  studentCount: number;
  mostPickedAnswer: number;
  correctAnswer: number;
  numberOfChoices: number;
  studentNames: string[];
};

export type Statistics = {
  accuracy: number;
  passingRate: number;
  highest: number;
  lowest: number;
  questionsMostGotRight: QuestionsMostGotRight[] | undefined;
  questionsMostGotWrong: QuestionsMostGotWrong[] | undefined;
};

// FETCHED TYPES

export type FetchedClassInfo = {
  id: string;
  course: string;
  section: string;
  year: number;
  program: string;
  createdAt?: string;
  updatedAt?: string;
  variant: ClassVariant;
};

export type FetchedTestInfo = {
  id: string;
  classId: string;
  testName: string;
  passingGrade: number;
  status: string;
  variant: ClassVariant;
  format: string;
  answerIndices: number[];
  testParts?: QuestionPart[];
  _count?: { testParts: number };
  createdAt?: string;
  updatedAt?: string;
};

export type FetchedTestInfoToProcess = {
  id: string;
  classId: string;
  format: string;
  testName: string;
  answerIndices: number[];
  testParts: QuestionPart[];
  createdAt?: string;
  updatedAt?: string;
};

export type FetchedGradeInfo = {
  id: string;
  roll_number: number;
  number_of_correct: number;
  number_of_incorrect: number;
  answer_indices: number[];
  processed_image: ArrayBuffer;
  status: string;
  total_score: number;
  total_perfect_score: number;
};

export type FetchedSingleGrade = {
  id: string;
  processedImage: ArrayBuffer;
  numberOfCorrect: number;
  numberOfIncorrect: number;
  answerIndices: number[];
  student: StudentInfo;
  createdAt: string;
  updatedAt: string;
  test: {
    answerIndices: number[];
    testParts: QuestionPart[];
  };
};

export type FetchedStudentInfo = {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  rollNumber: number;
  createdAt?: string;
  updatedAt?: string;
};

export type FetchedTestInfoToGeneratePaper = {
  testName: string;
  testParts: QuestionPart[];
  class: {
    course: string;
    program: string;
    section: string;
    students: {
      firstName: string;
      lastName: string;
      middleName: string;
      rollNumber: number;
    }[];
  };
};
