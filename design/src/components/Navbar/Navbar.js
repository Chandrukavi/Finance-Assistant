import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='Main-Nav-Container' >
     
      <div className='nav-home'>
       
           <span>Welcome to Finance Aid</span>
         
        </div>
        <div  className='nav-Entery'>
          <Link to="/" className='Link'> 
           <span>User Entry data</span>
          </Link>
        </div>
        <div className='nav-Details'>
          <Link to="/UserDetails" className='Link'> 
           <span>UserDetails</span>
          </Link>
        </div>
    
      
     
    </div>
  )
}

export default Navbar
