import { NorthbrookConfig, northbrook } from 'northbrook';
import { plugin } from '../src';

const config: NorthbrookConfig =
  {
    packages: ['testPackages/**'],
    plugins: [ plugin ],
  };

northbrook(config, [], __dirname).start(['mocha']);
