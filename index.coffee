fs = require('fs')
brown = module.exports = require('brown')
require('brown-ext-basic')(brown);
brownCache = {}

brown.__express = (path, options, fn) ->
  if brownCache[path] then fn(null, brownCache[path]) else fs.readFile(path, 'utf8', ((err, file) ->
    if err
      return fn(err)
    file = file.replace(/^\uFEFF/, '')
    fn null, (brownCache[path] = brown.render(file,brown))
    return
  ))
