fs = require('fs')
brown = module.exports = require('brown')
require('brown-ext-basic')(brown);
brownCache = {}

brown.merge = (source, obj, clone) ->
  return source if source == null
  for prop of obj
    v = obj[prop]
    if source[prop] != null and typeof source[prop] == 'object' and typeof obj[prop] == 'object'
      @merge source[prop], obj[prop]
    else
      if clone
        source[prop] = @clone
      else
        source[prop] = obj[prop]
  source

brown.__express = (path, options, fn) ->
  if brownCache[path] then fn(null, brownCache[path]) else fs.readFile(path, 'utf8', ((err, file) ->
    if err
      return fn(err)
    file = file.replace(/^\uFEFF/, '')
    fn null, (brownCache[path] = brown.render(file, brown.merge(brown,options) ))
    return
  ))
