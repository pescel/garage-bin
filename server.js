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
  { id: 1, item: 'shag rug', reason: 'maybe it will come back in style', cleanliness: 'dusty' },
  { id: 2, item: 'bike', reason: 'too dirty to store inside', cleanliness: 'rancid' }
]

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/items/:id', (request, response) => {
  const { id } = request.params
  const itemId = app.locals.items.map((item) => {
    if(item.id == id) {
      response.json(item)
    }
  })

  response.json({ id, itemId })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})