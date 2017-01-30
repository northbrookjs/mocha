import { EOL } from 'os';
import { Command, EachHandlerOptions, each, Stdio, NorthbrookConfig } from 'northbrook';

import { runTests } from './runTests';

const defaultPatterns: Array<RegExp | string> =
  [
    /.*\.(spec|test)\.(js|ts)$/,
    /-(spec|test)\.(js|ts)$/,
    /(Spec|Test)\.(js|ts)$/,
    'test/**/*.js',
    'test/**/*.ts',
    'tests/**/*.js',
    'tests/**/*.ts',
    '!lib/**/*.*',
    '!lib.es2015/**/*.*',
    '!node_modules/**/*.*',
  ];

export function addHandler (plugin: Command) {
  each(plugin, (input: EachHandlerOptions, io: Stdio) => {
    const { options, config, pkg } = input;

    const { mocha = {} } = config;

    if (mocha.exclude && mocha.exclude.indexOf(pkg.name) > -1)
      return Promise.resolve();

    require('buba/register');

    requireHooks(options, config);

    io.stdout.write(EOL + `Running mocha tests in ${pkg.name}...` + EOL);

    return runTests(pkg, mocha.patterns || defaultPatterns)
      .then(() => {
        io.stdout.write(EOL + `Completed mocha tests in ${pkg.name}` + EOL);
      })
      .catch((e: any) => {
        io.stderr.write(EOL + e.message + EOL);

        e.diagnostics.forEach((diagnostic: any) => {
          io.stderr.write(EOL + diagnostic.message + EOL);
        })

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
