const { required } = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
  name:
  {
  type : String
  } ,
  email :
  {
  type : String
  } ,
  Phone :
  {
  type : Number
  } ,
  password :
  {
  type : String,  
  },
  createdAt :
  {
  type : Date,
  default : Date.now 
  },
  image :
  {
    url : String,
    filename : String
  },
  role : {
   type : String,
   enum : ['admin','user'],
   default : 'user' 
  }
  
}
);

const User = mongoose.model("User",UserSchema);

module.exports = User;