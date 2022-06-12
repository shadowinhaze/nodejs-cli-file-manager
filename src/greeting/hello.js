import { GreetingModuleConstant } from './constants.js';

export const greetingModule = (argsFromArgv) => {
  const userNameFromStart = argsFromArgv.slice(2)[0].split('=')[1];

  console.log(`${GreetingModuleConstant.helloText}, ${userNameFromStart}!`);

  return userNameFromStart;
};
