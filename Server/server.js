const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./config/db");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("Welcome to the chat app");
  } catch (error) {
    res.send(error);
  }
});

app.use("/api/user", userRoutes);

const port = process.env.PORT || 8282;

app.listen(port, async () => {
  try {
    await connection();
    console.log("Connected to DB");
  } catch (error) {
    console.log("Failed to connect DB");
  }
  console.log(`Listning on the port ${port}`);
});
