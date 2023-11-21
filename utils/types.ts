/* eslint-disable import/prefer-default-export */

export enum ClassVariant {
  default = "default",
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
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
  settings = "Settings",
  file = "File",
  scan = "Scan",
  grades = "Grades",
  statistics = "statistics",
}

export type UploadedFile = {
  image: File | null;
  imageUrl: string;
};

export type ClassInfo = {
  course: string;
  section: string;
  year: number;
  program: string;
  variant: ClassVariant;
  students: StudentInfo[];
};

export type TestInfo = {
  classId: string;
  testName: string;
  totalQuestions: number;
  numberOfChoices: number;
  answerIndices: number[];
  points: number;
  questionType: QuestionType;
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
  processedImage: string;
  numberOfCorrect: number;
  numberOfWrong: number;
  answerIndices: number[];
  student: StudentInfo;
};

export type Teacher = {
  username: string;
  email: string;
  password: string;
};

export type QuestionsMostGotRight = {
  index: number;
  studentCount: number;
  correctAnswer: number;
  studentNames: string[];
};

export type QuestionsMostGotWrong = {
  index: number;
  studentCount: number;
  mostPickedAnswer: number;
  correctAnswer: number;
  studentNames: string[];
};

export type Statistics = {
  accuracy: number;
  average: number;
  highest: number;
  lowest: number;
  questionsMostGotRight: QuestionsMostGotRight[];
  questionsMostGotWrong: QuestionsMostGotWrong[];
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
  totalQuestions: number;
  questionType: QuestionType;
  numberOfChoices: number;
  answerIndices: number[];
  createdAt?: string;
  updatedAt?: string;
  points: number;
};

export type FetchedGradeInfo = {
  id: string;
  roll_number: number;
  number_of_correct: number;
  number_of_incorrect: number;
  answer_indices: number[];
  processed_image: string;
};

export type FetchedSingleGrade = {
  id: string;
  processedImage: string;
  numberOfCorrect: number;
  numberOfIncorrect: number;
  answerIndices: number[];
  student: StudentInfo;
  test: {
    answerIndices: number[];
    numberOfChoices: number;
    questionType: QuestionType;
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
