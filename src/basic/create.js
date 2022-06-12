import { writeFile } from 'fs/promises';

export const createFile = (path) => {
  writeFile(path, '');
};
