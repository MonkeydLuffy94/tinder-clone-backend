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
  //   const dbCard = req.body;
  const dbCard = [
    {
      name: "Kajal",
      imgUrl:
        "https://i.pinimg.com/736x/83/af/4f/83af4f76078a188d3b1aa551401b8c76.jpg",
    },
    {
      name: "Shahrukh",
      imgUrl:
        "https://i.pinimg.com/originals/9f/8b/3f/9f8b3f486073f5b29d5d08bcadaf64b1.jpg",
    },
    {
      name: "Martin",
      imgUrl:
        "https://www.scienceabc.com/wp-content/uploads/2016/01/shutterstock_338992685.jpg",
    },
  ];
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
