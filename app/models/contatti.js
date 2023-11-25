import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({

  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Contatti =
  mongoose.models.Contatti || mongoose.model("Contatti", contactSchema);

export default Contatti;