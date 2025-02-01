import express from 'express'
import {auth} from 'express-openid-connect'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connect from './db/connect.js'
import fs from 'fs'
import { error } from 'console'
import asyncHandler from 'express-async-handler'
import User from './models/userModel.js'

dotenv.config()

const app = express()


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(auth(config))

//function to check if user exist in the db
const enusureUserInDb = asyncHandler(async(user) =>{
    try {
        const existingUser = await User.findOne({auth0Id:user.sub});

        if(!existingUser) {
            //criar um novo documento de usuario
            const newUser = new User({
                auth0Id:user.sub,
                email:user.email,
                name:user.name,
                role:"jobseeker",
                profilePicture:user.picture,
            });

            await newUser.save();

            console.log("Usuario adicionado ao banco de dados", user);
        } else {
            console.log("O usuario já existe", existingUser)
        }
    } catch (error) {
        console.log("Erro ao checar ou adicionar usuario ao DataBase", error.message)
    }
})

app.get('/', async (req, res) => {
    if(req.oidc.isAuthenticated()) {
        //checar se o usuario existe no database
        await enusureUserInDb(req.oidc.user);

        //redirecionar ao frontend
        return res.redirect(process.env.CLIENT_URL)
    } else {
        return res.send("Logged out")
    }
})

//routes
const routeFiles = fs.readdirSync("./routes")

routeFiles.forEach((file) => {
    //import dynamic routes
    import(`./routes/${file}`).then((route) => {
        app.use("/api/v1/", route.default)
    })
    .catch((error) => {
        console.log("Error importing route", error)
    })
})


const server = async() => {
    try {
        await connect();

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Server error", error.message);
        process.exit(1);
    }

}

server()