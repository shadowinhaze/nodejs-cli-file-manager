import { createReadStream } from 'fs';

export const readFromFile = (path) => {
  const readStream = createReadStream(path, 'utf-8');
  readStream.on('data', (data) => {
    console.log(data);
  });
};
