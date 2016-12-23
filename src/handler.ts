import { join } from 'path';
import { Command, HandlerOptions, Pkg, withCallback, Stdio, NorthbrookConfig } from 'northbrook';
import { sequence } from '@typed/sequence';

import { defaultTsConfig } from './defaultTsConfig';
import { runChangedPackages } from './runChangedPackages';
import { executeAllPackages } from './executeAllPackages';
import { runTests } from './runTests';

export function addHandler (plugin: Command) {
  withCallback(plugin, (input: HandlerOptions, io: Stdio) => {
    const { options, config, directory } = input;

    require('buba/register');
    require('ts-node').register(getTsConfig(directory));

    requireHooks(options, config);

    const { changed } = options;
    const { mocha } = config;

    if (changed || mocha && mocha.changed)
      return runChangedPackages(config.packages as Array<string>, io);

    return executeAllPackages(input, io);
  });
}

function requireHooks(options: any, config: NorthbrookConfig) {
  if (options.require)
    options.require.split(',').map((str: string) => str.trim()).forEach(require);

  const mocha = config.mocha || {};

  if (Array.isArray(mocha.require))
    mocha.require.forEach(require);
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
