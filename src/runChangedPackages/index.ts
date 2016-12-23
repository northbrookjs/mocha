import { EOL } from 'os';
import { changedPackages, Pkg, Stdio } from 'northbrook';
import { sequence } from '@typed/sequence';

import { getPackagesToTest } from './getPackagesToTest';
import { runTests } from '../runTests';

export function runChangedPackages(packages: Array<string>, io: Stdio) {
  changedPackages().then(affectedPackages => {
    const packagesToTest: Array<Pkg> =
      getPackagesToTest(packages, Object.keys(affectedPackages));

    return sequence(packagesToTest, runTests);
  })
  .catch(err => {
    if (err.message.indexOf(`Failed to find any tags`) > -1) {
      io.stdout.write(EOL + `No tests need to be run!` + EOL + EOL);
    }
  });
}
