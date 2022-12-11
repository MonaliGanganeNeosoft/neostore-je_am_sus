const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
// const fs=require('fs')
//dbconnection 
const db = "mongodb://localhost:27017/pizza";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message);
    }
}
connectDB();
//end
const displaymodel = require('../db/displaySchema')
const ordersmodel = require('../db/OrdersSchema')
const registermodel= require('../db/RegisterSchema')

router.post("/adduser",(req,res)=>{
    console.log(req.body);
    let ins = new registermodel({ name: req.body.name, mobile: req.body.mobile,email:req.body.email,password:req.body.password });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
})
router.get("/verify",(req,res)=>{
    registermodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ 'data': data })
    })
    
})
router.get("/fetchpost", (req, res) => {
    displaymodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ 'data': data })
    })

})

router.get("/fetchorders", (req, res) => {
    ordersmodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ 'data': data })
    })

})
router.post("/addorder", (req, res) => {
    //    console.log()
    // console.log("post called")

    //     console.log(`add post called `);
    console.log(req.body.cart)
    let name = [];
    let price=0;
    for (let i = 0; i < req.body.cart.length; i++) {
             price=price+req.body.cart[i].price;
        if (i != (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name + ",")
            

        }
        else if (i = (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name)
           
        }



    }
    let ins = new ordersmodel({ name: name, card: req.body.card,price:price,user:req.body.user });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
 


})



module.exports = router;