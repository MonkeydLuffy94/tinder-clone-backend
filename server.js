import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";
// app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://tinderadmin:qwerty09876@tinder.wbrgh.mongodb.net/tinderdb?retryWrites=true&w=majority";

// middleware
app.use(express.json());
app.use(Cors());

// db config
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"));
// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
