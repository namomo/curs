import React, { useState } from 'react';

function Tempo() {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <div>카운트는 {count}</div>
      <button onClick={() => {
        if (count < 3) {
          setAge(age+1);
        }
        setCount(count+1);
        
      }}>누르면한살먹기</button>
    </div>
  )
}

export default Tempo;