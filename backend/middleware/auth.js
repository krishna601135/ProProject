const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginMiddlware = (req, res, next) => {
    const token = req.headers.token
    // console.log(token.split(" ")[1],"token")
    
    if(!token){

        return res.send({
            message:"A token is required for authentication",
            status:400
        })
    }
     try {
        const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN)
         console.log(decoded, "xxxxx")
         req.user = decoded

    }catch(err){
        res.send(`Invalid Token`)
    } 
    return next()   
}

module.exports = loginMiddlware