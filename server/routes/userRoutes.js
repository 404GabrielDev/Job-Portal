import express from 'express'
import { getUserProfile } from '../controllers/userController.js'
import {auth} from 'express-openid-connect'


const router = express.Router()

router.get('/check-auth', (req, res) => {
    if(req.oidc.isAuthenticated()) {
        //return auth status
        return res.status(200).json({
            isAuthenticated:true,
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

router.get('/logout', (req, res) => {
    res.oidc.logout({
        returnTo: process.env.CLIENT_URL, // Redirecionar de volta ao frontend após o login
    });
});

/*router.get('/logout', async (req, res) => {
    try {
        // Pegando o ID Token do usuário autenticado
        const idToken = req.oidc.idToken;

        console.log(idToken)

        if (!idToken) {
            return res.status(400).send("Erro: ID Token não encontrado.");
        }

        const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/oidc/logout?client_id=${process.env.AUTH0_CLIENT_ID}&post_logout_redirect_uri=${process.env.CLIENT_URL}&id_token_hint=${idToken}`;
        
        res.redirect(logoutUrl);
    } catch (error) {
        console.error("Erro ao processar logout:", error);
        res.status(500).send("Erro ao sair da sessão.");
    }
});*/




router.get('/user/:id', getUserProfile);

export default router