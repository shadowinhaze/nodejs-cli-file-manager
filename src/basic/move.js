import { copyFile, rm } from 'fs/promises';
import { sep, join } from 'path';
import { errorResolver } from '../utils/error-resolver.js';

export const moveFile = (filePath, dist) => {
  const fileName = filePath.split(sep).slice(-1)[0];

  copyFile(filePath, join(dist, fileName))
    .then(() => {
      rm(filePath);
    })
    .catch((err) => {
      errorResolver(err);
    });
};
