const protect = (req, res, next) => {
    if(req.oidc.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({message:"Não autorizado"})
    }
}

export default protect