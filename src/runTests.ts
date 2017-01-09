import { join } from 'path';
import { Pkg } from 'northbrook';
import * as expand from 'glob-expand';
import * as Mocha from 'mocha';

export function runTests(pkg: Pkg, patterns: Array<RegExp | string>) {
  return new Promise((resolve, reject) => {
    const mocha = new Mocha();

    const testFiles: Array<string> =
      expand({ filter: 'isFile', cwd: pkg.path }, patterns);

    testFiles.forEach(file => {
      mocha.addFile(join(pkg.path, file));
    });

    mocha.run(function (failures: number) {
      if (failures > 0) {
        reject(failures);
      }

      resolve();
    });
  });
}
