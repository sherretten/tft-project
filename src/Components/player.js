import React from 'react'
import Game from './game'
import { Bar } from 'react-chartjs-2'



//This is the main component of the loaded data, takes in the data sent from the API's
function Player(props){
  //Reducing the length of the future lines of code with these
  const games = props.info.gameData 
  const player = [props.info.puuid]
  console.log(props)
  const playerStats = props.info.playerStats[0]

  //Data for the graph, just going through the data and populating it
  let wins = [0,0,0,0,0,0,0,0]
  for( let i = 0; i < games.length; i++){
    for(let j = 0; j < games[i].info.participants.length; j++){
      if(games[i].info.participants[j].puuid === player[0]){
        let placement = games[i].info.participants[j].placement
        placement = placement -1;
        wins[placement] = wins[placement] + 1
      }
    }
  }
//Chart
  const chartData = {
        labels: ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8'],
        datasets:[
          {
            label:'Placements',
            data: wins,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ]
          }
        ],
        options: {
          legend:{
            display: false
          },
          tooltips:{
            callbacks: {
              label: function(tooltipItem){
                return tooltipItem.yLabel
              }
            }
          }
        }
}
  // console.log(wins)
  const icon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${props.info.iconNumber}.jpg`
  return(
    <div>
    <div className="container">
      <div>
        
        <img src={icon} alt="User Icon" className="img-thumbnail" style={{hieght: "105px", width: "105px"}} />
        <h2>{props.info.Name}</h2>
        <h3>{playerStats.tier} {playerStats.rank} {playerStats.leaguePoints} LP</h3>
        <h3>{playerStats.wins} wins {playerStats.losses} losses</h3>
        <div className="d-none d-sm-block"><Bar className="" data={chartData} width={753} height={172}/></div>
      </div>
      
       {games.map((game) => <Game className="mb-3" {...game} {...player} options={{ maintainAspectRatio: false }}/>)}
    </div>
    </div>
  )
}

export default Player;
