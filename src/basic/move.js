import { copyFile, rm } from 'fs/promises';
import { sep, join } from 'path';

export const moveFile = (filePath, dist) => {
  const fileName = filePath.split(sep).slice(-1)[0];

  copyFile(filePath, join(dist, fileName)).then(() => {
    rm(filePath);
  });
};
