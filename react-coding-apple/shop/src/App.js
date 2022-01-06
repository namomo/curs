// import logo from './logo.svg';
import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';

import Detail from './Detail.js';

function App() {

  let [shoes, editShoes] = useState(Data);

  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shop shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      

      {/* 라우팅 - exact 를 추가해 지정된 내용만 보여줌 */}
      <Switch>

        <Route path="/detail/:id">
          <div>상세 페이지</div>
          <Detail shoes={shoes}></Detail>
        </Route>

        <Route path="/">
          <div>메인 페이지</div>
          {/* Jumbotron 대신 */}
          <div className="background">
            <h1>20% Season Off</h1>
            <p>
              Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </p>
            <p>
              <button variant="primary">Lean more</button>
            </p>
          </div>

          {
            shoes.map((e, idx) => {
              return (
                <Card imgIdx={idx} shoes={e} key={idx}></Card>
              )
            })
          }
        </Route>

        <Route path="/:id">
          <div>id 들어갈때</div>
        </Route>
        
      </Switch>

    </div>
  );
}


function Card(props) {
  let img = `https://codingapple1.github.io/shop/shoes${props.imgIdx+1}.jpg`;
  return (
    <div className="col-md-4">
      <img src={ img } alt="shoes" width="100%" />
        <h4>{ props.shoes.title }</h4>
        <p>{ props.shoes.content } & { props.shoes.price }</p>
    </div>
  )
}

function Product(props) {
  let img = `https://codingapple1.github.io/shop/shoes${props.imgIdx+1}.jpg`;
  return (
    <div className="col-md-4">
      <img src={ img } alt="shoes" width="100%" />
        <h4>{ props.title }</h4>
        <p>{ props.content } & { props.price }</p>
    </div>
  )
}

export default App;
