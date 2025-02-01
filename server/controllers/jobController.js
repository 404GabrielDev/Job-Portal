import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Job from '../models/jobModel.js'
export const createJob = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Não autorizado" });
    }

    const {
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
    } = req.body;

    if(!title || !description || !location || !salary || !jobType) {
        return res.status(400).json({message:"Por favor, forneça todos os campos."})
    }
    const job = new Job(
        {
            title,
            description,
            location,
            salary,
            jobType,
            tags,
            skills,
            salaryType,
            negotiable,
            createdBy:user._id
        }
    )

    await job.save()

    return res.status(201).json(job)
  } catch (error) {
    console.log("Erro em criar um trabalho", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});
