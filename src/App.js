// import React from 'react';
// import Lookup from './Components/lookup'
// import Stats from './Components/stats'
import Player from './Components/player'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
// import fetch from 'node-fetch';

// const server = new URL("http://localhost:5000/api")


// class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       playerInfo: [],
//       isLoaded: false,
//     };
//     this.setPlayerInfo = this.setPlayerInfo.bind(this)
//   }
//   setPlayerInfo = playerInfo => this.setState({ playerInfo: playerInfo })

//   fetchData(){
//     fetch('http://localhost:5000/api?userName=poltsc2')
//     // fetch('http://localhost:5000/api?userName=fasediful')
//       .then((res) => res.json() ) 
//       .then((data) => {
//         console.log(data)
//         this.setState({
//           playerInfo: data,
//           isLoaded: true,
//         })
//       })
//       .catch((error) => console.log(error))
    
//   }
//   componentDidMount(){
//     this.fetchData()
//   }
//   render(){ 
//     return(
//       <div className="App">
//         <Router>
//           <div className="Main">
//             <Route exact path='/'>
//               {this.isLoaded ? <Redirect to="/player" /> : <Lookup setPlayerInfo={this.setPlayerInfo}/>}
//             </Route>
//             <Route path="/player">
//               <Player info={this.state.playerInfo}/>
//             </Route>
//             <Route path="/statistics">
//               <Stats />
//             </Route>
//           </div>
//         </Router>
//       </div>
//       );
//   }
// }





import React from "react";
import { Machine } from "xstate";
import { useMachine } from "xstate/react";

const chart = {
  id: "playerForm",
  initial: "idle",
  states: {
    idle: {
      on: { SUBMIT: "submitting" }
    },
    submitting: {
      on: {
        SUCCEED: "success",
        FAIL: "failure"
      }
    },
    success: {
      on: { RESET: "idle" }
    },
    failure: {
      on: { SUBMIT: "submitting" }
    }
  }
};

const playerFormMachine = Machine(chart);

function PlayerForm() {
  const [userName, setUsername] = React.useState('');
  const [current, send] = useMachine(playerFormMachine);
  const [playerInfo, setPlayerInfo] = React.useState([]);

  React.useEffect(() => {
    console.log(current.value);
  }, [current]);

  const handleSubmit = e => {
    e.preventDefault();

    send("SUBMIT");

    sendRequest({ userName }) //fetch
      .then(response => {
        console.log(response);
        setPlayerInfo(response.json())
        send("SUCCEED")
      })
      .catch(err => {
        send("FAIL")
      })
  }

  const handleChange = e => {
    setUsername(String(e.target.value))
  }


  return (
    <div className="">
      {current.matches("success") ? (
        <Player info={playerInfo} />
      ) : (
        <form onSubmit={handleSubmit}>
          <h4>Enter the username!</h4>

          {current.matches("failure") ? (
            <div className="error_wrap">Incorrect username, please try again</div>
          ) : null}

          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              onChange={handleChange}
              type="text"
            />
          </div>

          <button disabled={current.matches("submitting")} type="submit">
            search
          </button>
        </form>
      )}
    </div>
  );
}


async function sendRequest({ userName }) {
  try{
    let response = await fetch(`http://localhost:5000/api?userName=${userName}`)
    let result = await response.json()
    return result
  } catch(err) {
    await Promise.reject(new Error("Bad username"))
  }
}

export default function App() {
  return (
    <div className="App">
      <PlayerForm />
    </div>
  );
}





// export default App;
