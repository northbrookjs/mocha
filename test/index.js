import { describe, it } from 'mocha'
import assert from 'assert'

import { awesome } from '../src/fakeSourceCode'

describe('@northbrook/mocha', () => {
  it('should be awesome', () => {
    assert(awesome)
  })
})
