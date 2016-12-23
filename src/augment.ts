import { NorthbrookConfig } from 'northbrook';

declare module 'northbrook/types/northbrook' {
  export interface NorthbrookConfig {
    mocha?: {
      changed?: Boolean,
      require?: Array<string>,
    };
  }
}
