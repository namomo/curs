import React from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Cart(props) {
  // console.log(`[Cart] -> `, props);

  // redux 에 등록된 state 를 모두 가져옴
  let state = useSelector((state) => state );
  console.log('[Cart] => ', state.reducer);

  let dispatch = useDispatch();

  let history = useHistory();

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
        {
          state.reducer.map( (e, key) => {
            return (
              <tr key={ key }>
                <td>{ e.id }</td>
                <td>{ e.name }</td>
                <td>{ e.quan }</td>
                <td>
                  <button onClick={ () => { dispatch({ type: 'plus', data: e.id }) } }>+</button>
                  <button onClick={ () => { dispatch({ type: 'minus', data: e.id }) } }>-</button>
                </td>
              </tr>
            )
          }) 
        }
          {/* <tr>
            <td>1</td>
            <td> { props.state[0].name } </td>
            <td>Otto</td>
          </tr> */}

        </tbody>
      </Table>

      {
        state.reducer2.alert === true
        ? <div className='my-alert2'>
            <p>구매시 20% 할인</p>
            <button onClick={ () => { dispatch({ type: 'close' }) } }>닫기</button>
          </div>
        : null
      }
      
      <button onClick={ () => { history.goBack() } }>쇼핑계속하기</button>

    </div>
  );
}

// export default connect((state)=>{
//   return {
//     state: state.reducer,
//     alert: state.reducer2
//   }
// })(Cart);
// function getConnected(state) {
//   return {
//     state: state
//   }
// }
// export default connect(getConnected)(Cart);
export default Cart;