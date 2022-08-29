const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials:true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server successfully  started on : ${PORT}`));



mongoose.connect(
  process.env.DB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);


//import routes
const Auth = require("./routes/AuthRoutes");
const product = require("./routes/product.routes");
const userRouter = require("./routes/userRoutes");

//User management routes
app.use("/gym",Auth);

//Store management routes
app.use("/product",product);
app.use("/uploads", express.static("uploads"));

//user routes
app.use("/gym/user",userRouter);
