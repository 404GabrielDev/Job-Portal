import { Link } from "react-router-dom"
import Header from "./components/Header/Header"
import Home from './components/Home/main'
import MyJobs from "./components/MyJobs/MyJobs"
import PostJob from "./components/PostJob/PostJob"
import SearchJobs from "./components/SearchJobs/SearchJobs"
import {Routes, Route} from 'react-router-dom'
import Callback from "./components/Callback/Callback"
function App() {

  return (
    <>
      <Header />
      <Home />
      <Routes>
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/searchjobs" element={<SearchJobs />} />
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </>
  )
}

export default App
