/*
This file is being used as a central index of object API's for MongoDB.
All API's are created on their respective object files and then added here, but has grown and intended to move to the object files.
Will need to review after sprint if this is still being used.
*/


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

//
// User frontend call functions
//
/* 
Function: Find a User based on their email and password.
Return: User's MondoDB _id
*/
app.get('/api/user/getUserByEmail', (request, response) => {
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
Function: Get a User based on a provided ID.
Return: Project's MondoDB _id
*/
app.get('/api/user/viewUser', (request, response) => {
    const userId = request.query.userId;
    console.log(request.query.userId);
    database.collection('Users').find({"_ID": userId}).toArray((error, result) => {
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
app.post('/api/user/addUser', multer().none(), (request, response) => {
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

/* 
Function: Delete a User based on their email and password.
*/
app.delete('/api/user/deleteUser', (request, response) =>{
    const userEmail = request.query.userEmail;
    const userPassword = request.query.userPassword;

    database.collection("Users").deleteOne({"email": userEmail, "password": userPassword}, (error,result) =>
    {
        if (error) {
            console.error('Error deleting data from MongoDB:',error);
            response.status(500).send('Internal Server Error');
        } else {
            if (result.deletedCount === 0) {
                response.status(400).send('User not found');
            } else {
                response.status(200).send('User credentials deleted');
            }
        }
    });
});


//
// Projects call functions
//
/* 
Function: Create a project based on a provided name, and return the id.
Return: Project's MondoDB _id
*/
app.post('/api/user/createProject', multer().none(), (request, response) => {
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
Function: Get a project list based on a provided value, and return the id.
Return: Project's MondoDB _id
*/
app.get('/api/user/viewProject', (request, response) => {
    const projectId = request.query.projectId;
    console.log(request.query.projectId);
    database.collection('Projects').find({"_ID": projectId}).toArray((error, result) => {
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
Function: Get a project list based on a userID, and return the array of ids.
Return: Projects's in a MondoDB _id list
*/
app.get('/api/user/viewProjectsByUser', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('Projects').find({"ownerID": userID}).toArray((error, result) => {
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
Function: Get a project list based on a provided value, and return the id.
Return: Projects's in a MondoDB _id list
*/
app.get('/api/user/viewProjectsByMember', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('Projects').find({"members": {"memberID": userID}}).toArray((error, result) => {
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
Function: Delete a project based on a given projectId
*/
app.delete('/api/user/deleteProject', (request, response) =>{
    const projectID = request.query.projectID;
    console.log(request.query.projectID);
    database.collection("Projects").deleteOne(projectID, (error,result) =>
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

//
// Task frontend call functions
//

/* 
Function: Get a task based on a provided name, and return the id.
Return: Task's MondoDB _id
*/
app.post('/api/user/createTask', multer().none(), (request, response) => {
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
Function: Get a project list based on a userID, and return the array of ids.
Return: Task's in a MondoDB _id list
*/
app.get('/api/user/viewTasksByUser', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('Tasks').find({"ownerID": userID}).toArray((error, result) => {
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
Function: Get a tasks list based on a userID, and return the array of ids.
Return: Task's in a MondoDB _id list
*/
app.get('/api/user/viewTasksByMember', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('Tasks').find({"members": {"memberID": userID}}).toArray((error, result) => {
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
Function: Get a task list based on a provided value, and return the array of Ids.
Return: Array of tasks
*/

app.get('/api/user/viewTask', (request, response) => {
    const taskId = request.query.taskId;
    console.log(request.query.taskId);
    database.collection('Tasks').find({"_ID": taskId}).toArray((error, result) => {
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
Function: Delete a task based on a given taskId
*/
  app.delete('/api/user/deleteTask', (request, response) =>{
    const taskID = request.query.taskID;
    console.log(request.query.taskID);
    database.collection("Tasks").deleteOne(taskID, (error,result) =>
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