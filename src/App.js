import React, { useState } from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Next from './Components/Next';
function App() {
  const [language, setlanguage] = useState("")
  const style={"margin-bottom":"2%"}
  const dataToApp = (data) =>{
    setlanguage(data)
    // console.log(language)
  }
  return (
    <div className='App'>
      <h3 style={style}>Select any language</h3>
    <BrowserRouter>
        <Routes>
        <Route exact path="/"  element={<Home dataToApp={dataToApp}/>}></Route>
        <Route path="/display" element={<Next dataToNext={language}/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
