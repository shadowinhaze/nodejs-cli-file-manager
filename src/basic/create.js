import { writeFile } from 'fs/promises';
import { errorResolver } from '../utils/error-resolver.js';

export const createFile = (path) => {
  writeFile(path, '').catch((err) => {
    errorResolver(err);
  });
};
