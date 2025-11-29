const ExpressError = require("../Utils/ExpressError");
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const {generateToken} = require("../Middleware/Authentication");


module.exports.signup = async(req,res,next) =>
{
  const { name,  email, Phone , password,role,  createdAt} = req.body;
  const filename = req.file.filename;
  const url = req.file.path;

  if(!name || !email || !password)
  {
 return next(new ExpressError(400,"All fields are required"));  
  }
  const existingUser = await User.findOne({email});
  if(existingUser)
  {
  res.status(401).json({message : "Incorrect Email and Password"}) ; 
  }

  const hashedpassword = await bcrypt.hash(password,4);

  const registeruser = new User({
   name,
   email,
   Phone,
   createdAt,
   password : hashedpassword,
   image : {url,filename},
   role : role || 'user'
   })

   await registeruser.save();

   
const payload = { 
id : registeruser.id,
email : registeruser.email,
image : registeruser.image
}
const token = generateToken(payload)

   res.status(201).json({message : "Succussfully registered",registeruser,token : token});
} 

module.exports.Login = async(req,res,next) =>
{
const {email,password} = req.body;

try{
const user = await User.findOne({email});
if(!user)
  {
  res.status(401).json({message : "Account is not Registered"});    
  }  
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch)
  {
 next(ExpressError(400,"Invalid Password"));  
  }

  const payload = {
    id : user.id,
    email : user.email,
    image : user.image,
    role : user.role
  }

  const token = generateToken(payload);
  res.cookie("token",token,{
httpOnly : true,
secure : true,
sameSite : "none",
maxAge : 24* 60 * 60 * 1000,
})
 return res.status(201).json({message : "Login Successfully",payload});
}
catch(err)
{
res.status(500).json({message : "Error",err})  
}
}

module.exports.Logout = async(req,res) =>
{
res.clearCookie("token",{
httpOnly : true,
  secure: process.env.NODE_ENV === "production",
sameSite : "none"
})  
res.status(200).json({Message : "Logged Out Successfully"})
}