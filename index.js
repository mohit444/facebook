const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");

app.use(cors());
app.use(express.json());
dotenv.config();

//Routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connectrd "))
  .catch((err) => console.log("Mongo error occured", err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
