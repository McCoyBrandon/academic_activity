// MongoDB Connections Section
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://projectAdmin:KLUdywBgxnfbjZrP@atlascluster.ysh6jth.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'Academic_Activity';
const collection = 'Tasks';

// Testing variables
const assert = require('assert');

describe('CRUD operations tests for the Tasks object', () => {
    let db;
    let client;
    let collection;

    before(async () => {
        client = await MongoClient.connect(url, { useUnifiedTopology: true});
        db = client.db(dbName);
        collection = db.collection(collection);
    });

    after(async() => {
        await client.close();
    });

    // Create a task
    it('Create a task within the task collection', async () => {
        const task = {
            taskName: "Create login",
            ownerID: "*MongoDB_ID for the user owner",
            members: [
                { memberID: "_ID of user"},
                { userName: "User name for display"}
            ], 
            userName: "User's username on profile",
            startDate: "10/1/2023",
            completeByDate:"11/30/2023",
            description: "Create a static login page"
        };

        const result = await collection.insertOne(task);
        
        assert.equal(1, result.insertedCount);
        assert.equal(task.taskName, result.ops[0].taskName);
    });

    // Read a task
    it('Find the task created above.', async () => {
        const temp = await collection.find({_ID: result._ID}).toArray();
        assert(temp.length > 0);
    });

    // Update a task
    it('Update a task', async () => {
        const result2 = await collection.updateOne({_ID: result._ID}, {$set: {userName: "mccoybs"}});
        assert.equal("mccoybs", result2.userName);
    });

    // Delete a task
    it('Delete a task', async () => {
        const result3 = await collection.deleteOne({_ID: result._ID});
        assert.equal(1, result3.deletedCount);
    });

});