import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Context/ContextShare';

const Header = () => {

  const navigate = useNavigate()

  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const logout = ()=>{
    if(sessionStorage.getItem('token')){
      sessionStorage.removeItem('token')
    }
    if(sessionStorage.getItem("existingUser")){
      sessionStorage.removeItem('existingUser')
    }
    setIsAuthToken(false)
    navigate('/')
  }
  return (
    <>
      <Navbar className="bg-success" style={{ overflow: "hidden" }}>
        <Container>
          <Navbar.Brand>
            <Link to={"/"}>
            <h2 className='text-light'> <i class="fa-brands fa-stack-overflow me-3 text-warning"></i> Project Fair</h2>
            </Link>
          </Navbar.Brand>

          {

            isAuthToken?


             <button className='btn bg-warning text-light' onClick={logout}>LOG OUT <i class="fa-solid fa-power-off "></i></button>
             :<Link to='/login'>
             <button className='btn bg-warning text-light'><i class="fa-solid fa-power-off ">LOGIN</i></button>

             
             </Link>

          }
         
        </Container>
      </Navbar>
    </>
  )
}

export default Header