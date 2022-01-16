// import logo from './logo.svg';
import React, { lazy, useContext, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Detail from './Detail.js';
import Cart from './Cart.js';

// context api
export let inventoryContext = React.createContext();

function App() {

  let [shoes, editShoes] = useState(Data);
  let [inventory, editInventory] = useState([10, 20, 40, 14, 11, 99]);
  
  // const Detail = lazy(() => import('./Detail.js'));

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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      

      {/* 라우팅 - exact 를 추가해 지정된 내용만 보여줌 */}
      <Switch>

        <Route path="/detail/:id">
          <div>상세 페이지</div>

          <inventoryContext.Provider value={inventory}>
            <Detail shoes={shoes} inventory={inventory} editInventory={editInventory}></Detail>
          </inventoryContext.Provider>
          
        </Route>

        <Route path="/cart">
          <Cart></Cart>
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
          
          <div className='container'>

            <inventoryContext.Provider value={inventory}>

            <div className='row'>
            {
              shoes.map((e, idx) => {
                return (
                  <Card imgIdx={idx} shoes={e} key={idx}></Card>
                )
              })
            }
            </div>

            </inventoryContext.Provider>

          </div>
          

          <button className="btn btn-primary" onClick={ () => {
            axios.get('https://codingapple1.github.io/shop/data2.json')
                 .then( (result) => {
                   console.log(result.data);
                  //  editShoes(result.data.concat(shoes));
                   editShoes( [...shoes, ...result.data] );
                 })
                 .catch( () => {
                   console.log('fail...');
                 });
          } }>더보기</button>

        </Route>

        <Route path="/:id">
          <div>id 들어갈때</div>
        </Route>
        
      </Switch>

    </div>
  );
}


function Card(props) {
  let inventory = useContext(inventoryContext);
  let history = useHistory();

  let img = `https://codingapple1.github.io/shop/shoes${props.shoes.id+1}.jpg`;
  return (
    <div className="col-sm-4" onClick={ () => { history.push(`/detail/${props.shoes.id}`) }}>
      <img src={ img } alt="shoes" width="100%" />
        <h4>{ props.shoes.title }</h4>
        <p>{ props.shoes.content } & { props.shoes.price }</p>
        {inventory[props.shoes.id]}
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
