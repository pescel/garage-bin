const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 8080)
app.locals.title = 'Garage Bin'
app.locals.items = [
  { id: 1, name: 'shag rug', reason: 'maybe it will come back in style', cleanliness: 'dusty' },
  { id: 2, name: 'bike', reason: 'too dirty to store inside', cleanliness: 'rancid' }
]

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/items', (request, response) => {
  const items = app.locals.items
  response.json(items)
})

app.get('/api/items/:id', (request, response) => {
  let { id } = request.params
  let item = app.locals.items.find((item) => {
    return item.id == id
  })

  response.json(item)
})

app.get('/api/items', (request, response) => {
  response.json(app.locals.items)
})

app.post('/api/items', (request, response) => {
  let newItem = request.body
  app.locals.items.push(newItem)
  response.json(newItem)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
