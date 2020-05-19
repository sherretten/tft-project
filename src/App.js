import React from 'react';
import Lookup from './Components/lookup'
import Stats from './Components/stats'
import Player from './Components/player'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playerInfo: [],
      isLoaded: false,
    };
    this.setPlayerInfo = this.setPlayerInfo.bind(this)
  }
  setPlayerInfo = playerInfo => this.setState({ playerInfo: playerInfo })

   fetchData(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.results)
      .then((data) => {
        console.log(data)
        this.setState({
          playerInfo: data,
          isLoaded: true,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount(){
    const api_key = `RGAPI-5221c891-7120-4df3-8154-07a2404632a2`
    const url = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/k6331YJSxlZRhcNv9Bo0qn9wj07ZoBuYdohhHL76i5WDFjA?api_key=RGAPI-5221c891-7120-4df3-8154-07a2404632a2"
    this.fetchData(url)
  }
  render(){ 
    return(
      <div className="App">
        <Router>
          <div className="Main">
            <Route exact path='/'>
              <Lookup setPlayerInfo={this.setPlayerInfo}/>
            </Route>
            <Route path="/player">
              <Player info={this.state.playerInfo}/>
            </Route>
            <Route path="/statistics">
              <Stats />
            </Route>
          </div>
        </Router>
      </div>
      );
  }
}

export default App;
