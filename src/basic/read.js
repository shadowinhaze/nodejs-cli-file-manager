import { createReadStream } from 'fs';
import { errorResolver } from '../utils/error-resolver.js';

export const readFromFile = (path, action) => {
  const readStream = createReadStream(path, 'utf-8');
  readStream.on('data', (data) => {
    console.log(data);
    action();
  });

  readStream.on('error', (err) => errorResolver(err));
};
