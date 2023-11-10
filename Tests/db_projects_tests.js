// MongoDB Connections Section
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://projectAdmin:KLUdywBgxnfbjZrP@atlascluster.ysh6jth.mongodb.net/?retryWrites=true&w=majority";
const db_name = 'Academic_Activity';
const collection = 'Projects';

// Testing variables
const assert = require('assert');

describe('CRUD operations tests for the Projects object', () => {
    let db;
    let client;
    let collection;

    before(async () => {
        client = await MongoClient.connect(url, { useUnifiedTopology: true});
        db = client.db(dbdb_name);
        collection = db.collection(collection);
    });

    after(async() => {
        await client.close();
    });

    // Create a task
    it('Create a task within the project collection', async () => {
        const project = {
            projectName: "CSCI5003 Group Project",
            ownerID: "*MongoDB_ID for the user owner",
            members: [
                    { memberID: "_ID of user"},
                    { userName: "User name for display"}
                ], 
            description: "Group project for CSCI 5030. Please refer to the README file.",
            name: "CSCI Group Project: Academic Activity",
            taskList: []
        };

        const result = await collection.insertOne(project);
        
        assert.equal(1, result.insertedCount);
        assert.equal(project.taskName, result.ops[0].taskName);
    });

    // Read a project
    it('Find the project created above.', async () => {
        const temp = await collection.find({_ID: result._ID}).toArray();
        assert(temp.length > 0);
    });

    // Update a project
    it('Update a project', async () => {
        const result2 = await collection.updateOne({_ID: result._ID}, {$set: {ownerID: "mccoybs"}});
        assert.equal("mccoybs", result2.ownerID);
    });

    // Delete a project
    it('Delete a project', async () => {
        const result3 = await collection.deleteOne({_ID: result._ID});
        assert.equal(1, result3.deletedCount);
    });

});