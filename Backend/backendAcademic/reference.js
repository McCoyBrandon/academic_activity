// Connections for the Front-End
const express= require("express");
var MongoClient=require("mongodb").MongoClient;
var cors=require("cors");

const multer= require('multer');
const { default: mongoose } = require("mongoose");

const app=express();
app.use(cors());
app.use(express.json());

// MongoDB Connections Section

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://projectAdmin:KLUdywBgxnfbjZrP@atlascluster.ysh6jth.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//
// Projects call functions
//
/* 
Function: Create a project based on a provided name, and return the id.
Return: Project's MondoDB _id
*/
app.post('/api/user/createReference', multer().none(), (request, response) => {
    database.collection("References").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("References").insertOne(body, (insertError) => {
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

/* 
Function: Get a reference list based on a projectID, and return the array of ids.
Return: References's in a MondoDB _id list
*/
app.get('/api/user/viewReferencesByProject', (request, response) => {
    const referenceID = request.query.referenceID;
    console.log(request.query.referenceID);
    database.collection('References').find({"projectID": referenceID}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });


  /* 
Function: Get a reference list based on a taskID, and return the array of ids.
Return: References's in a MondoDB _id list
*/
app.get('/api/user/viewReferencesByTask', (request, response) => {
    const referenceID = request.query.referenceID;
    console.log(request.query.referenceID);
    database.collection('References').find({"taskID": referenceID}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });


/* 
Function: Delete a reference based on a given referenceID
*/
app.delete('/api/user/deleteReferences', (request, response) =>{
    const referenceID = request.query.referenceID;
    console.log(request.query.referenceID);
    database.collection("References").deleteOne(referenceID, (error,result) =>
    {
        if (error) {
            console.error('Error deleting data from MongoDB:',error);
            response.status(500).send('Internal Server Error');
        } else {
            if (result.deletedCount === 0) {
                response.status(400).send('Project not found');
            } else {
                response.status(200).send('Project deleted');
            }
        }
    });
});