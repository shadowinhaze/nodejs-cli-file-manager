export const MainModuleConstant = {
  lastStepText: 'You are currently in',
};

export const MainModuleCommand = {
  close: '.exit',
  up: 'up',
  ls: 'ls',
  cd: 'cd',
  os: 'os',
  hash: 'hash',
  zip: 'compress',
  unzip: 'decompress',
};

export const MainModuleError = {
  invalidOperation: 'Invalid operation!',
  invalidInput: 'Invalid input!',
  argsWithExit: 'Do not input values to exit command!',
  argsWithUp: 'Do not input values to up command!',
  argsWithLs: 'Do not input values to ls command!',
  cdWithSecArg: 'You must input only one path for cd command!',
};
