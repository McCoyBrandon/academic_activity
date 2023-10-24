
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

class Project {
    #projectID;

    constructor(name, projectID, taskList = []){
        if(userNameAvaliable(userID)){ // need to create call function to check userList
            this.name = name;
            this.taskList = taskList;
            this.#projectID = projectID;
        }
    }

    idReset(newID){
        this.#updateID(newID);
    }

    #updateID(newID){
        this.#projectID(newID);
    }

    nameName(newName){
        this.name = newName;
    }

    addTask(newTask){
        this.taskList.push(newTask);
    }

    removeTask(taskIndex){
        this.taskList.splice(taskIndex, 1);
    }

    getTask(taskIndex){
        return this.taskList.at(taskIndex);
    }

}

/*
Function: Check's if an ID is avaliable
Returns: True/False if avaliable
*/
function projectIdAvaliable(client, projectID){

}

/*
Function: Create a new project without a task list in the MongoDB database
Returns: True/False if successful
*/
function createProject(client, name, ID){

} 

/*
Function: Create a new project with task list in the MongoDB database
Returns: True/False if successful
*/
function createProjectWithTasks(client, name, ID, tasks = []){

}

/*
Function: Update a project with task list in the MongoDB database
Returns: True/False if successful
*/
function updateProjectName(client, projectID, name){

}

/*
Function: Update a project task list in the MongoDB database
Returns: True/False if successful
*/
function updateProjectTasks(client, projectID, tasks = []){

}

/*
Function: Update a project task list in the MongoDB database
Returns: True/False if successful
*/
function deleteProject(client, projectID){

}