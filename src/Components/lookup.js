import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Foot from './footer'
import Head from './header'


class Lookup extends Component {
  
  

  render(){
    return(
      <div>
        <Head/>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Foot/>
      </div>
    );
  }
}

export default Lookup