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

const rl = createInterface({
  input: stdin,
  output: stdout,
});

let userName = '';

const lastStep = () => {
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
        if (firstArg) throw new Error(MainModuleError.argsWithLs);

        readdir(join(cwd())).then((data) => {
          console.log(data);
        });

        break;
      }

      case MainModuleCommand.cd: {
        if (secArg) throw new Error(MainModuleError.cdWithSecArg);

        chdir(isAbsolute(firstArg) ? firstArg : join(cwd(), firstArg));

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
        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        calculateHash(
          isAbsolute(firstArg) ? firstArg : join(cwd(), firstArg),
          lastStep,
        );

        break;
      }

      case MainModuleCommand.zip: {
        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        const dest = secArg ? secArg : cwd();

        const zipName = firstArg.split(sep).slice(-1)[0];

        console.log(zipName);

        zipper(
          MainModuleCommand.zip,
          isAbsolute(firstArg) ? firstArg : join(cwd(), firstArg),
          isAbsolute(dest)
            ? join(dest, zipName + '.br')
            : join(cwd(), dest, zipName + '.br'),
        );

        break;
      }

      case MainModuleCommand.unzip: {
        if (!firstArg) throw new Error(MainModuleError.invalidInput);

        const dest = secArg ? secArg : cwd();

        const fileName = firstArg.split(sep).slice(-1)[0].replaceAll('.br', '');

        zipper(
          MainModuleCommand.unzip,
          isAbsolute(firstArg) ? firstArg : join(cwd(), firstArg),
          isAbsolute(dest) ? join(dest, fileName) : join(cwd(), dest, fileName),
        );

        break;
      }

      default: {
        throw new Error(MainModuleError.invalidOperation);
      }
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    lastStep();
  }
});

appStart();
