# ϐrown express 

This lets you use [ϐrown](https://npmjs.org/packages/brown) and Express (at least version 3) together.

## Usage

Javascript:

      var express = require('../node_modules/express');
      var brown = require('../index.coffee');
      var app = new express();

      app.engine('html', brown.__express);
      app.set('view engine', 'html');
      app.set('views', __dirname + "/views");

      brown.data = {
        foo: "hiiiii",
        bar: {
          flop: function(str) {
            return "thats " + str;
          }
        }
      };

      app.get('/', function(req, res) {
        return res.render('index.html', {
          foo: "foo"
        });
      });

      app.listen(3000);

views/index.html:

    <h1>Hello</h1>

    {{data.foo}}

    {{data.bar.flop:nice}}

