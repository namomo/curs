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

  useEffect( () => {
    setTimeout(() => {
      console.log('useEffect -> timeout');
      editPAlert(false);
    }, 2000);
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
          <button className="btn btn-danger">주문하기</button> 
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

export default Detail;