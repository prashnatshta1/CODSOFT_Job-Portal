const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.ne3fe.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

let jobsCollections;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("mernJobPortal");
    jobsCollections = db.collection("demoJobs");
    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

connectDB();

// Routes
app.post("/post-job", async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    const result = await jobsCollections.insertOne(body);
    if (result.insertedId) {
      res.status(201).send(result);
    } else {
      res.status(400).send({ message: "Failed to post job." });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error.", error: err });
  }
});

app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await jobsCollections.find({}).toArray();
    res.status(200).send(jobs);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch jobs.", error: err });
  }
});

app.delete("/job/:id", async(req, res)=> {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)}
  const result = await jobsCollections.deleteOne(filter)
  res.send(result)

})

app.get("/myJobs/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const jobs = await jobsCollections.find({ postedBy: email }).toArray();
    res.status(200).send(jobs);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch jobs.", error: err });
  }
});

// Default Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  process.exit(0);
});
