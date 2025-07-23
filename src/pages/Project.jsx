import React, { useEffect } from 'react'


import { getAllProjectApi } from '../services/allApi'
import Header from '../components/Header'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/Projectcard'

const Project = () => {
  const [allProject, setAllproject] = useState([])
  const [searchKey, setSearchKey] = useState('')

  const [isToken, setIsToken] = useState(false)

  const getAllProject = async () => {

    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      const header = {
        'Content_Type': "application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await getAllProjectApi(searchKey, header)
      console.log("All project")
      console.log(result);
      setAllproject(result.data)

    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  }, [])
  useEffect(() => {
    getAllProject()
  }, [searchKey])

  return (
    <>
      {
        isToken ?
          <div>
            <div className='container-fluid'>
              <h3 className='text-center mt-5 text-warning'>EXPLORE PROJECTS</h3>
            </div>
            <div className='row my-5'>
              <div className='col-md-4'></div>
              <div className='col-md-4 d-flex align-items-center'>
                <input type="text" className='form-control bg-white' placeholder='Search by Technologies' onChange={(e) => setSearchKey(e.target.value)} />
                <i class="fa-solid fa-magnifying-glass text-warning" style={{ margin: '-30px' }}></i>
              </div>
              <div className='col-md-4'></div>
            </div>
            <div className='row my-5'>
              {
                allProject.length > 0 ?
                  allProject.map(item => (
                    <div className='col-md-4 p-3'>
                      <ProjectCard projectData={item} />
                    </div>
                  )) :
                  <p>No project found</p>
              }

            </div>
          </div> :
          <div><p>nothing to display</p>


            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7flifRL3Jm3j6cfHMGtPt07h8RDQeeNJijw&s" alt="" height={'400px'} /><p className='mt-3 mb-3 fs-5 fw-bold'>
            <Link to={'/login'} style={{textDecoration:'none'}}>LOGIN</Link> to VIEW MORE PRODUCTS</p></div>
      }


    </>
  )
}

export default Project