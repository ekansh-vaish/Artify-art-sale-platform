const  jwt = require('jsonwebtoken');
require("dotenv").config();

const jwtAuthMiddleware = (req,res,next) =>
{
    const token = req.cookies.token;
if(!token)
    {
      return res.status(401).json({message : "No token found"});  
    }    


try{
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.userId = decoded.id
    next();

}
catch(err)
{
    console.log(err);
    res.status(401).json({error : "Invalid token"});        
}

}

const generateToken = (userData) =>
{
return jwt.sign(userData,process.env.JWT_SECRET)    
}

module.exports = {jwtAuthMiddleware,generateToken}