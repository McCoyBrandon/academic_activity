
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

class User {
    #password;

    constructor(userID, email, password, projectList = []){
        if(userNameAvaliable(userID)){ // need to create call function to check userList
            this.userID = userID;
            this.email = email;
            this.projectList = projectList;
            this.#password = password;
        }
    }

    passwordReset(newPassword){
        this.#updatePassword(newPassword);
    }

    #updatePassword(newPassword){
        this.#password(newPassword);
    }

    emailReset(newEmail){
        this.email = newEmail;
    }

    addProject(newProject){
        this.projectList.push(newProject);
    }

    removeProject(projectIndex){
        this.projectList.splice(projectIndex, 1);
    }

    getProject(projectIndex){
        return this.projectList.at(projectIndex);
    }
}

/*
Function: Finds and returns the User from the MongoDB.
Returns: User class or '-1' if it can't find the user.
*/
function findUser(client, userID){

}

/*
Function: Check's if an ID is avaliable
Returns: True/False if avaliable
*/
function userIdAvaliable(client, userID){

}

/*
Function: Create a new project without a task list in the MongoDB database for a user
Returns: True/False if successful
*/
function createProject(client, name, ID){

} 

/*
Function: Create a new project with task list in the MongoDB database for a user
Returns: True/False if successful
*/
function createProjectWithTasks(client, name, ID, tasks = []){

}

/*
Function: Update a project with task list in the MongoDB database for a user
Returns: True/False if successful
*/
function updateProjectName(client, projectID, name){

}

/*
Function: Update a project task list in the MongoDB database for a user
Returns: True/False if successful
*/
function updateProjectTasks(client, projectID, tasks = []){

}

/*
Function: Delete a user in the MongoDB database for a user
Returns: True/False if successful
*/
function deleteUser(client, projectID){

}

/*
Function: Validates the User's password
Returns: UserObject or False
*/
function validatePasswordUserID(client, userID, password){

}

/*
Function: Validates the User's password
Returns: User object or False
*/
function validatePasswordEmail(client, email, password){

}

/*
Function: Change Password
Return: True/False on success
*/
function resetPassword(client, oldPassword, newPassword){

}
