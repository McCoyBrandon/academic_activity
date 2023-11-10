// MongoDB Connections Section
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://projectAdmin:KLUdywBgxnfbjZrP@atlascluster.ysh6jth.mongodb.net/?retryWrites=true&w=majority";
const db = 'Academic_Activity';

const assert = require('assert');

describe('MongoDb Connection test', () => {
    it('connect to MongoDB', (done) => {
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to MongoDB");

            const db = client.db(db);

            client.close();
            done();
        });
    });
});