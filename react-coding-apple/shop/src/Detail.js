import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

let CompBox = styled.div`
  padding : 20px;
`;
let CompH4 = styled.h4`
  font-size: 15px;
  color: ${ props => props.hcolor };
`;

function Detail (props) {

  let [pAlert, editPAlert] = useState(true);
  let history = useHistory();
  let { id } = useParams();
  let [ userInput, editUserInput ] = useState('');

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
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" alt="shoes" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">상품명 : { item.title }</h4>
          <p className='red'> { item.content } </p>
          <p> { item.price } </p>

          <Info inventory={props.inventory}></Info>

          <button className="btn btn-danger" onClick={ () => {
            let cnt = [...props.inventory];
            cnt[0] -= 1;
            props.editInventory(cnt);
          }}>주문하기</button> 
          <button className="btn btn-danger" onClick={ () => {
            history.goBack();      
          }}>뒤로가기</button> 
        </div>
      </div>
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

export default Detail;