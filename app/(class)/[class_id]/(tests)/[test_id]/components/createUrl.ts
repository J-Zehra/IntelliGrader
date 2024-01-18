/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export

export const createURL = (binaryData: ArrayBuffer) => {
  const bytes = new Uint8Array(binaryData);
  const blob = new Blob([bytes], { type: "image/jpeg" });
  return URL.createObjectURL(blob);
};
