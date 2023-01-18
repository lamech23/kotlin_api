const users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = ([id,email, ]) => {
  return jwt.sign({ 
    id:id,
    email:email,
   
  
  }, process.env.SECRET, { expiresIn: "3d" });
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(404)
    }
    const user = await users.findOne({ where: { email: email } });

    if (!user) {
      // the reason why throw is being used is because we dont have acces to the json
      res.status(400).json({ error: "invalid  email" });
    }
    // trying to compare the password N/B :user.password is the hased password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ error: "invalid  password" });
    }
    const token = createToken([user.id,user.email])
    res.status(201).json({ 
      id: user.id,
      email: user.email,
      token });
 
  } catch (error) {
  //  json({ error: error.message });
  }
};




const signupUser = async (req, res) => {
  const { email, password,phone,firstName,lastName } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt );
  const checkEmail = await users.findOne({where: {email: email}})
  
 let emailFormart = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 

  try {
    if(emailFormart.test(email)){
      res.status(401)
     }

   if(checkEmail){
      res.status(400)
    }
    
   
    const User = await users.create({
      email,
      password: hash,
      phone,
      firstName,
      lastName
    });

    //create a token
    const token = createToken([User.id,User.email] );
    // res.status(200).json(User)

    // pass the token as a response instead of the user
    res.status(200).json({ 
      id: User.id,
      email: User.email,
      

      token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getSingleUser = async(req, res)=>{
  const {id}=req.params

  try {
    const user =await users.findOne( { where: { id: id}})
  res.status(200).json(user)
  } catch (error) {
  res.status(400).json({error:error,message})
    
  }
}






// reset password 


 
  
module.exports = {
  loginUser,
  signupUser,
  getSingleUser,

};
