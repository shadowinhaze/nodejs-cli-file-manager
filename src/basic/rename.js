import { rename } from 'fs/promises';
import { join } from 'path';
import { sep } from 'path';
import { errorResolver } from '../utils/error-resolver.js';

export const renameFile = (pathToFile, newFileName) => {
  const path = pathToFile.split(sep).slice(0, -1).join(sep);
  rename(pathToFile, join(path, newFileName)).catch((err) => {
    errorResolver(err);
  });
};
