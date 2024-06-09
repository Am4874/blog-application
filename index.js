const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRoute = require("./routes/user.routes");

const app = express();
const PORT = 8000;

mongoose
  .connect(`mongodb://127.0.0.1:27017/blogify`)
  .then(() => console.log("MongoDB Connected !"))
  .catch((err) => console.error("Error connection to MongoDB: ", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () =>
  console.log(`Server listen port at : http://localhost:${PORT}`)
);
