var path = require('path')

var script = 'node ' + path.join(__dirname, 'script.js')

exports.config = {
  scripts: {
    mocha: script,
    coverage: script + ' --coverage'
  }
}
