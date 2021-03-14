/*  Tweet class
*   - user: String => Name of user that posted this Tweet
*   - text: String => Text message part of this Tweet
*
*/

class Tweet {
    constructor(user, text){
        this.user = user
        this.text = text
    }
}

module.exports = Tweet