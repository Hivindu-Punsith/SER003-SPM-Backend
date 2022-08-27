const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

/* Loading the environment variables from the .env file. */
dotenv.config();

//
// ─── SET UP SERVER ──────────────────────────────────────────────────────────────
//

/* Creating an instance of express. */
const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json());

/* middleware that use bodyparser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Setting the port to 5000. */
const PORT = process.env.PORT || 5000;

/* Starting the server on the port 8000. */
app.listen(PORT, () => console.log(`Server successfully  started on : ${PORT}`));


/* Allowing the server to accept requests from the client. */
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

//
// ─── CONNECTION TO MONGODB ─────────────────────────────────────────────────────────
//

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

//
// ─── SET UP ROUTES ──────────────────────────────────────────────────────────────
//

//import routes
const Auth = require("./routes/AuthRoutes");
const product = require("./routes/product.routes");

//User management routes
app.use("/gym",Auth);

//Store management routes
app.use("/product",product);
app.use("/uploads", express.static("uploads"));
