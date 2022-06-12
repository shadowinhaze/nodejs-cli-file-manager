import { createReadStream, createWriteStream } from 'fs';

export const zipper = async (mode, source, dist) => {
  const sourceStream = createReadStream(source);
  const distStream = createWriteStream(dist);

  switch (mode) {
    case 'compress':
      import('zlib').then(({ createBrotliCompress }) => {
        const proc = createBrotliCompress();
        sourceStream.pipe(proc).pipe(distStream);
      });
      break;
    case 'decompress':
      import('zlib').then(({ createBrotliDecompress }) => {
        const proc = createBrotliDecompress();
        sourceStream.pipe(proc).pipe(distStream);
      });
      break;
  }
};
