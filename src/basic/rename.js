import { rename } from 'fs/promises';
import { join } from 'path';
import { sep } from 'path';

export const renameFile = (pathToFile, newFileName) => {
  const path = pathToFile.split(sep).slice(0, -1).join(sep);
  rename(pathToFile, join(path, newFileName));
};
