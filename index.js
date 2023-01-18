

const express =require ("express");
const db =require( "./config/Database.js");
const cors =require('cors')
require('dotenv').config()
const userRoute =require('./routes/KotlinRoutes')

const app =express()

app.use(cors())

 // middleware to look if the req has some body to it if true passed on to req to the object

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//connection to database

try{
    db.authenticate()
    console.log('database connected');
  app.listen(process.env.PORT, () => 
  console.log('Server running on port',process.env.PORT))
 
}catch(err){
    console.log('Connection error')
}
    // routes
    


app.use('/Kotlin',userRoute);





  












