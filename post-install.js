var path = require('path')
var northbrook = require('northbrook')

const NAME = 'mocha'

const CWD = path.join(__dirname, '../../')

if (!process.env.CONTINUOUS_INTEGRATION) {
  northbrook.modifyConfig(function (nb) {
    const config = Object.assign({}, nb)
    var extensions = []

    if (!config.extends) {
      config.extends = NAME
      return config
    }

    if (typeof config.extends === 'string') {
      if (config.extends === NAME) return nb
      extensions.push(config.extends)
    } else if (!Array.isArray(config.extends)) {
      config.extends = extensions
    }

    if (extensions.indexOf(NAME) > -1) return nb
    else config.extends.push(NAME)

    return config
  }, { cwd: CWD, home: false })
}
