import { EOL } from 'os';
// tslint:disable-next-line:no-unused-variable
import { changedPackages, Pkg, Stdio, Commit } from 'northbrook';
import { sequence } from '@typed/sequence';

import { getPackagesToTest } from './getPackagesToTest';
import { runTests } from '../runTests';

export function runChangedPackages(packages: Array<string>, io: Stdio) {
  return changedPackages().then(affectedPackages => {
    const packagesToTest: Array<Pkg> =
      getPackagesToTest(packages, Object.keys(affectedPackages));

    return sequence(packagesToTest, runTests);
  })
  .catch(err => {
    if (err.message.indexOf(`Failed to find any tags`) > -1) {
      io.stdout.write(EOL + `No tests need to be run!` + EOL + EOL);
    } else {
      throw err;
    }
  });
}
