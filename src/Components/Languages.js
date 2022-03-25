import React, {useState} from 'react'
import {Link} from 'react-router-dom'
function Languages(props) {
    const style={"width":"150%",aligntems:"center","margin-bottom":"1%", "border-style":"solid","border-width": " thin medium",marginLeft:"-1%"}
   const clickHandler = () =>{
       props.dataToHome(props.name)
   }
  return (
    <Link to='/display/level1' > 
    <li className="list-group-item" style={style} onClick={clickHandler}>{props.name}</li>
    </Link>
  )
}

export default Languages