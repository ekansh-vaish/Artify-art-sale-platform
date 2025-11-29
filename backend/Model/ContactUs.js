const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
    {
    Username : 
    {
    type : String,    
    },
    Email : 
    {
    type : String,    
    },
    Subject :
    {
    type : String,
    },
    Message : 
    {
    type : String,    
    }
    },

)

const ContactUs = mongoose.model("ContactUs",ContactUsSchema);

module.exports = ContactUs;