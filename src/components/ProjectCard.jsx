import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import mediaPlayer from "../Assets/mediaplayer.png"
import { Link } from 'react-router-dom';
import { base_url } from '../services/base_url';

function ProjectCard ({projectData}){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: '100%' }} className='shadow' onClick={handleShow}>
        <Card.Img variant="top" src={`${base_url}/uploads/${projectData.projectImage}`}  />
        <Card.Body>
          <Card.Title>{projectData.title}</Card.Title>
          <Button variant="danger">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{projectData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Row>
          <Col md={6} lg={6}>
            <img src={`${base_url}/uploads/${projectData.projectImage}`}width={'100%'} />
          </Col>
          <Col md={6} lg={6}>
            <h5>Discription:</h5>
            <p>{projectData.overview}</p>
            <h5>Technologies</h5>
            <p>{projectData.language}</p>
          </Col>
        </Row></Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly'>
          <Link to= {projectData.github} target='_blank'><i class="fa-brands fa-github fa-2x"></i></Link>
          <Link  to = {projectData.website} target='_blank'><i class="fa-solid fa-link fa-2x"></i></Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard