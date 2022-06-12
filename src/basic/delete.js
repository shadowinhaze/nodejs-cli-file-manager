import { rm } from 'fs/promises';
import { errorResolver } from '../utils/error-resolver.js';

export const deleteFile = (filePath) => {
  rm(filePath).catch((err) => {
    errorResolver(err);
  });
};
