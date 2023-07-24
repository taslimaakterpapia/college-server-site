const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Users Management server is runnig')
})

console.log('password', process.env.DB_USER)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1w56ggc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const admissionCollection = client.db('collegeBooking').collection('admissions');
    const allCollegeCollection = client.db('collegeBooking').collection('allCollege');

    app.get('/mycollege', async (req, res) => {

      res.send('hello user....');
    })

    // all colleges
    app.get('/allCollege', async (req, res) => {
      const query = {};
      const result = await allCollegeCollection.find(query).toArray();
      // console.log(result);
      res.send(result);
    })

    // admission 
    app.get('/admissions', async (req, res) => {
      const query = {};
      const result = await admissionCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    })

    app.get('/admissions/:email', async (req, res) => {
      const email = req.params.email;
      console.log('email = ', email);
      const query = { email: email};
      // // // const data = admissionCollection.find({});
      // // // const result = await data.toArray();
      const result = await admissionCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    })

    app.post('/admissions', async (req, res) => {
      const admissionData = req.body;
      const result = await admissionCollection.insertOne(admissionData);
      console.log(result);
      res.send(result);
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`)
})