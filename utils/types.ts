/* eslint-disable import/prefer-default-export */

export enum ClassVariant {
  default = "default",
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export type UploadedFile = {
  image: File | null;
  imageUrl: string;
};

export type ClassInfo = {
  course: string;
  section: string;
  year: number;
  subject: string;
};

export type TestInfo = {
  classId: string;
  testName: string;
  totalQuestions: number;
  numberOfChoices: number;
  answerIndices: number[];
  points: number;
};

export type ProcessedImageData = {
  answerIndices: number[];
  processed_image: string;
};

export type Grade = {
  processedImage: string;
  totalQuestions: number;
  totalNumberOfCorrect: number;
  totalNumberOfWrong: number;
  answerIndices: number[];
  gradedAnswerIndices: number[];
};

export type Teacher = {
  username: string;
  email: string;
  password: string;
};

// FETCHED TYPES

export type FetchedClassInfo = {
  id: string;
  course: string;
  section: string;
  year: number;
  subject: string;
};

export type FetchedTestInfo = {
  id: string;
  classId: string;
  testName: string;
  totalQuestions: number;
  numberOfChoices: number;
  answerIndices: number[];
  points: number;
};
