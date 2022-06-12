import { GreetingModuleConstant } from './constants.js';

export const onExitModule = (userName) => {
  console.log(`\n${GreetingModuleConstant.byeText}, ${userName}!`);
};
