import React from 'react'

function Next(props) {
    console.log(props.dataToNext)
  return (
      <>
    <div>Next</div>
    <div>This is a {props.dataToNext} quiz</div>
    </>
  )
}

export default Next