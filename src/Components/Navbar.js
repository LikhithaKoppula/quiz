import React from 'react'

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-light bg-dark">
  <a className="navbar-brand" href="/" style={{marginLeft:'25px'}}>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDe95utP8JwGPhtE0io_bP60DByyerDFMtGH-iDKjJiYMcw7-aW-muQE9H7FODnxmyKKk&usqp=CAU" style={{borderRadius:'50%', border:'2px solid white'}} width="30" height="30" class="d-inline-block align-top" alt=""/>
   <span style={{color:'white', fontWeight:'bolder', marginLeft:'10px'}} >QUIZ</span>
  </a>
</nav>
    </div>
  )
}

export default Navbar