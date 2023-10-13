const express= require("express");

var MongoClient=require("mongodb").MongoClient;

var cors=require("cors");

const multer= require('multer');

const app=express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://vardhan:cluster0@cluster0.a3tgzet.mongodb.net/?retryWrites=true&w=majority";


var DATABASESNAME="user-academic-activity";
var database;

app.listen(5038,()=>{
    MongoClient.connect((CONNECTION_STRING),(error,client)=>{
        database=client.db(DATABASESNAME);
        console.log("succeffuly connected");
    })
})


app.get('/api/user/getnotes', (request, response) => {
    database.collection("user_credentials").find({}).toArray((error, result) => {
        if (error) {
            console.error("Error retrieving data from MongoDB:", error);
            response.status(500).send("Internal Server Error");
        } else {
            response.send(result);
        }
    });
});

app.post('/api/user/addnotes', multer().none(), (request, response) => {
    database.collection("user_credentials").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const newNote = {
                id: (numofDocs + 1).toString(),
                description: parse.JSON(request.body)
            };

            database.collection("user_credentials").insertOne(newNote, (insertError) => {
                if (insertError) {
                    console.error("Error adding note:", insertError);
                    response.status(500).send("Internal Server Error");
                } else {
                    response.json("Note added successfully");
                }
            });
        }
    });
});
