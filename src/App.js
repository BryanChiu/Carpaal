import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, ButtonGroup, ToggleButton, Table} from 'react-bootstrap';
import {HashRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import './App.css';
import carpaal_logo from './images/carpaal_logo.png'


class CarpaalLogo extends React.Component {
  render() {
    return <span><img src={carpaal_logo} className="logo" alt="carpaal logo" /></span>;
  }
}

class PageOne extends React.Component {
  render() {
  	return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <CarpaalLogo />
          </Row>
        </Container>
      </div>
    );
  }
}


function App() {
  return (
    <PageOne />
  );
}

export default App;
