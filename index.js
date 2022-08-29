const express = require("express");
const cors = require("cors");
const app = express();









require("./db/connection");
app.set("port", process.env.PORT || 4000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.redirect("/employees");
  });


// Routes
const employeeController = require("./controllers/employeeController");
app.use("/employees", employeeController);

const userController = require("./controllers/userController");
app.use("/users", userController);



// changes
// const imageController = require("./controllers/imageController");
// app.use("/images", imageController);





app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).send(message);
  });
  
  app.listen(app.get("port"), () => {
    console.log(`PORT: ${app.get("port")}`);
  });