import { stdin, stdout, argv, chdir, cwd, exit } from 'process';
import { join } from 'path';
import { homedir } from 'os';
import { createInterface } from 'readline';
import { greetingModule } from './greeting/hello.js';
import { onExitModule } from './greeting/bye.js';
import {
  MainModuleConstant,
  MainModuleCommand,
  MainModuleError,
} from './constants.js';

const rl = createInterface({
  input: stdin,
  output: stdout,
});

let userName = '';

const writeToConsole = (mess) => {
  rl.write(mess);
};

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
  const [command, source, dist] = input.split(' ');

  try {
    switch (command) {
      case MainModuleCommand.close: {
        if (source) throw new Error(MainModuleError.argsWithExit);
        appEnd();
      }

      case MainModuleCommand.up: {
        if (source) throw new Error(MainModuleError.argsWithUp);
        chdir(join(cwd(), '../'));
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
