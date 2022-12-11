const { postdata, getdata, deletedata, putdata } = require('../controller/empController');
const express = require('express')
const router = express.Router();
router.get("/get", async (req, res) => {
    res.send(await getdata());
})
router.post("/post", (req, res) => {
    postdata(req.body)
    res.send("data added")

})
router.delete("/del/:email", (req, res) => {
    deletedata(req.params.email)
    res.send("data deleted")


})
router.put("/put/:email", (req, res) => {
    putdata(req.params.email, req.body)
    res.send("data updated")


})
module.exports = router;