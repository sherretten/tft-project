const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
app.use(cors())
var fetch = require('node-fetch')


const port = 5000
const apiKey = process.env.APIKEY 
const count = `?count=10`


app.get('/', (req, res) => {
  res.send("Hello world")
})

app.get('/api', async (req, res) => {
  let name = req.query.userName
  let value = await fetchData(name)
  res.send(value)

})

let fetchData = async (userName) => {
  var playerInfo ={
    Name: String,
    iconNumber: Number,
    previousGames: [],
    gameData: [],
    exncryptedID: String,
    puuid: String,
    playerStats: [],
  }

  let response1 = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${apiKey}`)
  let results1 = await response1.json()
  playerInfo.iconNumber = results1.profileIconId
  playerInfo.Name = results1.name
  playerInfo.puuid = results1.puuid

  let r = await fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${results1.id}?api_key=${apiKey}`)
  playerInfo.playerStats = await r.json();

  let res = await fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${results1.puuid}/ids${count}&api_key=${apiKey}`)
  playerInfo.previousGames = await res.json()
  for( let i = 0; i < playerInfo.previousGames.length; i++ ){
    let response = await fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${playerInfo.previousGames[i]}?api_key=${apiKey}`)
    let game = await response.json()
    playerInfo.gameData.push(game)
    
  }
  return playerInfo
}

app.listen(port, () => console.log(`Server Running at http://localhost:${port}`))