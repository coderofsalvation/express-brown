// Generated by CoffeeScript 1.9.3
(function() {
  var brown, brownCache, fs;

  fs = require('fs');

  brown = module.exports = require('brown');

  require('brown-ext-basic')(brown);

  brownCache = {};

  brown.merge = function(source, obj, clone) {
    var prop, v;
    if (source === null) {
      return source;
    }
    for (prop in obj) {
      v = obj[prop];
      if (source[prop] !== null && typeof source[prop] === 'object' && typeof obj[prop] === 'object') {
        this.merge(source[prop], obj[prop]);
      } else {
        if (clone) {
          source[prop] = this.clone;
        } else {
          source[prop] = obj[prop];
        }
      }
    }
    return source;
  };

  brown.__express = function(path, options, fn) {
    if (brownCache[path]) {
      return fn(null, brownCache[path]);
    } else {
      return fs.readFile(path, 'utf8', (function(err, file) {
        if (err) {
          return fn(err);
        }
        file = file.replace(/^\uFEFF/, '');
        fn(null, (brownCache[path] = brown.render(file, brown.merge(brown, options))));
      }));
    }
  };

}).call(this);
