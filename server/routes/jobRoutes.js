import express from "express";
import {
  createJob,
  getJobs,
  getJobsByUser,
  searchJobs,
  applyJob,
  likeJob,
  getJobById,
  deleteJob,
} from "../controllers/jobController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/jobs", protect, createJob);
router.get("/jobs", getJobs);
router.get("/jobs/user/:id", protect, getJobsByUser);

//pesquisar trabalhos
router.get("/jobs/search", searchJobs);

//aplicar pra trabalhos
router.put('/jobs/apply/:id', protect, applyJob)

//curtir um trabalho e descurtir
router.put('/jobs/like/:id', protect, likeJob)


//get job by id
router.get('/jobs/:id', protect, getJobById)

//deletar emprego
router.delete('/jobs/:id', protect, deleteJob)

export default router;
