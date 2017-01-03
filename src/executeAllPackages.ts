import { EOL } from 'os';
import { HandlerOptions, Stdio, Pkg } from 'northbrook';
import { packagesToExecute } from 'northbrook/helpers';
import { sequence } from '@typed/sequence';

import { runTests } from './runTests';

export function executeAllPackages(input: HandlerOptions, mocha: any, io: Stdio) {
  const exclude = mocha && mocha.exclude || [];

  const packages: Array<Pkg> = packagesToExecute(input)
    .filter(pkg => exclude.indexOf(pkg.name) === -1);

  if (packages.length === 0) {
    io.stderr.write(EOL + `No packages could be found` + EOL + EOL);

    return Promise.reject(`No packages could be found`);
  }

  return sequence(packages, runTests);
}
