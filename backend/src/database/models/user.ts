import mongoose, { Schema, Model, mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  
  },
  password: {
    type: String,
  },
});


const userModel = mongoose.model("User", UserSchema);

export default userModel;
