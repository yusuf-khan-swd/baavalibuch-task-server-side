const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjl9nwy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const inputDataCollections = client.db("baavalibuch").collection("inputDataCollections");
    const inputActionCollections = client.db("baavalibuch").collection("inputActionCollections");

    app.post("/posts", async (req, res) => {
      const inputData = req.body;
      console.log(inputData);
    });

  } finally {

  }

}

run().catch(console.log);

app.use("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
