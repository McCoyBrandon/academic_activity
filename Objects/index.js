const express= require("express");
var MongoClient=require("mongodb").MongoClient;
var cors=require("cors");

const multer= require('multer');
const { default: mongoose } = require("mongoose");

const app=express();
app.use(cors());
app.use(express.json());


/* Harish's test server
var CONNECTION_STRING="mongodb+srv://harish:1234567890@cluster0.xbtdjvm.mongodb.net/?retryWrites=true&w=majority";
var DATABASESNAME="user-academic-activity";
var database;
//*/

///* Brandon's Academic_Activity Server
var CONNECTION_STRING="mongodb+srv://projectAdmin:KLUdywBgxnfbjZrP@atlascluster.ysh6jth.mongodb.net/?retryWrites=true&w=majority";
var DATABASESNAME="Academic_Activity";
var database;
//*/

// Mongo server connection test.
app.listen(5038,()=>{
    MongoClient.connect((CONNECTION_STRING),(error,client)=>{
        database=client.db(DATABASESNAME);
        console.log("succeffuly connected");
    })
})

/* 
Function: Find a User based on their email and password, and return the user.
Return: User's MondoDB _id
*/
app.get('/api/user/getnotes', (request, response) => {
  const userEmail = request.query.userEmail;
  const userPassword = request.query.userPassword;
  console.log(request.query.userEmail);
  database.collection('Users').find({ "email":userEmail
  , "password":userPassword   
  }).toArray((error, result) => {
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
Function: Create a User based on their email and password, and return the user.
Return: User's MondoDB _id
*/
app.post('/api/user/addnotes', multer().none(), (request, response) => {
    const userEmail = request.query.userEmail;
    const userPassword = request.query.userPassword;
    database.collection("Users").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("Users").insertOne(body, (insertError) => {
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


// Sprint 2
/* 
Function: Create a project based on a provided name, and return the id.
Return: Project's MondoDB _id
*/
app.post('/api/user/createProjects', multer().none(), (request, response) => {
    database.collection("Projects").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("Projects").insertOne(body, (insertError) => {
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
Function: Get a project based on a provided name, and return the id.
Return: Project's MondoDB _id
*/
app.get('/api/user/viewAllProjects', (request, response) => {
    const userId = request.query.userId;
    //console.log(request.query.userId);
    database.collection('Projects').find({}).toArray((error, result) => {
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
Function: Create a task based on a provided name, and return the id.
Return: Task's MondoDB _id
*/
app.post('/api/user/createProjects', multer().none(), (request, response) => {
    database.collection("Tasks").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("Tasks").insertOne(body, (insertError) => {
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
Function: Get a task based on a provided name, and return the id.
Return: Task's MondoDB _id
*/
app.get('/api/user/viewAllProjects', (request, response) => {
    const userId = request.query.userId;
    //console.log(request.query.userId);
    database.collection('Tasks').find({}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });
  