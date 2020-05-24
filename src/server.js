const express = require('express')
const cors = require('cors')
const app = express()
// var router = express.Router()
// var async = require('express-async-await')
var fetch = require('node-fetch')
const port = 5000


// var corsOptions = {
//   origin: ''
// }
app.use(cors())

app.get('/', (req, res) => {
  res.send("Hello world")
})

app.get('/api', (req, res) => {
  // res.header({'Access-Controll-Allow-Origin': '*'})
  // res.send(`Hello world!`)
  // res.end()
  const baseURL = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/k6331YJSxlZRhcNv9Bo0qn9wj07ZoBuYdohhHL76i5WDFjA?api_key=RGAPI-10cb6f73-1a25-4c91-be48-6b11c15c2515'

  fetch(baseURL)
  .then(res => res.json() )
  .then(data => {
    res.send({ data })
  })

  .catch(err => {
    res.send(`Failed to load Data`)
  })
})


app.listen(port, () => console.log(`Server Running at http://localhost:${port}`))