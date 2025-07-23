import React, { useEffect, useState } from 'react'
import MyProjext from "../components/MyProjext";
import Profile from "../components/Profile";


const Dashboard = () => {

  const [name, setName] = useState("")

  useEffect(() => {
    setName(JSON.parse(sessionStorage.getItem('existinguser')).name)


  }, [])
  return (
    <>
      <div className='container-fluid'>
        <h4 className='my-4 ms-4 text-light'>WELCOME <span>{name}</span></h4>
        <div className='row'>
          <div className='col-md-8'>
            <MyProjext />
          </div>
          <div className='col-md-4'>
            <Profile />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard