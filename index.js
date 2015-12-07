// Generated by CoffeeScript 1.9.3
(function() {
  var brown, brownCache, fs;

  fs = require('fs');

  brown = module.exports = require('brown');

  require('brown-ext-basic')(brown);

  brownCache = {};

  brown.__express = function(path, options, fn) {
    if (brownCache[path]) {
      return fn(null, brownCache[path]);
    } else {
      return fs.readFile(path, 'utf8', (function(err, file) {
        if (err) {
          return fn(err);
        }
        file = file.replace(/^\uFEFF/, '');
        fn(null, (brownCache[path] = brown.render(file, brown)));
      }));
    }
  };

}).call(this);