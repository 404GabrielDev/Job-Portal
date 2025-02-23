import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";

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

    if (!title || !description || !location || !salary || !jobType) {
      return res
        .status(400)
        .json({ message: "Por favor, forneça todos os campos." });
    }
    const job = new Job({
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
      createdBy: user._id,
    });

    await job.save();

    return res.status(201).json(job);
  } catch (error) {
    console.log("Erro em criar um trabalho", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//get jobs
export const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Erro ao acessar os empregos", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

//get jobs by user
export const getJobsByUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    const jobs = await Job.find({ createdBy: user._id }).populate(
      "createdBy",
      "name profilePicture"
    );

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Erro ao encontrar os trabalhos do usuario", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//pesquisar trabalhos
export const searchJobs = asyncHandler(async (req, res) => {
  try {
    const { tags, location, title } = req.query;

    let query = {};

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const jobs = await Job.find(query).populate(
      "createdBy",
      "name profilePicture"
    );

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Erro na pesquisa de trabalhos", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//candidatar pra trabalhos
export const applyJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Trabalho não encontrado" });
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    if (job.applicants.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "Você já se candidatou a esse trabalho" });
    }

    job.applicants.push(user._id);

    await job.save();
    return res.status(200).json(job);
  } catch (error) {
    console.log("Erro em aplicar:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//dar like e deslike em um trabalho
export const likeJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Trabalho não encontrado" });
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    const isLiked = job.likes.includes(user._id);

    if (isLiked) {
      job.likes = job.likes.filter((like) => !like.equals(user._id));
    } else {
      job.likes.push(user._id);
    }

    await job.save();

    return res.status(200).json(job);
  } catch (error) {
    console.log("Erro ao curtir", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

//obter emprego pelo id
export const getJobById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate(
      "createdBy",
      "name profilePicture"
    );

    if (!job) {
      return res.status(404).json({ message: "Emprego não encontrado" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log("Erro em obter emprego pelo Id", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//atualizar uma vaga
export const updateJob = asyncHandler(async (req, res) => {
  console.log("Informações aqui", req.body)
  try {
    const { id } = req.params;
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Vaga não encontrada" });
    }

    if (!job.createdBy.equals(user._id)) {
      return res.status(403).json({ message: "Não autorizado" });
    }

    Object.assign(job, req.body);

    await job.save()
    
    return res.status(200).json(job);
  } catch (error) {
    console.log("Erro ao atualizar a vaga", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

//deletar emprego
export const deleteJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    if (!job) {
      return res.status(404).json({
        message: "emprego não encontrado",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "Usuario não encontrado",
      });
    }

    await job.deleteOne({
      _id: id,
    });

    return res.status(200).json({ message: "Emprego deletado com sucesso!" });
  } catch (error) {
    console.log("Erro ao deletar o emprego", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});
