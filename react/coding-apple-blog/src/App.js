/* eslint-disable */

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let posts = '강남 고기 맛집';

  let [title, editTitle] = useState(['남자 코트 추천', '강남 우동 맛집']);
  let [good, editGood] = useState(0);

  function editBlogTitle() {
    let newTitle = [...title];
    newTitle[0] = '여자 코트 추천';
    newTitle.sort();
    editTitle(newTitle);
    // editTitle(['여자 코트 추천', '강남 우동 맛집']);
  }
  
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>

      <button onClick={ editBlogTitle }>버튼</button>

      <div className="list">
        <h3> { title[0] } <span onClick={ ()=> { editGood(good+1) } } >👍</span> { good } </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>

      <div className="list">
        <h3> { title[1] } </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>


      <Modal />

    </div>
  );
}


function Modal() {
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날씨</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
