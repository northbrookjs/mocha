# @northbrook/mocha

> Test your packages with Mocha

Seamless testing with Mocha for Northbrook. Handles TypeScript out-of-box.
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
    changed: true
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
This option is very useful for speeding up CI testing.
