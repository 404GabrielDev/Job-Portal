import './MyJobs.css'
import useJobContext from '../../context/UseJobContext'
import React from 'react'
import UseGlobalContext from '../../context/UseContext'

const MyJobs = () => {

  const{userJobs, jobs} = useJobContext()

  const{globalisAuthenticated, loading, userProfile} = UseGlobalContext()

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export default MyJobs
