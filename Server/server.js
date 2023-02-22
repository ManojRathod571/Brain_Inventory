const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./config/db");
const chats = require("./data");

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

app.get("/chats", (req, res) => {
  try {
    res.send(chats);
  } catch (error) {
    res.send(error);
  }
});

app.get("/chats/:id", (req, res) => {
  const { id } = req.params;
  try {
    let singleChat = chats.find((c) => c._id === id);
    if (singleChat) {
      res.send(singleChat);
    } else {
      res.send("There is no exiting chat");
    }
  } catch (error) {
    res.send(error);
  }
});

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
