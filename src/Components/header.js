import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'

//Header component, use to have a search component, wasn't able to set up given state machine. 
class Head extends Component{
  render(){
    return(
     <Navbar className="navbar navbar-expand-md navbar-dark bg-dark text-light" >
       <div className="container">
       <Navbar.Brand href="/">TFT Analysis</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
      </Navbar.Collapse>
      </div>
    </Navbar>
    );
  }
}

export default Head;