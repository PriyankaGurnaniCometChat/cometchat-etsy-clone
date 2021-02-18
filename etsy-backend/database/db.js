const Sequelize = require('sequelize')
const db= {}
const sequelize = new Sequelize('ecommerce','root','',{
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    operatorsAliases: false,
    
    pool:{
        max:5,
        min:0,
        acquire:3000,
        idle:1000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db