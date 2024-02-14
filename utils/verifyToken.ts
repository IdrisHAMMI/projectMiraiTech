import jwt  from "jsonwebtoken";

//CHECKS IF THERE IS A TOKEN IN THE BROWSER
export const verifyToken = (req, res, next)=> {
    const token = req.cookies.access_token;
    if(!token)
        return res.status(500).send('tests')
    jwt.verify(token, process.env.JWT_SECRET, (error, user) =>{
        if(error) {
            return res.status(500).send('test')
        } else {
            req.user = user;
        }
        next();
    })
}

//CHECKS IF THE USER IS ADMIN BY CROSSCHECKING THE ID
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            return res.status(403).send('nuh uh')
        }
    })
}

//IF THE USER IS AN ADMIN THEN ALLOW PRIVILEGES
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin){
            next();
        } else {
            return res.status(403).send('nuh uh numba 2');
        }
    })
}