/* tslint:disable:no-unused-variable */
import { NorthbrookConfig } from 'northbrook';
/* tslint:enable:no-unused-variable */

declare module 'northbrook/types/northbrook' {
  export interface NorthbrookConfig {
    mocha?: {
      changed?: Boolean,
      require?: Array<string>,
    };
  }
}
