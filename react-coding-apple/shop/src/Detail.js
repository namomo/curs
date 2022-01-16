import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { inventoryContext } from './App.js';
import { Tabs, Tab, Sonnet } from 'react-bootstrap';
import { connect } from 'react-redux';

let CompBox = styled.div`
  padding : 20px;
`;
let CompH4 = styled.h4`
  font-size: 15px;
  color: ${ props => props.hcolor };
`;

function Detail (props) {

  let detailInventoryContext = useContext(inventoryContext);

  let [pAlert, editPAlert] = useState(true);
  let history = useHistory();
  let { id } = useParams();
  let [userInput, editUserInput] = useState('');
  let [quan, setQuan] = useState(1);

  useEffect( () => {
    let tm = setTimeout(() => {
      console.log('useEffect -> timeout');
      editPAlert(false);
    }, 2000);

    // component 가 unmount 될때 실행이 필요
    return () => {
      clearTimeout(tm);
    }
  });


  let item = props.shoes.find((e) => {
    // console.log(`shoes id[${e.id}] === parameter id[${id}]`);
    if (e.id == id) return true;
  });

  let imgSrc = `https://codingapple1.github.io/shop/shoes${item.id+1}.jpg`;

  return (
    <div className="container">

      <CompBox>
        <CompH4 hcolor={ 'red' }>상품에 관하여</CompH4>
      </CompBox>

      <input onChange={(e) => { editUserInput(e.target.value); console.log(`input -  `+userInput) }}/>

      {
        pAlert === true ? <ProductAlert></ProductAlert> : null
      }
      {/* <div className='my-alert'>
        <p>마감 임박</p>
      </div> */}
      {/* <div className='my-alert2'>
        <p>마감 임박 - 2</p>
      </div>
      <div className='my-alert3'>
        <p>마감 임박 - 3</p>
      </div> */}

      <div className="row">
        <div className="col-md-6">
          <img src={imgSrc} alt="shoes" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">상품명 : { item.title }</h4>
          <p className='red'> { item.content } </p>
          <p> { item.price } </p>

          <Info inventory={props.inventory}></Info>

          <div>
          {detailInventoryContext[id]}
          </div>

          <div>
            { quan } 
            <button onClick={ () => { setQuan(quan+1) } }>+</button>
            <button onClick={ () => { quan > 1 ? setQuan(quan-1) : setQuan(quan) } }>-</button>
          </div>
          

          <button className="btn btn-danger" onClick={ () => {
            // let cnt = [...props.inventory];
            // cnt[0] -= 1;
            // props.editInventory(cnt);
            props.dispatch({ type: 'add', payload: item, quan: quan });
            history.push('/cart');
          }}>주문하기</button> 
          <button className="btn btn-danger" onClick={ () => {
            history.goBack();      
          }}>뒤로가기</button> 
        </div>
      </div>


      {/* tab */}
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
          <div>tab 1 - home</div>
          {/* <Sonnet /> */}
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <div>tab 2 - profile</div>
          {/* <Sonnet /> */}
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <div>tab 3 - contact</div>
          {/* <Sonnet /> */}
        </Tab>
      </Tabs>



    </div> 
  )
}

function ProductAlert() {
  return (
    <div className='my-alert'>
      <p>마감 임박</p>
    </div>
  );
}


function Info(props) {
  return (
    <div>
      <p>재고 : {props.inventory[0]} </p>
    </div>
  )
}

export default connect((state)=>{
  return {
    state: state.reducer
  }
})(Detail);
// export default Detail;