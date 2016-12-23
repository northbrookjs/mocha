import { join } from 'path';
import {
  command, Command,
  alias, Alias,
  flag, Flag,
  description, Description,
} from 'northbrook';

import { addHandler } from './handler';

const requireDescription: Description =
  description('Require hooks for Mocha');

const requireFlag: Flag =
  flag('string', alias('require', 'r'), requireDescription);

const changedDescription: Description =
  description('Run tests in only recently changed packages');

const changedFlag: Flag =
  flag('boolean', alias('changed'), changedDescription);

const mochaDescription: Description =
  description('Run package test files with Mocha');

export const plugin: Command =
  command(alias('mocha'), mochaDescription, requireFlag, changedFlag);

addHandler(plugin);
