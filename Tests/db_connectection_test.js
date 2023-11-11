// MongoDB Connections Section
const MongoClient = require('mongodb');
const url = "mongodb+srv://projectAdmin:KLUdywBgxnfbjZrP@atlascluster.ysh6jth.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'Academic_Activity';

describe('MongoDb Connection test', () => {
    let connection;
    let db;

    beforeAll(async() => {
        connection = await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology,});
        db = await connection.db(dbName);
    });

    afterall(async() => {
        await connection.close();
    });


    it('connect to MongoDB', async () => {
        const collections = await db.listCollections().toArray();
        expect(collections).toBeInstanceOf(Array);
    });
});