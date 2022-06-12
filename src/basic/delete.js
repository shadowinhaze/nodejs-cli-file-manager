import { rm } from 'fs/promises';

export const deleteFile = (filePath) => {
  rm(filePath);
};
