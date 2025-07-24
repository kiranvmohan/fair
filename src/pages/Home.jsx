import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import firstImage from '../Assets/image1.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectApi } from '../services/allApi'
import { isAuthTokenContext } from '../Context/ContextShare'


function Home() {
    const [isLogin, setIsLogin] = useState(false);
    const [homeProject, setHomeproject] =useState([])
    const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
    const getHomeProject = async()=>{
        const result = await getHomeProjectApi();
        console.log("Home project")
        console.log(result)
        setHomeproject(result.data)
    }
    useEffect(()=>{
        getHomeProject()
    },[])



    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(true)
        }
    })
  return (
    <>
        <div className="container-fluid p-5" style={{width:'100%',height:'100vh'}}>
            <Row className='mt-5'>
                <Col md={6} lg={6} className='d-flex justify-content center align-items-center flex-column'>
                    <div>
                        <h3 className='text-light'>PROJECT FAIR</h3>
                        <h6>One step destination for all software projects</h6>
                        {
                            !isAuthToken?

                            <Link to='/login' style={{textDecoration:'none'}}>
                                <button className='btn btn-outline-light mt-3'>GET STARTED <i class="fa-solid fa-arrow-right ms-2" style={{color:'white'}}></i></button>
                            </Link> 
                            :
                            <Link to='/dashboard' style={{textDecoration:'none'}}>
                                <button className='btn btn-outline-light mt-3'>MANAGE PROJECTS <i class="fa-solid fa-arrow-right ms-2" style={{color:'white'}}></i></button>
                            </Link>
                        }
                    </div>
                </Col>
                <Col md={6} lg={6}>
                    <img src={firstImage} alt="" 
                    width={'75%'}/>
                </Col>
            </Row>
        </div>

        <div className='container-fluid'>
            <h3 className='text-center my-5 text-light'>EXPLORE YOUR PROJECT</h3>
            <div className='row mb-5'>
            <marquee scrollAmount={10}>                {/*marquee   for auto sliding text or images from left to right or right to left */}
                <div className='row'>
                {
                    homeProject?.length> 0 &&
                    homeProject.map(item=>(
                       
                            <div className='col-md-4 col-lg-4 justify-content-center d-flex p-4 gap-3' >
                                <ProjectCard projectData={item}/>
                            </div>
                        
                        
                    ))
                }    
                </div>
            </marquee>

            <Link to='/project' style={{textDecoration:'none'}}>
                <h5 className='text-center text-warning my-5 fw-bold'>SEE MORE PROJECTS</h5>
            </Link>
            </div>
        </div>
    </>
  )
}

export default Home