const express = require("express");
const products = express.Router();
const Sequelize = require("sequelize");
const cores = require("cors");
const Product = require('../models/product')


products.post('/product',(req,res) => {
    
    const data = {
        name : req.body.name,
        description : req.body.description,
        quantity:req.body.quantity,
        price:req.body.price,
        user:req.body.user

    }
    Product.create(data).then(product => {
        res.json({success:"product registered"})
    }).catch(err => {
        res.send('error' + err)
    })
   
    })

products.get('/products',(req,res) => {
    Product.findAll().then(product => {
            res.send(product)
        }).catch(err => {
            res.send('error' + err)
        })
    })

products.get('/product/:id',(req,res) => {
    
    Product.findOne({ where: { id: req.params.id } }).then(product=>{
            res.send(product)
            }).catch(err =>{
                res.send('error'+ err)
            })
        })

module.exports = products;
