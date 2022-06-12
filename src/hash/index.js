import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export const calculateHash = async (filePath, lastAction) => {
  const stream = createReadStream(filePath);

  stream.on('data', (data) => {
    const hashSum = createHash('sha256');
    hashSum.update(data);
    console.log(hashSum.digest('hex'));
    lastAction();
  });

  stream.on('error', (err) => errorResolver(err));
};
