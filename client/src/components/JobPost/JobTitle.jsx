import React, { useState } from 'react'
import UseGlobalContext from '../../context/UseContext'

const JobTitle = () => {
    const {
        handleTitleChange,
        jobTitle,
        activeEmployementTypes,
        setActiveEmployementTypes,
    } = UseGlobalContext();

    const [employementTypes, setEmployementTypes] = useState({
        "Full Time": "",
        "Part Time": "",
        Contract:false,
        Internship:false,
        Temporary:false,
    })

    const handleEmployementTypeChange = (type) => {
        setEmployementTypes((prev) => ({...prev, [type]: !prev[type]}))
    }

  return (
    <div>
      hello world
    </div>
  )
}

export default JobTitle
