import React from 'react';
import './App.css';
import Task from './components/Task'

function App() {
  const style={"margin-bottom":"2%"}
  return (
    <div className="App" style={{backgroundImage:"url(./image3.jpg)",height:"100%",width:"100%","background-position": "center",
    "background-repeat": "no-repeat",
    "background-size": "cover","border-style":"solid",backgroundRepeat:"no-repeat" ,opacity:"0.6"}}>
      <h3 style={style}>Select any language</h3>

      <Task/>
    </div>
  );
}

export default App;
  