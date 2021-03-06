import Player from './Components/player'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import { error } from 'xstate/lib/actions';
import Head from './Components/header'
import Foot from './Components/footer'

//Basic state diagram idle, submitting/loading, success/failure
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
  //useState Hooks for changing states and info
  const [userName, setUsername] = React.useState('');
  const [current, send] = useMachine(playerFormMachine);
  const [playerInfo, setPlayerInfo] = React.useState([]);

  React.useEffect(() => {
    console.log(current.value);
  }, [current]);

  //On submit function.. Takes the event and 
  const handleSubmit = async e => {
    e.preventDefault();
    //Calling the function defined below
    send("SUBMIT");
    let result = await sendRequest({userName})
    //Error never showed up... spent 4 hours trying to get it to work... never did
    if (result === error){
      send("FAIL")
    } else{
        setPlayerInfo(result)
        send("SUCCEED")
    }
  }

  const handleChange = e => {
    setUsername(String(e.target.value))
  }

  return (
    <div>
      <Head />
    <div className="container">
      {current.matches("success") ? (
          <Player info={playerInfo} />
      ) : (
        <form onSubmit={handleSubmit} className="row">
          {current.matches("failure") ? (
            <div className="error_wrap">Incorrect username, please try again</div>
          ) : null}

          <div className="form-inline mx-auto h-100 pt-4 ">
            <label htmlFor="username"></label>
            <input
              id="username"
              name="username"
              onChange={handleChange}
              type="text"
              placeholder="Seach a Summoner"
              className="form-control mr-sm-2 shadow-sm"
            />
            <button className="btn btn-outline-success my-2 my-sm-0 shadow-sm" disabled={current.matches("submitting")} type="submit">
            search
          </button>
          </div>
        </form>
      )}
    </div>
    <Foot />
    </div>
  );
}

//Calling the backend server with the given username from the form above
async function sendRequest({ userName }) {
  try{
    let response = await fetch(`http://localhost:5000/api?userName=${userName}`)
    let result = await response.json()
    return result
  } catch(err) {
    return err
  }
}
//export default app
export default function App() {
  return (
    <div className="App">
      <PlayerForm />
    </div>
  );
}
