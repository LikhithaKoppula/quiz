import React from 'react'

function Languages(props) {
    const style={"width":"30%","align-items":"center","margin-left":"35%"}
  return (
    <li className="list-group-item" style={style}>{props.name}</li>
  )
}

export default Languages