import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_SECRET}@quizzer.k78n1l2.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function insertRecord(record, collection, db) {
    try {
        console.log(record);
        console.log(collection);
        console.log(db);
        // Connect to the "insertDB" database and access its "haiku" collection
        const database = client.db(db);
        const collection_ = database.collection(collection);
        const result = await collection_.insertOne(record);
        // Print the ID of the inserted document
        console.log(`A document was inserted with the id: ${result.insertedId}`);
        return {
            db: db,
            collection: collection,
            record: record,
            insertedId: result.insertedId
        };
    } catch (error) {
        console.error("Error during record insertion:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
    finally {
       // Close the MongoDB client connection
        //   await client.close();
    }
  }
// Export the client and run function
export { run, insertRecord };
