const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const multer = require('multer');
const { default: mongoose } = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

var CONNECTION_STRING = "mongodb+srv://harish:1234567890@cluster0.xbtdjvm.mongodb.net/?retryWrites=true&w=majority";
var DATABASESNAME = "user-academic-activity";
var database;

// Move server initialization logic outside of app.listen
MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  } else {
    database = client.db(DATABASESNAME);
    console.log("Successfully connected to MongoDB");

    // Start the server
    server = app.listen(5038, () => {
      console.log("Server is running on port 5038");
    });

    // Close the MongoDB connection when the server is closed
    server.on('close', () => {
      console.log("Closing MongoDB connection");
      client.close();
    });
  }
});

// Rest of your code remains the same...

// this get request is for login
app.get('/api/user/getnotes', (request, response) => {
  const userEmail = request.query.userEmail;
  const userPassword = request.query.userPassword;
  console.log(request.query.userEmail);
  database.collection('user_credentials').find({ "email":userEmail
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

// this post request is for signin
app.post('/api/user/addnotes', multer().none(), (request, response) => {
    database.collection("user_credentials").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("user_credentials").insertOne(body, (insertError) => {
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



//splint 2
// this post request create and add project
app.post('/api/user/createProjects', multer().none(), (request, response) => {
    database.collection("UserProjects").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("UserProjects").insertOne(body, (insertError) => {
                if (insertError) {
                    console.error("Error adding note:", insertError);
                    response.status(500).send("Internal Server Error");
                } else {
                    console.log(body);
                    response.json("project created successfully");
                }
            });
        }
    });
});

//this get request is for viewing the projects
app.get('/api/user/viewAllProjects', (request, response) => {
    
    //console.log(request.query.userId);
    database.collection('UserProjects').find({}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });
  
// members in the singup
  app.get('/api/allUsers', (request, response) => {
    
    database.collection('user_credentials').find({}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });

  app.post('/api/user/projectMembers', multer().none(), (request, response) => {
    database.collection("projectMembers").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("projectMembers").insertOne(body, (insertError) => {
                if (insertError) {
                    console.error("Error adding note:", insertError);
                    response.status(500).send("Internal Server Error");
                } else {
                    console.log(body);
                    response.json("add member to project in separate collection successfully");
                }
            });
        }
    });
});

// post to create or add alltasks
  app.post('/api/user/addTasks', multer().none(), (request, response) => {
    database.collection("ProjectTasks").countDocuments({}, (error, numofDocs) => {
        if (error) {
            console.error("Error counting documents:", error);
            response.status(500).send("Internal Server Error");
        } else {
            const body = request.body;

            database.collection("ProjectTasks").insertOne(body, (insertError) => {
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

//this is get viewall tasks
app.get('/api/user/viewAllTasks', (request, response) => {
   
    //console.log(request.query.userId);
    database.collection('UserProjects').find({}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });

  app.delete('/api/user/userDeleteTask', (request, response) => {
    const taskId = request.query.task;
  
    database.collection('ProjectTasks').deleteOne({}, (error, result) => {
      if (error) {
        console.error('Error deleting data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        if (result.deletedCount === 0) {
          response.status(404).send('User not found');
        } else {
          response.status(200).send('Task deleted');
        }
      }
    });
  });





  module.exports = app;
