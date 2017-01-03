# @northbrook/mocha

> Test your packages with Mocha

Seamless testing with Mocha for Northbrook.
Handles TypeScript and ES2015 tests out-of-box.

Requires test files to be named using one of the following patterns:

- `.test.(js|ts)`
- `.spec.(js|ts)`,
- `-test.(js|ts)`,
- `-spec.(js|ts)`
- `Test.(js|ts)`,
- `Spec.(js|ts)`

## Let me have it!
```sh
npm install --save-dev @northbrook/mocha
```

## Usage

### Configuration

```typescript
// northbrook.js
const mocha = require('@northbrook/mocha').plugin;
// northbrook.ts
import { plugin as mocha } from '@nothrbook/mocha';

module.exports = {
  plugins: [ mocha ],

  // 100% optional
  mocha: {
    // Only run tests for the packages that have changed since last release.
    // Is option is very useful for speeding up CI testing.
    changed: true,
    // An array of packages to require before running your tests
    // That would normally be used as `mocha -r _____`
    require: [ 'jsdom-global/register' ],
    // An array of packages you would like to be excluded from test running
    exclude: [ 'name-of-package' ]
  }
}
```

### CLI

```sh
northbrook mocha
```

#### CLI Options

##### **--changed**

Only run tests for the packages that have changed since last release.
This option is very useful for speeding up CI testing for monorepos.

```sh
northbrook mocha --changed
```

##### **--require**

A list of packages, separated by comma, to require before running your tests
That would normally be used as `mocha -r _____`

```sh
northbrook mocha --require jsdom-global/register,buba/register
```