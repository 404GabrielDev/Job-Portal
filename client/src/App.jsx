import { Link } from "react-router-dom"
import Header from "./components/Header/Header"
import Home from './components/Home/main'
import MyJobs from "./components/MyJobs/MyJobs"
import SearchJobs from "./components/SearchJobs/SearchJobs"
import {Routes, Route} from 'react-router-dom'
import Callback from "./components/Callback/Callback"
import JobForm from "./components/JobPost/JobForm"
import { Toaster } from "react-hot-toast"
import Page from './components/jobs/[[id]]/Page'
function App() {

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <Header />
      <Routes>
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/jobs/:id" element={<Page />} />
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/post" element={<JobForm />} />
      </Routes>
    </>
  )
}

export default App
