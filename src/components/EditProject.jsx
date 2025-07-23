import React, { useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editProjectResponseContext } from '../Context/ContextShare';

const EditProject = ({project}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const {editProjectResponse , setEditProjectResponse} = useContext(editProjectResponseContext)
  console.log("edit project details");
  console.log(project);
  const resetForm = () =>{
      setProjectDetails({
        id:project._id,
        title:project.title,
        language:project.language,
        githubLink:project.github,
        websiteLink:project.website,
        overview:project.overview,
        projectImage:""
        })

  setPreview("")

  }


  const handleCloseClear = () =>{
    handleCloseClear = () =>{
      handleClose();
      resetForm();
    }
  }
  
  
  
  return (
    <>
      <i class="fa-solid fa-pen-to-square ms-3 text-danger" onClick={handleShow}></i>
      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Header closeButton>
          <Modal.Title>EDIT PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-6'>
              <label htmlFor="projectImg">
                <input type="file" id='projectImg' style={{ display: 'none' }} />
                <img src="https://img.freepik.com/premium-vector/file-upload-vector-icon-design-illustration_1174953-75051.jpg" alt="" width={'250px'} style={{ borderRadius: '50%' }} />
              </label>
            </div>
            <div className='col-md-6'>
              <div className='mt-3'>
                <input type="text" placeholder='Project Title' className='form-control bg-light' />
              </div>
              <div className='mt-3'>
                <input type="text" placeholder='Technologies Used' className='form-control bg-light' />
              </div>
              <div className='mt-3'>
                <input type="text" placeholder='Github Link' className='form-control bg-light' />
              </div>
              <div className='mt-3'>
                <input type="text" placeholder='Website Link' className='form-control bg-light' />
              </div>
              <div className='mt-3'>
                <textarea name="" id="" placeholder='Project Overview' className='form-control bg-light'></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            RESET
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject