var path = require('path')
var northbrook = require('northbrook')
var addPath = require('app-module-path').addPath

addPath(path.join(process.cwd(), 'node_modules'))
if (process.env.NORTHBROOK_EXEC_DIR) {
  addPath(path.join(process.env.NORTHBROOK_EXEC_DIR, 'node_modules'))
}

var args = Array.prototype.slice.call(process.argv)
var coverage = args.indexOf('--coverage') > -1

var nb = northbrook.getConfig()
var config = nb.config
var directory = nb.directory

var mochaConfig = config && config.mocha || {}
var testDirectory = mochaConfig.directory || 'test/'
var requires = mochaConfig.require
  ? '-r ' + mochaConfig.require.join(' -r ')
  : ''

var nyc = path.join(directory, 'node_modules/.bin/nyc')
var mocha = path.join(directory, 'node_modules/.bin/_mocha')

var cmd = coverage
  ? nyc + ' ' + mocha + ' ' + testDirectory + ' ' + requires
  : mocha + ' ' + requires + ' ' + testDirectory

northbrook.execp(cmd)
  .then(function (output) {
    if (output.code === 0) {
      northbrook.log(output.out)
    } else {
      if (output.out) northbrook.log(output.out)
      else northbrook.log(output.err)
    }
  })
