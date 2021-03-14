/*  User class
*   - name: String => User's name
*   - follows: String[] => Array of strings of names of users that this User follows
*   
*   + setFollows(users) => sets follows var for this User
*/

class User {
    constructor(name, follows){
        this.name = name
        this.follows = follows
    }

    setFollows(users){
        this.follows = users
    }
}

module.exports = User