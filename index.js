const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const connectionCountCollections = client.db("baavalibuch").collection("connectionCountCollections");

    app.post("/posts", async (req, res) => {
      const inputData = req.body;
      const result = await inputDataCollections.insertOne(inputData);
      res.send(result);
    });

    app.put("/connections", async (req, res) => {
      const count = req.body.count;

      const filter = { _id: ObjectId('63c39ee208a5c8c08611a7e6') };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          count: count
        }
      }

      const result = await connectionCountCollections.updateOne(filter, updatedDoc, options);
      res.send(result);
    });

    app.get("/connections", async (req, res) => {
      const query = { _id: ObjectId('63c39ee208a5c8c08611a7e6') };
      const result = await connectionCountCollections.find(query).toArray();
      res.send(result);
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
