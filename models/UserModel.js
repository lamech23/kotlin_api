
const {DataTypes }=require('sequelize')
const db =require('../config/Database')

    
const users = db.define('User',{
  
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },

  
},{
    freezeTablesName:true
})

db.sync()
.then(() => {
    
    console.log('users table created successfully!');
 })
 .catch((error) => {
    console.log('Unable to create users table' ,error);
 });
 

module.exports = users;