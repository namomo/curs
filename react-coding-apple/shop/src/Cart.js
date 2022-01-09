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
          </tr>
        </thead>
        <tbody>
        {
          props.state.map( (e, key) => {
            return (
              <tr id={ key }>
                <td>{ e.id }</td>
                <td>{ e.name }</td>
                <td>{ e.quan }</td>
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
    </div>
  );
}

export default connect((state)=>{
  return {
    state: state
  }
})(Cart);
// function getConnected(state) {
//   return {
//     state: state
//   }
// }
// export default connect(getConnected)(Cart);
// export default Cart;