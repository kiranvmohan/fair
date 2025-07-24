import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { isAuthTokenContext } from '../Context/ContextShare';

const Auth = ({ registerPage }) => {
  const {isAuthToken,setIsAuthToken}= useContext(isAuthTokenContext)


  const isRegisterPage = registerPage ? true : false;

  const navigate = useNavigate();

  // create a state to hold all the input values

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleRegister = async () => {
    console.log("user entered data");
    console.log(userData)
    const { name, email, password } = userData;

    if (!name || !email || !password) {

      toast.warning("please fill the form completely")

    }
    else {
      // call api to register user
      const result = await registerApi(userData)

      if (result.status === 201) {
        toast.success(`${userData.name} successfully registered`);
        setUserData({
          name: "",
          email: "",
          password: ""
        })
        // load login component
        navigate('/login')
      }
      else if (result.status === 409) {
        toast.warning(`${userData.email} already exist,please login`)
      }
      else {
        toast.error("something happened")
      }
    }

  }
  const handleLogin = async () => {
    console.log("Inside handleLogin function");
    const { email, password } = userData;

    console.log(email, password);

    if (!email || !password) {
      toast.warning("please fill the form completely")
    }
    else {
      const result = await loginApi(userData);
      console.log("response from login");
      console.log(result.data);
      
      
      if(result.status === 200){
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.user_data));
        sessionStorage.setItem("token",result.data.jwt_token)
        setIsAuthToken(true)
        

        toast.success("login successfull");
        navigate('/')
      }
      else if(result.status === 406){
        toast.error("email or password mismatch")
      }
      else{
        toast.error("something happened")
      }

    }


  }

  useEffect(() => {
    setUserData({
      name: "",
      email: "",
      password: ""
    })
  }, [registerPage])
  return (

    <>
      <div className='container-fluid m-5'>
        <h5>
          <Link className='text-decoration-none' to={'/'}><i class="fa-solid fa-arrow-left text-warning me-4"></i>BACK TO HOME</Link>
        </h5>
      </div>
      <div className="container-fluid">
        <Row>
          <Col md={5} className='mb-5 ms-5 d-flex justify-content-center align-items-center'>
            <img src='https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg' width={"70%"} />
          </Col>
          <Col md={6}>
            <h3 className='text-center text-light'><i class="fa-brands fa-stack-overflow me-3 text-warning"></i>Project Fair</h3>
            {
              isRegisterPage ?
                <h5 className='text-center mt-2'> SIGNUP TO YOUR  ACCOUNT</h5> :
                <h5 className='text-center mt-2'>SIGNIN TO YOUR ACCOUNT </h5>
            }
            <div className='d-flex flex-column align-items-center' data-bs-theme='dark'>
              {
                isRegisterPage &&
                <input type="text" value={userData.name} className='form-control bg-dark mt-4 w-75' placeholder='NAME'

                  onChange={(e) => setUserData({ ...userData, name: e.target.value })} />

              }




              <input type="text" value={userData.email} className='form-control bg-dark mt-3 w-75' placeholder='E-MAIL ID'
                onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              <input type="text" value={userData.password} className='form-control bg-dark mt-3 w-75' placeholder='PASSWORD'
                onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
              {
                isRegisterPage ?
                  <button className='btn btn-light mt-4 w-75 ' onClick={handleRegister}>REGISTER</button> :

                  <button className='btn btn-light mt-4 w-75 ' onClick={handleLogin}>LOGIN</button>
              }
              <div>
                {
                  isRegisterPage ?
                    <Link to="/login">
                      <p className='text-light mt-4'>Already a User? <span className='text-warning'>LOGIN</span></p>
                    </Link>
                    :
                    <Link to="/register">
                      <p className='text-light mt-4'>Not registered yet <span className='text-warning'>Register</span></p>
                    </Link>


                }

                <ToastContainer />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )

}

export default Auth