class User {
    #password;

    constructor(userID, email, password){
        if(userNameAvaliable(userID)){ // need to create call function to check userList
            this.userID = userID;
            this.email = email;
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
}