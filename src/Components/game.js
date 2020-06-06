import React from 'react'

const Game = (props) => {

  let queueType = props.info.queue_id
  queueType = (queueType === 1100) ? "Ranked" : "Normal"

  var player = []
  for(let i = 0; i < props.info.participants.length; i++){
    if(props.info.participants[i].puuid === props[0]){
      player = props.info.participants[i]
      break
    }
  }
  let gameLength = props.info.game_length

  const traits = player.traits
  const traitsSrc = "http://raw.communitydragon.org/latest/game/assets/ux/traiticons/trait_icon_"

  const units = player.units
  const unitsSrc = "http://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/"

  return(
    <div className="row border border-secondary mb-3 shadow bg-gray">
      <div className="col-lg-2 summary">
        <h4>Placed: {player.placement}</h4>
        <h5>{queueType}</h5>
        <h5>{Math.trunc(gameLength/60)}:{Math.trunc(gameLength%60)}</h5>
      </div>
      <div className="col-lg-3 traits">
        {traits.map((trait) => (<img className="" data-toggle='tooltip' data-placement='top' title={trait.name} src={`${traitsSrc}${traitName(trait.name)}`} alt={trait.name}/>))}
      </div>
      <div className="col-lg-7 units">
        {units.map((unit) => (<img 
          className="rounded align-middle border border-primary mt-3 ml-1" 
          data-toggle='tooltip' data-placement='top' title={unit.character_id}
          style={{height: "4em", width: "4em"}} 
          src={`${unitsSrc}${unitName(unit.character_id)}`} 
          alt={unit.character_id}
        />))}
      </div>
    </div>

  )
}

function unitName(name){
  if(name.toLowerCase() === "tft3_xerath" )
    return "tft3_xerath.tft3_set3_xerath.png"

  return name.toLowerCase() + ".tft_set3.png"
}

function traitName(name){
  let newName = name.split("_")
  if(newName.length > 1){
    let name = newName[1].toLowerCase()
    if(name === "blademaster" || name === "brawler" || name === "void"|| name === "sorcerer"){
      return name + ".png"
    }
    if(name === "mystic"){
      return "2_" + name + ".png"
    }
    return "3_" + newName[1].toLowerCase() + ".png"
  }
  if(newName[0].toLowerCase() === "templatetrait"){
    return "wild.png"
  }
  return "3_" + newName[0].toLowerCase() + ".png"
}

export default Game;