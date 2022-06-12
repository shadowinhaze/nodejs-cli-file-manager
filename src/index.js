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

const rl = createInterface({
  input: stdin,
  output: stdout,
});

let userName = '';

const lastStep = () => {
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
  const [command, firstArg, thirdArg] = input.split(' ');

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
        if (thirdArg) throw new Error(MainModuleError.cdWithThirdArg);

        chdir(isAbsolute(firstArg) ? firstArg : join(cwd(), firstArg));

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
