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