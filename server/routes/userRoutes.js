import express from 'express'
import { getUserProfile } from '../controllers/userController.js'
import {auth} from 'express-openid-connect'


const router = express.Router()

router.get('/check-auth', (req, res) => {
    if(req.oidc.isAuthenticated()) {
        //return auth status
        return res.status(200).json({
            auth:true,
            user: req.oidc.user
        })
    } else {
        return res.status(200).json({
            isAuthenticated: false
        })
    }
})

router.get('/login', (req, res) => {
    res.oidc.login({
        returnTo: process.env.CLIENT_URL, // Redirecionar de volta ao frontend após o login
    });
});


router.get('/user/:id', getUserProfile);

export default router