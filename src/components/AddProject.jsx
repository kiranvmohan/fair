import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../Context/ContextShare';

const AddProject = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("")
  // import state cretaed inside context api
  // useContext() hook is used to access context Api

  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    githubLink: "",
    websiteLink: "",
    overview: "",
    projectImage: ""
  })
  const [preview, setPreview] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleClear = () => {
    setProjectDetails({
      title: "",
      language: "",
      githubLink: "",
      websiteLink: "",
      overview: "",
      projectImage: "",

    })
    setPreview("");
  }


  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }


  })
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  }, [])
  const AddProject = async() => {
    console.log("project details");
    console.log(projectDetails);
    const { title, language, githubLink, websiteLink, overview, projectImage } = projectDetails;
    if (!title || !language || !githubLink || !websiteLink || !overview || !projectImage) {
      toast.warning("please fill the form completely")
    }
    

    else {
      //send data to backend
      // here we have to send a file , so instad of sending as object , we are passing data as formdata
      const reqBody = new FormData();
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("githublink",githubLink)
      reqBody.append("websitelink",websiteLink)
      reqBody.append("overView",overview)
      reqBody.append("projectImage",projectImage)

      const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization" : `Bearer ${token}`
      }
      const result = await addProjectApi(reqBody,reqHeader);
      if(result.status ===201){
        setAddProjectResponse(result.data)
        toast.success(result.data);
        handleClear();
        handleClose();
      }
      else if (result.status === 406)
{
  toast.warning(`${title} already exist , please add a new project `)
}
else{
  toast.error("something happened !!!")
}
      
  }



  }


  return (
    <>

      <button className='btn btn-success' onClick={handleShow}>ADD PROJECT</button>
      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-6'>
              <label htmlFor="projectImg">
                <input type="file" id='projectImg' style={{ display: 'none' }}
                onClick={(e)=>{e.target.value=null}}
                onChange={(e => setProjectDetails({
                  ...projectDetails, projectImage: e.target.files[0]
                }))} />
                <img src={preview ? preview : 'https://img.freepik.com/premium-vector/file-upload-vector-icon-design-illustration_1174953-75051.jpg'} alt="" width={'250px'} style={{ borderRadius: '50%' }} />

              </label>
            </div>
            <div className='col-md-6'>
              <div className='mt-3'>
                <input type="text" placeholder='Project Title' className='form-control bg-light' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                  value={projectDetails.title} />
              </div>
              <div className='mt-3'>
                <input type="text" placeholder='Language' className='form-control bg-light' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}
                  value={projectDetails.language} />
              </div>
              <div className='mt-3'>
                <input type="text" placeholder='Github Link' className='form-control bg-light' onChange={(e) => setProjectDetails({ ...projectDetails, githubLink: e.target.value })}
                  value={projectDetails.githubLink} />
              </div>
              <div className='mt-3'>
                <input type="text" placeholder='Website Link' className='form-control bg-light' onChange={(e) => setProjectDetails({ ...projectDetails, websiteLink: e.target.value })}
                  value={projectDetails.websiteLink} />
              </div>
              <div className='mt-3'>
                <textarea name="" id="" placeholder='Project Overview' className='form-control bg-light' onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                  value={projectDetails.overview}></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            clear
          </Button>
          <Button variant="primary" onClick={AddProject}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />

    </>
  )
}
export default AddProject