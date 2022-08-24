const mongoose = require("../db/connection");

const employeeSchema = new mongoose.Schema(
  {
      
      firstname: {
          type: String,
          // required: true,
        },

        lastname: {
            type: String,
            // required: true,
        },

        email: {
          type: String,
          unique: [true, "Email is in use"],
          required: [true, "Please provide an Email"],
        },

        phonenumber: {type: Number, required:true},
        pictureUrl: {type: String} 
  
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
