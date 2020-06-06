import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// bg="dark" expand="lg"
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