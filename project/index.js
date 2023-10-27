const express= require("express");

var MongoClient=require("mongodb").MongoClient;

var cors=require("cors");

const multer= require('multer');

const { ObjectId } = require('mongodb');

const app=express();
app.use(cors());
app.use(express.json());

var CONNECTION_STRING="mongodb+srv://vardhanpothu29:0123456789@cluster0.nfxt6wn.mongodb.net/?retryWrites=true&w=majority";

var DATABASESNAME="project";
var database;

app.listen(5038,()=>{
    MongoClient.connect((CONNECTION_STRING),(error,client)=>{
        database=client.db(DATABASESNAME);
        console.log("succeffuly connected");
    })
})


app.get('/api/user/getnotes', (request, response) => {
    database.collection("data").find({}).toArray((error, result) => {
        if (error) {
            console.error("Error retrieving data from MongoDB:", error);
            response.status(500).send("Internal Server Error");
        } else {
            response.send(result);
        }
    });
});


app.post('/api/user/addnotes', multer().none(), (request, response) => {
    database.collection("data").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("data").insertOne(body, (insertError) => {
                if (insertError) {
                    console.error("Error adding note:", insertError);
                    response.status(500).send("Internal Server Error");
                } else {
                    console.log(body);
                    response.json("Note added successfully");
                }
            });
        }
    });
});



app.put('/api/user/updatenotes', (request, response) => {
    const updatedData = request.body;
    const itemId = request.query.itemId;

    database.collection("data").updateOne(
        {"id":itemId}, // Define the filter to match the document(s) you want to update.
        { $set: updatedData }, // Use $set to update specific fields with the new data.
        (error, result) => {
            if (error) {
                console.error("Error updating note in MongoDB:", error);
                response.status(500).send("Internal Server Error");
            } else {
                response.send("Note updated successfully");
            }
        }
    );
});
