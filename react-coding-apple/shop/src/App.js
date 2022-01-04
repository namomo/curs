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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      


      {/* 라우팅 - exact 를 추가해 지정된 내용만 보여줌 */}
      <Route exact path="/">
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
      </Route>
      

      <Route path="/detail">

        <Detail></Detail>
        {/* <div>상세 페이지</div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">상품명</h4>
              <p>상품설명</p>
              <p>120000원</p>
              <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>
        </div>  */}
      </Route>


      {/* 공통 */}
      <div className="container">
        <div className="row">

          {/* {
            shoes.map((e, idx) => {
              return (
                <Card imgIdx={idx} shoes={e} key={idx}></Card>
                // <Product imgIdx={idx} title={e.title} content={e.content} price={e.price}></Product>
              )
            })
          } */}

          {/* <Product title={shoes[0].title} content={shoes[0].content} price={shoes[0].price}></Product>
          <Product title={shoes[1].title} content={shoes[1].content} price={shoes[1].price}></Product>
          <Product title={shoes[2].title} content={shoes[2].content} price={shoes[2].price}></Product> */}

          {/* <div className="com-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
              <h4> { shoes[0].title } </h4>
              <p>상품설명 & 가격</p>
          </div>
          <div className="com-md-4">
          <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="100%" />
              <h4>상품명</h4>
              <p>상품설명 & 가격</p>
          </div>
          <div className="com-md-4">
          <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="100%" />
              <h4>상품명</h4>
              <p>상품설명 & 가격</p>
          </div> */}

        </div>
      </div>

    </div>
  );
}


function Card(props) {
  let img = `https://codingapple1.github.io/shop/shoes${props.imgIdx+1}.jpg`;
  return (
    <div className="col-md-4">
      <img src={ img } width="100%" />
        <h4>{ props.shoes.title }</h4>
        <p>{ props.shoes.content } & { props.shoes.price }</p>
    </div>
  )
}

function Product(props) {
  let img = `https://codingapple1.github.io/shop/shoes${props.imgIdx+1}.jpg`;
  return (
    <div className="col-md-4">
      <img src={ img } width="100%" />
        <h4>{ props.title }</h4>
        <p>{ props.content } & { props.price }</p>
    </div>
  )
}

export default App;
