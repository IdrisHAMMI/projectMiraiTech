import jwt  from "jsonwebtoken";

export const verifyToken = (req, res, next)=> {
    const token = req.cookies.access_token;
    if(!token)
        return res.status(500).send('test')
    jwt.verify(token, process.env.JWT_SECRET, (error, user) =>{
        if(error) {
            return res.status(500).send('test')
        } else {
            req.user = user;
        }
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            return res.status(403).send('nuh uh')
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin){
            next();
        } else {
            return res.status(403).send('nuh uh numba 2');
        }
    })
}