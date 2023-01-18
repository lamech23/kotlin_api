const users = require("../models/UserModel");
const bcrypt = require("bcrypt");

//rest 
const reset =async(req, res )=>{
    const { password ,confirmPassword} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt );
    const {id}=req.params
    if(password === confirmPassword){
      // res.status(200).json({mssg:'okay'})
    
    }else{
     res.status(400).json({mssg:'Password Dont match'})
  
    }
    try {
      
      const updatedPassword = await users.update({ password:hashedPassword }, { where: { id: id}})
      res.status(200).json( updatedPassword)
  
    } catch (error) {
      // return res.status(400).json({mssg:'no',error})
  
   
    }
  
  
  }

  module.exports={
    reset
  }