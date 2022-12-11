const mongoose = require("mongoose");

const db =
  "mongodb+srv://Monali_Gangane:1234@cluster0.siida.mongodb.net/AmEcom?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log("mongodb connected");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = connectDb;
