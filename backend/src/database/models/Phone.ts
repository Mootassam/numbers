import mongoose, { Schema, Model, mongo } from "mongoose";

const NumberPhoneSchema = new mongoose.Schema({
  number: {
    type: String,
  },
});

const phoneModel = mongoose.model("NumberPhone", NumberPhoneSchema);

export default phoneModel;
