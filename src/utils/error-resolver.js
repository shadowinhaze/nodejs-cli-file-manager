import { lastStep } from '../index.js';
import { MainModuleError } from '../constants.js';

export const errorResolver = (err) => {
  console.log(MainModuleError.invalidInput, '\nMore about:', err.message);
  lastStep();
};
