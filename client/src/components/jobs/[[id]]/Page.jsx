import { useParams } from 'react-router-dom'
import UseJobContext from '../../../context/UseJobContext'
import JobCard from '../../jobItem/JobCard'

import React from 'react'

const Page = () => {
  const {jobs} = UseJobContext()

  const params = useParams()
  const {id} = params

  const job = jobs.find((job) => job._id === id)

  if(!job) return <div>Vaga não encontrada</div>

  return (
    <div>
      <div>
        <h1><JobCard activeJob job={job} /></h1>
      </div>
    </div>
  )
}

export default Page
