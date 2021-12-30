import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  // let posts = '강남 고기 맛집';
  let [title, editTitle] = useState(['남자 코트 추천', '강남 고기 맛집', '숙제검사']);
  let [goodJob, editGoodJob] = useState([0, 0, 0]);
  let [modal, editModal] = useState(false);
  let [selectTitle, editSelectTitle] = useState(0);
  let [iValue, editIValue] = useState('');

  function addTitle() {
    // let newTitle = 'AAA';
    // let d = document.querySelector('.publish input');
    let newTitle = iValue;
    let newData = [...title];
    newData.push(newTitle);
    newData.sort();
    editTitle(newData);
  }

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
  function editGoodJobList(idx) {
    let nData = [...goodJob];
    nData[idx]++;
    editGoodJob(nData) ;
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

      {/* <div className="list">
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
      </div> */}

  
      {
        title.map(function(e, idx) {
          return (
            <div className="list" key={idx}>
              <h3 onClick={ () => { editSelectTitle(idx) } }> { e } <span onClick={ () => { editGoodJobList(idx) } }>👍</span> {goodJob[idx]} </h3>
              <p>2월 17일</p>
              <hr/> 
            </div>
          )
        })
      }

      <div className="publish">
        <input onChange={ (e) => { editIValue(e.target.value) } } />
        <button onClick={ () => { addTitle() }}>저장</button>
      </div>

      {/* {iValue}
      <input onChange={ (e) => { editIValue(e.target.value) } } /> */}

      {
        modal === true
        ? <Modal title={title} selectTitle={selectTitle}></Modal>
        : null

      }
      
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h2>제목 - {props.title[props.selectTitle]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
