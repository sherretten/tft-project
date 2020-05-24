import React from 'react';
import Lookup from './Components/lookup'
import Stats from './Components/stats'
import Player from './Components/player'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

const server = new URL("http://localhost:5000/api")


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

  fetchData(){
    fetch('http://localhost:5000/api')
      .then((res) => res.json() ) 
      .then((data) => {
        console.log(data)
        this.setState({
          playerInfo: data,
          isLoaded: true,
        })
      })
      .catch((error) => console.log(error))
    
  }
  componentDidMount(){
    this.fetchData()
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
