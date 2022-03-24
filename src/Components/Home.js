import React, {useState} from 'react'
import Languages from './Languages'
import './Home.css'
import {Link} from 'react-router-dom'
function Home(props) {
    const [language, setlanguage] = useState([])
    const style={"margin-bottom":"2%"}
    const dataToHome = (data) =>{
        language.unshift(data)
        setlanguage(data)
        // console.log(language)
    }
    props.dataToApp(language)
  return (
    <div className='page' >
        <h3 style={style}>Select any language</h3><br></br>
      <ul class="list-group">
    <Languages name="C" dataToHome={dataToHome}/>
    <Languages name="C++" dataToHome={dataToHome}/>
    <Languages name="Python" dataToHome={dataToHome}/>
    <Languages name="Java" dataToHome={dataToHome}/>
    </ul>
    </div> 
  )
}

export default Home