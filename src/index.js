import { stdin, stdout, argv, chdir, cwd, exit } from 'process';
import { homedir } from 'os';
import { createInterface } from 'readline';
import { greetingModule } from './greeting/hello.js';
import { onExitModule } from './greeting/bye.js';
import { MainModuleConstant, MainModuleCommand } from './constants.js';

const rl = createInterface({
  input: stdin,
  output: stdout,
});

let userName = '';

const writeToConsole = (mess) => {
  rl.write(mess);
};

const lastStep = () => {
  rl.write(`\n${MainModuleConstant.lastStepText} ${cwd()}\n`);
  rl.prompt();
};

const appStart = () => {
  chdir(homedir());
  userName = greetingModule(argv, writeToConsole);
  lastStep();
};

const appEnd = () => {
  onExitModule(userName, writeToConsole);
  exit(1);
};

rl.on('close', appEnd);

rl.on('line', (input) => {
  if (input.startsWith(MainModuleCommand.close)) {
    appEnd();
  }
});

appStart();
