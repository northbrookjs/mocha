export const defaultTsConfig: any =
  {
    compilerOptions: {
      declaration: true,
      moduleResolution: 'node',
      module: 'commonjs',
      target: 'es5',
      lib: [
        'es5',
        'es2015',
        'es2016',
        'es2017',
      ],
      noImplicitAny: true,
      sourceMap: true,
      noUnusedParameters: true,
      strictNullChecks: true,
      types: [
        'mocha',
        'node',
      ],
    },
    include: [
      '**/*.ts',
    ],
    exclude: [
      'node_modules/**/*.ts',
    ],
  };
