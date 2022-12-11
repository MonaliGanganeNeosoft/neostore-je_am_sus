const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const controller = require('../controller/empController')
const jwt = require("jsonwebtoken");
const jwtSecret = "wewr32vsdfgswfwr2343ert";
// import {fetch} from '../controller/empController'

// const fs=require('fs')
// router.use(db);
//end
const employeemodel = require('../db/EmployeeSchema')
function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}
const { check, validationResult } = require('express-validator');
router.get("/get",autenticateToken, (req, res) => {
    //  router.use(fetch);
    controller.getPost()
    res.send("ok")
})
router.post("/login", (req, res) => {
    let name = req.body.name;
    let mobile = req.body.mobile;


    let payload = {
        uid: name
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
    res.send({ "err": 0, "msg": "Login Success", "token": token })
    controller.login(name, mobile)
    // res.send("ok")
})
router.post("/post", autenticateToken, [
    check('name').isLength({ min: 3 }),

    check('mobile').isNumeric()
], (req, res) => {
    //  router.use(fetch);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let name = req.body.name;
    let mobile = req.body.mobile

    controller.postdata(name, mobile)
    res.send("ok")
})
router.put("/update/:id",autenticateToken, [
    check('name').isLength({ min: 3 }),

    check('mobile').isNumeric()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let id = req.params.id
    let name = req.body.name
    controller.editdata(id, name)
    res.send("ok")
})
router.delete("/delete/:id", autenticateToken,(req, res) => {
    //  router.use(fetch);
    let id = req.params.id
    controller.deletedata(id)
    res.send("ok")
})




module.exports = router;