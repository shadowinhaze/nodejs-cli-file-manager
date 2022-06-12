import { copyFile as cp } from 'fs/promises';
import { sep, join } from 'path';
import { errorResolver } from '../utils/error-resolver.js';

export const copyFile = (filePath, dist) => {
  const fileName = filePath.split(sep).slice(-1)[0];

  cp(filePath, join(dist, fileName)).catch((err) => {
    errorResolver(err);
  });
};
