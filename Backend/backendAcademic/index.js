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
app.get('/api/user/usersCredentials', (request, response) => {
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
app.post('/api/user/addUsers', multer().none(), (request, response) => {
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

// this post request is for edit or update the password
app.put('/api/user/updatePassword', (request, response) => {
  const updatedData = request.body;
  const userID = request.query.userID;

  database.collection("ProjectTasks").updateOne(
      {"_id":userID}, // Define the filter to match the document(s) you want to update.
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


//This get request is for viewing the projects
app.get('/api/user/viewAllProjects', (request, response) => {
    const userID = request.query.userID;
    console.log(request.query.userID);
    database.collection('UserProjects').find({members: {
      $elemMatch: {
        row_id: userID
      }
    }
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


//This get request is for delete the projects
  app.delete('/api/user/deleteProject', (request, response) =>{
    const projectID = request.query.projectID;
    console.log(request.query.projectID);
    database.collection("UserProjects").deleteOne({"_id":projectID},(error,result) =>
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

//this get request is for updateProject the projects
app.put('/api/user/updateProjects', (request, response) => {
  const updatedData = request.body;
  const projectID = request.query.projectID;

  database.collection("UserProject").updateOne(
      {"projectId":projectID}, // Define the filter to match the document(s) you want to update.
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
  

// all user or members in the singup
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

//
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


app.get('/api/user/projectMember', (request, response) => {
   
  //console.log(request.query.userId);
  database.collection('projectMembers').find({}).toArray((error, result) => {
    if (error) {
      console.error('Error retrieving data from MongoDB:', error);
      response.status(500).send('Internal Server Error');
    } else {
      // Send the result as a response
      response.send(result);
    }
  });
});

// post to create or add alltasks
  app.post('/api/user/createTasks', multer().none(), (request, response) => {
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
    database.collection('ProjectTasks').find({"projectId":projectID}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });

//this is get view all tasks by Date
  app.get('/api/user/viewAllTasksByDate', (request, response) => {
    const Date = request.query.Date;
    //console.log(request.query.userId);
    database.collection('ProjectTasks').find({"startDate":Date}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });

  //this is get view all tasks by person 
  app.get('/api/user/viewAllTasksByperson', (request, response) => {
    const Assignedto = request.query.Assignedto;
    //console.log(request.query.userId);
    database.collection('ProjectTasks').find({"assign":Assignedto}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });

  //this is get view all tasks by status
  app.get('/api/user/viewAllTasksBystatus', (request, response) => {
    const taskStatus = request.query.taskStatus;
    //console.log(request.query.userId);
    database.collection('ProjectTasks').find({"status":taskStatus}).toArray((error, result) => {
      if (error) {
        console.error('Error retrieving data from MongoDB:', error);
        response.status(500).send('Internal Server Error');
      } else {
        // Send the result as a response
        response.send(result);
      }
    });
  });

  //this request delete the task
  app.delete('/api/user/userDeleteTask', (request, response) => {
    const taskID = request.query.taskID;
  
    database.collection('ProjectTasks').deleteOne({"_id":taskID}, (error, result) => {
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

  //this request update the task
  app.put('/api/user/updateTasks', (request, response) => {
    const updatedData = request.body;
    const taskID = request.query.taskID;

    database.collection("ProjectTasks").updateOne(
        {"_id":taskID}, // Define the filter to match the document(s) you want to update.
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





  module.exports = app;
