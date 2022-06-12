import { createReadStream, createWriteStream } from 'fs';
import { errorResolver } from '../utils/error-resolver.js';

export const zipper = async (mode, source, dist) => {
  const sourceStream = createReadStream(source);
  const distStream = createWriteStream(dist);

  sourceStream.on('error', (err) => errorResolver(err));

  distStream.on('error', (err) => errorResolver(err));

  switch (mode) {
    case 'compress':
      import('zlib')
        .then(({ createBrotliCompress }) => {
          const proc = createBrotliCompress();
          sourceStream.pipe(proc).pipe(distStream);
        })
        .catch((err) => errorResolver(err));
      break;
    case 'decompress':
      import('zlib')
        .then(({ createBrotliDecompress }) => {
          const proc = createBrotliDecompress();
          sourceStream.pipe(proc).pipe(distStream);
        })
        .catch((err) => errorResolver(err));
      break;
  }
};
