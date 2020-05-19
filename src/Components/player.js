import React, { Component } from 'react'
import Head from './header';
import Foot from './footer';


class Player extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return(
      <div>
        <Head/>
        Player
        <Foot/>
      </div>
    );
  }
}

export default Player;