module.exports = function (wallaby) {
  return {
    files: [
      '!src/**/*.test.ts',
      'src/**/*.ts',
    ],

    tests: [
      'src/**/*.test.ts',
    ],

    testFramework: 'mocha',

    env: { type: 'node' },
  }
}
