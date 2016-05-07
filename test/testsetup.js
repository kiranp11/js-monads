() => {
  'use strict'
  require('babel-core/register')({
    presets: ['es2015']
  })

  let chai = require("chai")
  global.expect  = chai.expect

  let path = require('path')
  require('app-module-path').addPath(path.join(__dirname, '/../src/'))
}()
