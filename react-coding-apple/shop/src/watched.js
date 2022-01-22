import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


let WatcheBox = styled.div`
  border: 1px solid black;
  position: fixed;
  right: 0%;
  top: 80%;
  width: 25%;
  height: 18%;
  background-color: green;
`;

function Watched() {
  let [show, setShow] = useState(false);
  let [items, setItems] = useState([]);

  useEffect(() => {
    let itemList = localStorage.getItem('watched');
    if (itemList) {
      itemList = JSON.parse(itemList);
      setShow(true);
      setItems(itemList);
    }
  });

  return (
    <div className='watch'>
      { show === true ? <WatcheBox>watched item { items } </WatcheBox> : null }
    </div>
    
  )
}

export default Watched;