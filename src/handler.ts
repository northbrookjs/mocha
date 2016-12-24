import { Command, HandlerOptions, withCallback, Stdio, NorthbrookConfig } from 'northbrook';

import { runChangedPackages } from './runChangedPackages';
import { executeAllPackages } from './executeAllPackages';

export function addHandler (plugin: Command) {
  withCallback(plugin, (input: HandlerOptions, io: Stdio) => {
    const { options, config } = input;

    require('buba/register');
    require('ts-node');

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
