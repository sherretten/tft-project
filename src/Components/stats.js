import React, { Component } from 'react'
import Head from './header';
import Foot from './footer';


class Stats extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      
    }
  }

  render(){
    return(
      <div>
        <Head/>
        Stats
        <Foot/>
      </div>
    );
  }
}

export default Stats;