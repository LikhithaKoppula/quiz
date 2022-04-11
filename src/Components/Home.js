import React, { useState } from 'react'
import Languages from './Languages'
import './Home.css'
import { Link } from 'react-router-dom'
function Home(props) {
    const [language, setlanguage] = useState([])
    const style = { "margin-bottom": "2%" }
    const dataToHome = (data) => {
        language.unshift(data)
        setlanguage(data)
        // console.log(language)
    }
    props.dataToApp(language)
    return (
        <div className='container'>
            <div  style={{ display: "flex" }}>
               
                 <img src='https://i.pinimg.com/originals/b9/49/c8/b949c86a570df07a7440abe39405834c.gif' style={{ marginTop: "10%",  width: "40% ",  height: "auto"}}></img> 
                 
                <div style={{marginTop: "15%", display: "inline" }} >
                    <h3 style={{textAlign:"center" ,marginBottom:"10%",color:"dodgerblue",}}>Select Any Language</h3>
                    <ul class="list-group" >
                        <Languages name="C" dataToHome={dataToHome} />
                        <Languages name="Cpp" dataToHome={dataToHome} />
                        <Languages name="Python" dataToHome={dataToHome} />
                        <Languages name="java" dataToHome={dataToHome} />
                    </ul>
                </div>
            </div>


        </div>
    )
}

export default Home