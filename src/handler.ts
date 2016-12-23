import { join } from 'path';
import { Command, HandlerOptions, Pkg, withCallback, Stdio } from 'northbrook';
import { sequence } from '@typed/sequence';

import { defaultTsConfig } from './defaultTsConfig';
import { runChangedPackages } from './runChangedPackages';
import { executeAllPackages } from './executeAllPackages';
import { runTests } from './runTests';

export function addHandler (plugin: Command) {
  withCallback(plugin, (input: HandlerOptions, io: Stdio) => {
    const { options, config, directory } = input;

    require('ts-node').register(getTsConfig(directory));

    const { changed } = options;
    const { mocha } = config;

    if (changed || mocha && mocha.changed)
      return runChangedPackages(config.packages as Array<string>, io);

    return executeAllPackages(input, io);
  });
}

function getTsConfig (directory: string): any {
  try {
    const tsconfig = require(join(directory, 'tsconfig.json'));

    tsconfig.compilerOptions.module = 'commonjs';

    return tsconfig;
  } catch (e) {
    return defaultTsConfig;
  }
}
