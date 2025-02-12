import React, {Children, createContext, useContext, useEffect, useState} from "react";
import useGlobalContext from "./UseContext";
import axios from 'axios'
import {toast} from 'react-hot-toast'

const JobsContext = createContext()

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true

export const JobsContextProvider = ({children}) => {
    const {userProfile} = useGlobalContext()

    const [jobs, setJobs] = useState([])
    const[loading, setLoading] = useState(false)
    const [userJobs, setUserJobs] = useState([])


    const getJobs = async () => {
        setLoading(true)

        try {
            const res = await axios.get("/api/v1/jobs")
            setJobs(res.data)
        } catch (error) {
            console.log("Erro ao buscar empregos", error)
        }finally {
            setLoading(false)
        }
    }

    const createJob = async (jobData) => {
        try {
            const res = await axios.post("/api/v1/jobs", jobData)

            toast.success("Trabalho Criado com sucesso!")

            setJobs((prevJobs) => [res.data, ...prevJobs]);

            //atualizar
            if(userProfile._id) {
                setUserJobs((prevUserJobs) => [res.data, ...prevUserJobs])
            }

        } catch (error) {
            console.log("Erro ao criar um emprego", error)
        }
    }

    const getUserJobs = async (userId) => {
        setLoading(true)
        console.log("user id aqui oooooooo", userId)
        try {
            const res = await axios.get("/api/v1/jobs/user/" + userId)

            setUserJobs(res.data)
            

            setLoading(false)
        } catch (error) {
            console.log("Error getting user jobs", error)
        } finally {
            setLoading(false)
        }
    }

    const searchJobs = async (tags, location, title) => {
        setLoading(true)
        try {
            const query = new URLSearchParams()

            if(tags) query.append("tags", tags)
            if(location) query.append("location", location)
            if(title) query.append("title", title)

            //enviar requisição

            const res = await axios.get(`/api/v1/jobs/search?${query.toString()}`)

            //set jobs to the responde data
            setJobs(res.data)
            setLoading(false)
        } catch (error) {
            console.log("Erro ao pesquisar empregos", error)
        } finally {
            setLoading(false)
        }
    }

    //procurar empregos pelo id

    const getJobById = async (id) => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/v1/jobs/${id}`)
            setLoading(false)
            return res.data
        } catch (error) {
            console.log("Erro ao buscar emprego pelo id", error)
        } finally {
            setLoading(false)
        }
    }

    //gostar de um emprego
    const likeJob = async (jobId) => {
        try {
            const res = await axios.put(`/api/v1/jobs/like/${jobId}`)
            toast.success("Emprego favoritado com sucesso!")
            getJobs()
        } catch (error) {
            console.log("Erro ao dar like nesse emprego", error)
        }
    }

    //aplicar pra um emprego
    const applyToJob = async(jobId) => {
        try {
            const res = axios.put(`/api/v1/jobs/apply/${jobId}`)

            toast.success("Aplicado ao emprego com sucesso!")
            getJobs()
        } catch (error) {
            console.log("Erro ao aplicar ao emprego", error)
            toast.error(error.response.data.message)
        }
    }

    //deletar emprego
    const deleteJob = async (jobId) => {
        try {
            await axios.delete(`/api/v1/jobs/${jobId}`)
            setJobs((prevJobs) => prevJobs.filter((job) => job._id !==jobId))
            searchJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId))
            toast.success("Emprego deletado com sucesso!")
            if(userProfile._id) {
                setUserJobs((prevUserJobs) => prevUserJobs.filter((job) => job._id !== jobId))
            }
        } catch (error) {
            console.log("Erro ao deletar o emprego", error)
        }
    }


    useEffect(() => {
        getJobs();
    }, [])

    useEffect(() => {
        if(userProfile._id) {
            getUserJobs(userProfile._id)
        }
    }, [userProfile])


    return <JobsContext.Provider value={{
        jobs,
        loading,
        createJob,
        userJobs,
        getJobById,
        likeJob,
        applyToJob,
        deleteJob,
    }}>{children}</JobsContext.Provider>
}

export {JobsContext};
export default JobsContextProvider;