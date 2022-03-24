import React from 'react'
import Languages from './Languages'
import Cquestions2 from './Cquestionsl2'

function Task() {
  return (
    <div >
      <ul class="list-group"style={{fontSize:"20px",borderWidth:"5px solid",brightness:"80%"}} >
   
    <Languages name="C"/>
    <Languages name="C++"/>
    <Languages name="Python"/>
    <Languages name="Java"/>
    <Cquestions2/>
</ul>
    </div>
    
  )
}

export default Task