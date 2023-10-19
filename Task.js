class Task {
    #taskID;

    constructor(name, taskID){
        if(userNameAvaliable(userID)){ // need to create call function to check userList
            this.name = name;
            this.#taskID = taskID;
        }
    }

    idReset(newID){
        this.#updateID(newID);
    }

    #updateID(newID){
        this.#taskID(newID);
    }

    nameName(newName){
        this.name = newName;
    }
}