const users = require("../models/UserModel");

const nodemailer =require('nodemailer')



const forgotPassword = async(req,res)=>{
    const { email} = req.body;
    
  
    try {
      if (!email ) {
        res.status(400).json({mssg:'email required'})
      }
        
      const user = await users.findOne({ where: { email: email } });
      if(!user){
        res.status(404).json({msg:'email does not  exists'})
        
      }else{
      //create a nodeMailer Transport
      const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'lamechcruze@gmail.com',
          pass:"fdbmegjxghvigklv"
  
        }
      })
      //email option 
      const mailOption={
        // from:'brian@gmail.com',
        to:`${user.email}`,
        subject:"Reset password link",
        html:'You are reciving this email because you or someone else has requested the reset of password for your account.\n\n'
        +'please click on the following link bellow or paste this link into your browser to complete this proces within an hour of reciving it :\n\n'
        +'<a href="http://localhost:3000/Reset/' + user.id + '">kotlin reset</a> '
        +'if you did not request this please ignore this email and your password will remain the same '
      }
      
  
      // end of else
      
      transporter.sendMail(mailOption,(err ,response)=>{
        if(err){
          console.log('There was an error',err);
        }else{
          console.log('There was a response ',response);
          res.status(200).json('recovery email sent ')
        }
       })
      }
    } catch (error) {
      
    }
  
  }
  module.exports={
    forgotPassword
  }