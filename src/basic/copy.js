import { copyFile as cp } from 'fs/promises';
import { sep, join } from 'path';

export const copyFile = (filePath, dist) => {
  const fileName = filePath.split(sep).slice(-1)[0];

  cp(filePath, join(dist, fileName));
};
