import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { Link } from 'react-router-dom'
import EditProject from './EditProject'
import { deleteProjectApi, getUserProjectApi } from '../services/allApi'
import Project from '../pages/Project'
import { addProjectResponseContext, editProjectResponseContext } from '../Context/ContextShare'
import { toast } from 'react-toastify'

const MyProjext = () => {

  const [userProject, setUserProject] = useState([])
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext);
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const getUserProject = async () => {
    const token = sessionStorage.getItem('token')

    const requestHeader = {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${token}`
    }
    const result = await getUserProjectApi(requestHeader);
    console.log('User Projects');
    console.log(result.data)
    setUserProject(result.data)
  }
  useEffect(() => {
    getUserProject()
  }, [addProjectResponse, editProjectResponse])


  const handleDelete = async (projectId) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    }
    const result = await deleteProjectApi(projectId, reqHeader)

    if(result.status === 200)
    {
      console.log("delete status");
      console.log(result);
      
      
      toast.success(`${result.data.title}project deleted successfully`)
      getUserProject()
    }
    else{
      toast.warning("something happened")
    }
  }
  return (
    <>
      <div className='shadow p-5 mb-5'>
        <div className='d-flex mt-3'>
          <h5 className='text-success me-auto'>MY PROJECTS</h5>
          <AddProject />
        </div>
        {
          userProject?.length > 0 ?
            userProject.map(item => (<div className='p-3 mt-3 d-flex shadow'>
              <h6>{item.title}</h6>
              <div className='d-flex ms-auto align-items-center'>
                <Link to={item.github} target='_blank' >
                  <i class="fa-brands fa-github"></i>



                </Link>
                <Link to={item.website}>
                  <i class="fa-solid fa-link ms-3"></i>
                </Link>
                <EditProject project={item} />
                <i className="fa-solid fa-trash ms-3" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(item._id)}></i>
              </div>
            </div>

            )) : <p> no project found</p>
        }
      </div>




    </>
  )
}

export default MyProjext