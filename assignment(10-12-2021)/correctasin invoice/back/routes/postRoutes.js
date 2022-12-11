const express = require("express");
const router = express.Router();
const Users = require("../db/Users.js");
const Invoices = require("../db/Invoices.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const nodemailer = require("nodemailer");

router.post("/register", (req, res) => {
    console.log(req.body);
    let uname = req.body.uname;
    let email = req.body.email;
    Users.findOne(
        { $or: [{ uname: uname }, { email: email }] },
        (err, user) => {
            if (user) {
                res.send({ message: "User Already Registered" });
            } else {
                let data = {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    uname: req.body.uname,
                    email: req.body.email,
                    password: req.body.password,
                };
                let ins = new Users(data);
                ins.save((err) => {
                    if (err) {
                        res.send({ flag: 0, message: err });
                    } else {
                        res.send({
                            flag: 1,
                            message: "Successfully registered!!",
                        });
                    }
                });
            }
        }
    );
});

router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    Users.findOne(
        { $or: [{ email: email }, { uname: email }] },
        (err, user) => {
            console.log(user);
            if (user) {
                if (password === user.password) {
                    res.send({
                        flag: 1,
                        message: "Login Success!!",
                        user: user,
                    });
                } else {
                    res.send({ flag: 0, message: "Password not matched" });
                }
            } else {
                res.send({ err: 0, message: "User not registered" });
            }
        }
    );
});

router.post("/addinvoice", (req, res) => {
    let innumber = req.body.innumber;
    Invoices.findOne({ innumber: innumber }, (err, details) => {
        if (details) {
            res.send({ message: "Invoice Number Present" });
        } else {
            let data = {
                innumber: req.body.innumber,
                recname: req.body.recname,
                recaddress: req.body.recaddress,
                recemail: req.body.recemail,
                recmobile: req.body.recmobile,
                indate: req.body.indate,
                duedate: req.body.duedate,
                items: req.body.items,
                total: req.body.total,
                status: req.body.status,
            };
            let ins = new Invoices(data);
            ins.save((err) => {
                if (err) {
                    res.send({ flag: 0, message: err });
                } else {
                    res.send({
                        flag: 1,
                        message: "Invoice Added",
                        invoicenumber: innumber,
                    });
                }
            });
        }
    });
});

router.get("/getinvoice", (req, res) => {
    Invoices.find({}, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

router.post("/sendmail", upload.single("file"), (req, res) => {
    console.log("insendmail");
    console.log(req.file);
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
        user:'monali.gangane1999@gmail.com',
        pass:'Monali@123ss'
    }

    });
    let mailOptions = {
        from:'monali.gangane1999@gmail.com',
        to:'monali.gangane@gmail.com',
        subject: "Invoice Details",
        text: "Invoice Details",
        attachments: [
            {
                filename: "text2.pdf",
                content: req.file.buffer,
            },
        ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});

module.exports = router;
