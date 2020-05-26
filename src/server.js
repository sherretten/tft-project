const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
// var router = express.Router()
// var async = require('express-async-await')
var fetch = require('node-fetch')
const port = 5000
const apiKey = `api_key=RGAPI-4cddd09f-0c28-4cfc-811c-7554be391adb`; //Change this once we get dotenv working
const count = `?count=10`

app.get('/', (req, res) => {
  res.send("Hello world")
})

app.get('/api', async (req, res) => {
  // console.log(req.query.userName)
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
  }
  console.log(userName)

  // let puuid = `OhlL3sGdpT6cAg5xwcYwkhdG0or4Kvj8rJEZZ3s4r-_Tw2v04cH8PE-0YpCABPdgcpbpknxI5mv9yA`

  let response1 = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?${apiKey}`)
  let results1 = await response1.json()
  playerInfo.iconNumber = results1.profileIconId
  playerInfo.Name = results1.name
  let res = await fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${results1.puuid}/ids${count}&${apiKey}`)
  playerInfo.previousGames = await res.json()
  for( let i = 0; i < playerInfo.previousGames.length; i++ ){
    let response = await fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${playerInfo.previousGames[i]}?${apiKey}`)
    playerInfo.gameData.push(await response.json())
  }
  return playerInfo
}

app.listen(port, () => console.log(`Server Running at http://localhost:${port}`))
//First fetch to get their exncrypted user name
//   fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerInfo.userName}?${apiKey}`)
//   .then(result => result.json())
//   .then(data => {
//     playerInfo.exncryptedID = data.id
//     playerInfo.iconNumber = data.profileIconId
//     // playerInfo.puuid = data.puuid
//     fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${data.puuid}/ids${count}&${apiKey}`)
//     .then(response => response.json())
//     .then(results => {
//       playerInfo.previousGames.push(results)
//       console.log(playerInfo.previousGames)
//       results.forEach(result => {
//         fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${result}?${apiKey}`)
//         .then(res => res.json())
//         .then(game => {
//           playerInfo.gameData.push(game)
//           // console.log(game)
//           // return playerInfo
//         })
//         // .catch(err => res.send("Failed to load 3rd API call"))
//       })
//     })
//     // .catch(err => res.send("Second api call"))
//     // return playerInfo
//   })
//  .catch(err => console.log(`Failed to load Data`))
//   return playerInfo
//Second fetch getting the recent matches
  // fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${playerInfo.puuid}/ids?count=${count}${apiKey}`)
  // .then( res => res.json())
  // .then(data => {
  //   playerInfo.previousGames = data
  //   res.send(playerInfo)
  // }) 

  //2
  // let puuid = `OhlL3sGdpT6cAg5xwcYwkhdG0or4Kvj8rJEZZ3s4r-_Tw2v04cH8PE-0YpCABPdgcpbpknxI5mv9yA`

  // fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/OhlL3sGdpT6cAg5xwcYwkhdG0or4Kvj8rJEZZ3s4r-_Tw2v04cH8PE-0YpCABPdgcpbpknxI5mv9yA/ids?count=10&${apiKey}`)
  // .then(res => res.json())
  // .then( data => {
  //   playerInfo.previousGames = data
  //   res.send(playerInfo)
  // })

// //Third fetch for getting the data for each of the matches
//   playerInfo.previousGames.map( game => 
//     fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${game}?api_key=${apiKey}`)
//     .then( res => res.json())
//     .then(data => {
//       playerInfo.gameData.push(data)
//       res.send(playerInfo)
//     })
//   )

  // res.send(playerInfo)

 // const baseURL = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/k6331YJSxlZRhcNv9Bo0qn9wj07ZoBuYdohhHL76i5WDFjA?api_key=RGAPI-4cddd09f-0c28-4cfc-811c-7554be391adb'
   // fetch(baseURL)
  // .then(res => res.json() )
  // .then(data => {
  //   res.send({ data })
  // })

  // .catch(err => {
  //   res.send(`Failed to load Data`)
  // })

  // let puuid = `OhlL3sGdpT6cAg5xwcYwkhdG0or4Kvj8rJEZZ3s4r-_Tw2v04cH8PE-0YpCABPdgcpbpknxI5mv9yA`
  // let items = []
  // let gameList =[]
  // fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids${count}&${apiKey}`)
  // .then(res => res.json())
  // .then(data => {
  //   // // res.send(data)
  //   // gameList = data
  //   // gameList.forEach( object  => 
  //   // fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${data[0]}?${apiKey}`))
  //   // .then(res => res.json())
  //   // .then(game => {
  //   //   items.push(game)
  //   //   res.send({items})
  //   // })
  //   data.forEach(game => {
  //     // console.log(game)
  //     fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${game}?${apiKey}`)
  //     .then(res => res.json())
  //     .then(gameData => {
  //       // console.log(gameData)
  //       items.push(gameData)
  //       // console.log({items})
  //       // res.send(gameData)
  //     })
  //     console.log({items})
  //   })

  //     console.log({items})
  // })

  // console.log({items})
  // res.send(items)

