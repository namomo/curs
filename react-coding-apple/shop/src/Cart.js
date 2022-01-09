import React from "react";
import { Table } from "react-bootstrap";
import { connect } from 'react-redux';

function Cart(props) {
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
          props.state.map( (e, key) => {
            return (
              <tr key={ key }>
                <td>{ e.id }</td>
                <td>{ e.name }</td>
                <td>{ e.quan }</td>
                <td>
                  <button onClick={ () => { props.dispatch({ type: 'plus' }) } }>+</button>
                  <button onClick={ () => { props.dispatch({ type: 'minus' }) } }>-</button>
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
        props.alert === true
        ? <div className='my-alert2'>
            <p>구매시 20% 할인</p>
            <button onClick={ () => { props.dispatch({ type: 'close' }) } }>닫기</button>
          </div>
        : null
      }
      

    </div>
  );
}

export default connect((state)=>{
  return {
    state: state.reducer,
    alert: state.reducer2
  }
})(Cart);
// function getConnected(state) {
//   return {
//     state: state
//   }
// }
// export default connect(getConnected)(Cart);
// export default Cart;