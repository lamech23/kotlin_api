const sequelize = require('sequelize')


const db = new sequelize('Kotlin', 'root', '',{
    host:"localhost",
    dialect: "mysql"
});

 
module.exports= db; 