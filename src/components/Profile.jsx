import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const Profile = () => {
  const [open, setOpen] = useState(false);
  // cretae a state to store profile details
  const[ profile,setProfile]= useState({
     name: "",
          email: "",
          password: "",
          github :"",
          linkedIn:"",
          profileImage :""

  })
  return (
    <>
      <>
        <div className='d-flex justify-content-between align-items-center p-5 shadow flex-column'>
          <div className='d-flex justify-content-between align-items-center w-100'>
            <h5>MY PROFILE</h5>
            <div>
              <button className='btn btn-success' onClick={() => setOpen(!open)}><i class="fa-solid fa-angle-up"></i></button>
            </div>
          </div>
          <Collapse in={open} className='w-100 p-4'>
            <div>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="profileimg">
                  <input type="file" id='profileimg' style={{display:'none'}}/>
                  <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt="" width={'180px'} height={'180px'} style={{borderRadius:'50%'}} />
                </label>
              </div>
              <div className='mt-4'>
                <input type="text" className='form-control bg-light' placeholder='Github Link' />
              </div>
              <div className='mt-4'>
                <input type="text" className='form-control bg-light' placeholder='Linkdin Link' />
              </div>
              <div className='mt-3'>
                <button className='btn btn-success w-100'>UPDATE PROFILE</button>
              </div>
            </div>
          </Collapse>
        </div>

      </>
    </>
  )
}

export default Profile