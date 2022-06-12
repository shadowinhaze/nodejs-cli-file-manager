import { SystemInfoModuleConstant } from './constants.js';
import { homedir, EOL, cpus, userInfo, arch } from 'os';
import { MainModuleError } from '../constants.js';

export const getSystemInfo = (operation) => {
  switch (operation) {
    case SystemInfoModuleConstant.eol: {
      console.log(JSON.stringify(EOL));
      break;
    }

    case SystemInfoModuleConstant.cpus: {
      console.log(
        `- cores amount: ${cpus().length};\n- model: ${
          cpus()[0].model
        };\n- core clocks: ${cpus()
          .map((core, index) => {
            return `\ncore ${index + 1} - ${core.speed / 1000} GHz`;
          })
          .join('')}`,
      );
      break;
    }

    case SystemInfoModuleConstant.homedir: {
      console.log(homedir());
      break;
    }

    case SystemInfoModuleConstant.username: {
      console.log(userInfo().username);
      break;
    }

    case SystemInfoModuleConstant.arch: {
      console.log(arch());
      break;
    }

    default: {
      throw new Error(MainModuleError.invalidOperation);
    }
  }
};
