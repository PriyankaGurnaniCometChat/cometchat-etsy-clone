const Sequelize = require("sequelize")
const db = require('../database/db')


module.exports = db.sequelize.define(
    'products', {
        id:{
            type:Sequelize.STRING,
            primaryKey:true,
        },
        
        name:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        quantity:{
            type:Sequelize.INTEGER
        },
        price:{
            type:Sequelize.INTEGER
        },
        user:{
            type:Sequelize.STRING
        },
    
    },
    {
        timestamps:false
    }
)



