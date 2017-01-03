import { join } from 'path';
import { Pkg } from 'northbrook';
import * as expand from 'glob-expand';
import * as Mocha from 'mocha';

const defaultPatterns: Array<RegExp | string> =
  [
    /.*\.(spec|test)\.(js|ts)$/,
    /-(spec|test)\.(js|ts)$/,
    /(Spec|Test)\.(js|ts)$/,
    '!node_modules/**/*.*',
  ];

export function runTests(pkg: Pkg) {
  return new Promise((resolve, reject) => {
    console.log('Running tests for ' + pkg.name + '...');

    const mocha = new Mocha();

    const testFiles: Array<string> =
      expand({ filter: 'isFile', cwd: pkg.path }, defaultPatterns);

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
