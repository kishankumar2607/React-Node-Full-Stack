const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const dbUrl = process.env.URI;
let db;

async function connectDB() {
  try {
    const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

async function initData(sampleData) {
  try {
    await db.collection("issues").insertMany(sampleData);
    console.log("Initialized database with sample data");

    await db.collection("issues").createIndex({ status: 1 });
    await db.collection("issues").createIndex({ owner: 1 });
    await db.collection("issues").createIndex({ created: 1 });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

async function getDbIssueList() {
  const issues = await db.collection("issues").find({}).toArray();
  return issues;
}

async function getNextSequence(docname) {
  const collection = db.collection("counters");

  let counterDoc = await collection.findOne({ name: docname });
  if (!counterDoc) {
    await collection.insertOne({ name: docname, counter: 1 });
    return 1;
  } else {
    const updatedDoc = await collection.findOneAndUpdate(
      { name: docname },
      { $inc: { counter: 1 } },
      { returnDocument: "after" }
    );
    if (!updatedDoc.value) {
      throw new Error("Failed to update counter for " + docname);
    }
    return updatedDoc.value.counter;
  }
}


async function insertDbIssue(issue) {
  console.log("Inserting issue:", issue);
  await db.collection("issues").insertOne(issue);
}

module.exports = {
  connectDB,
  initData,
  getDbIssueList,
  getNextSequence,
  insertDbIssue,
};
