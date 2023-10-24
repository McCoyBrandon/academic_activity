

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