import { EOL } from 'os';
import { Command, EachHandlerOptions, each, Stdio, NorthbrookConfig } from 'northbrook';

import { runTests } from './runTests';

export function addHandler (plugin: Command) {
  each(plugin, (input: EachHandlerOptions, io: Stdio) => {
    const { options, config, pkg } = input;

    require('buba/register');
    require('ts-node');

    requireHooks(options, config);

    io.stdout.write(EOL + `Running mocha tests in ${pkg.name}...` + EOL);

    return runTests(pkg)
      .then(() => {
        io.stdout.write(EOL + `Completed mocha tests in ${pkg.name}` + EOL);
      })
      .catch(() => {
        process.exit(1);
      });
  });
}

function requireHooks(options: any, config: NorthbrookConfig) {
  if (options.require)
    options.require.split(',').map((str: string) => str.trim()).forEach(require);

  const mocha = (config as any).mocha || {};

  if (Array.isArray(mocha.require))
    mocha.require.forEach(require);
}
