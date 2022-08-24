const mongoose = require("../db/connection");

const userSchema = new mongoose.Schema(
  {
      username: {
        type: String,
        unique: [true, "Username is taken"],
      },
    email: {
      type: String,
      unique: [true, "Email is in use"],
      required: [true, "Please provide an Email"],
    },
   
    password: {
      type: String,
      minLength: 8,
      required: [true, "Password is required"],
    },
   
  },
  {
    timestamps: true,
    toJSON:{
      virtuals: true,
      //ret is the returned Mongoose document
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
