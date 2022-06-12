import { stdin, stdout, argv, chdir, cwd, exit } from 'process';
import { join, sep, isAbsolute } from 'path';
import { homedir } from 'os';
import { createInterface } from 'readline';
import { greetingModule } from './greeting/hello.js';
import { onExitModule } from './greeting/bye.js';
import {
  MainModuleConstant,
  MainModuleCommand,
  MainModuleError,
} from './constants.js';
import { readdir } from 'fs/promises';
import { getSystemInfo } from './system-info/index.js';
import { calculateHash } from './hash/index.js';
import { zipper } from './compress/index.js';
import { readFromFile } from './basic/read.js';
import { createFile } from './basic/create.js';
import { renameFile } from './basic/rename.js';
import { copyFile } from './basic/copy.js';
import { moveFile } from './basic/move.js';
import { deleteFile } from './basic/delete.js';

const rl = createInterface({
  input: stdin,
  output: stdout,
});

let userName = '';

export const lastStep = () => {
  console.log('**************************');
  console.log(`${MainModuleConstant.lastStepText} ${cwd()}`);
  rl.prompt();
};

const appStart = () => {
  chdir(homedir());
  userName = greetingModule(argv);
  lastStep();
};

const appEnd = () => {
  onExitModule(userName);
  exit();
};

rl.on('close', appEnd);

rl.on('line', (input) => {
  const [command, firstArg, secArg] = input.split(' ');

  const checkIfAbsolute = (path) =>
    isAbsolute(path) ? path : join(cwd(), path);

  let notToPromise = true;

  try {
    switch (command) {
      case MainModuleCommand.close: {
        if (firstArg) throw new Error(MainModuleError.argsWithExit);

        appEnd();
      }

      case MainModuleCommand.up: {
        if (firstArg) throw new Error(MainModuleError.argsWithUp);

        chdir(join(cwd(), '../'));

        break;
      }

      case MainModuleCommand.ls: {
        notToPromise = false;

        if (firstArg) throw new Error(MainModuleError.argsWithLs);

        readdir(join(cwd())).then((data) => {
          console.log(data);
          lastStep();
        });

        break;
      }

      case MainModuleCommand.cd: {
        if (secArg) throw new Error(MainModuleError.cdWithSecArg);

        chdir(checkIfAbsolute(firstArg));

        break;
      }

      case MainModuleCommand.os: {
        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        if (!firstArg.startsWith('--'))
          throw new Error(MainModuleError.invalidInput);

        getSystemInfo(firstArg.slice(2));

        break;
      }

      case MainModuleCommand.hash: {
        notToPromise = false;

        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        calculateHash(checkIfAbsolute(firstArg), lastStep);

        break;
      }

      case MainModuleCommand.zip: {
        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        const dest = secArg ? secArg : cwd();

        const zipName = firstArg.split(sep).slice(-1)[0];

        console.log(zipName);

        zipper(
          MainModuleCommand.zip,
          checkIfAbsolute(firstArg),
          isAbsolute(dest)
            ? join(dest, zipName + '.br')
            : join(cwd(), dest, zipName + '.br'),
          lastStep,
        );

        break;
      }

      case MainModuleCommand.unzip: {
        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        const dest = secArg ? secArg : cwd();

        const fileName = firstArg.split(sep).slice(-1)[0].replaceAll('.br', '');

        zipper(
          MainModuleCommand.unzip,
          checkIfAbsolute(firstArg),
          isAbsolute(dest) ? join(dest, fileName) : join(cwd(), dest, fileName),
          lastStep,
        );

        break;
      }

      case MainModuleCommand.read: {
        notToPromise = false;

        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        readFromFile(checkIfAbsolute(firstArg), lastStep);

        break;
      }

      case MainModuleCommand.add: {
        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        createFile(checkIfAbsolute(firstArg));

        break;
      }

      case MainModuleCommand.rename: {
        if (!firstArg || !secArg) throw new Error(MainModuleError.invalidInput);

        renameFile(checkIfAbsolute(firstArg), secArg);

        break;
      }

      case MainModuleCommand.copy: {
        if (!firstArg || !secArg) throw new Error(MainModuleError.invalidInput);

        copyFile(checkIfAbsolute(firstArg), checkIfAbsolute(secArg));

        break;
      }

      case MainModuleCommand.move: {
        if (!firstArg || !secArg) throw new Error(MainModuleError.invalidInput);

        moveFile(checkIfAbsolute(firstArg), checkIfAbsolute(secArg));

        break;
      }

      case MainModuleCommand.del: {
        if (!firstArg || secArg) throw new Error(MainModuleError.invalidInput);

        deleteFile(checkIfAbsolute(firstArg));

        break;
      }

      default: {
        throw new Error(MainModuleError.invalidOperation);
      }
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    if (notToPromise) lastStep();
    notToPromise = true;
  }
});

appStart();
