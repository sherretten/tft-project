import React, { Component } from 'react'
// import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

class Head extends Component{
  render(){
    return(
     <Navbar bg="light" expand="lg">
       <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="./">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default Head;