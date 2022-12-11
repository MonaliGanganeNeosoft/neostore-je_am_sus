const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true }
})
module.exports = mongoose.model('emp', empSchema);