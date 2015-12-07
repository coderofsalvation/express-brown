express = require '../node_modules/express'
brown = require '../index.coffee'

app = new express()
#app.use express.static('view')
app.engine('html', brown.__express)
app.set('view engine', 'html')
app.set('views', __dirname+"/view")

brown.data = 
  foo: "hiiiii"
  bar:
    flop: (str) ->
      "thats "+str 

app.get  '/', (req, res) ->
  res.render 'index.html', { foo:"foo" }


app.listen(3000)
