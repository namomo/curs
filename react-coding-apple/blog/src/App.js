import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  // let posts = '강남 고기 맛집';
  let [title, editTitle] = useState(['남자 코트 추천', '강남 고기 맛집', '숙제검사']);
  let [goodJob, editGoodJob] = useState(0);
  let [modal, editModal] = useState(false);

  function reEditTitle() {
    let newData = [...title];
    newData[0] = '추가로 여자코트 추천';
    editTitle(newData);
  }
  function sortTitle() {
    let newData = [...title];
    newData.sort();
    editTitle(newData);
  }

  return (
    <div className="App">

      <div className="black-nav">
        <div>개발 blog</div>
      </div>

      <button onClick={ () => editTitle(['여자코트추천', '강남 고기 맛집', '숙제검사']) }>EditTitle-1</button>
      <button onClick={ reEditTitle }>EditTitle-2</button>
      <button onClick={ sortTitle }>SORT</button>
      <button onClick={ ()=>{ editModal(!modal)} }>Modal</button>

      <div className="list">
        <h3> { title[0] } <span onClick={ () => { editGoodJob(goodJob+1) } }>👍</span> {goodJob} </h3>
        <p>2월 17일</p>
        <hr/>
      </div>

      <div className="list">
        <h3> { title[1] } </h3>
        <p>2월 17일</p>
        <hr/>
      </div>

      <div className="list">
        <h3> { title[2] } </h3>
        <p>2월 17일</p>
        <hr/>
      </div>

  

      {
        modal === true
        ? <Modal></Modal>
        : null

      }
      
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
