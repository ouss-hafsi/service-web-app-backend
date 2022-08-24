const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const { requireToken } = require('../middleware/auth');



// const multer = require('multer')

// const storage = multer.memoryStorage()
// const upload = multer({storage:storage});

// // upload.single('picture')
// router.post('/', upload.single('picture'),(req,res) => {
//   console.log(req.body)
//   console.log(req.file)
//   // req.file.buffer
//   res.json({status:'success'});
// })
// Routes

// All employees
router.get("/",  requireToken ,async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// Employee by ID
router.get("/:id",requireToken ,async (req, res, next) => {
  try {
    const employee = await Employee.findById({ _id: req.params.id });
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// Searching for Employee
// router.get("/search/:name", async (req, res, next) => {
//   try {
//     const emploName = req.params.name
//     const findPlant = await Plant.find({ name:{ $regex: plantName, $options:/i/ } })
//     res.json(findPlant)
//   } catch (err) {
//     next(err);
//   }
// });

// Post Employee
router.post("/",requireToken ,async (req, res, next) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.json(newEmployee);
  } catch (err) {
    next(err);
  }
});

// Update Employee
router.put("/:id",requireToken ,async (req, res, next) => {
  try {
    const EmployeeUpdated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (EmployeeUpdated) {
      res.json(EmployeeUpdated);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// Delete Employee
router.delete("/:id",requireToken ,async (req, res, next) => {
  try {
    const deleteEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deleteEmployee) {
      res.json(deleteEmployee);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;