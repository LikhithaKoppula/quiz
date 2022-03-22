import React, {useState} from 'react'
import Languages from './Languages'
import {Link} from 'react-router-dom'
function Home(props) {
    const [language, setlanguage] = useState([])
    const dataToHome = (data) =>{
        language.unshift(data)
        setlanguage(data)
        // console.log(language)
    }
    props.dataToApp(language)
  return (
    <div >
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