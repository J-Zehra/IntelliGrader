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
