/*  Tweet class
*   - user: String => Name of user that posted this Tweet
*   - text: String => Text message part of this Tweet
*
*/

class Tweet {
    constructor(user, text){
        // Enforce user and text are Strings. User string is non-blank.
        this.user = user && (typeof user === 'string' || user instanceof String) ? user : "Anon"
        this.text = (typeof text === 'string' || text instanceof String) ? text : ""
    }
}

module.exports = Tweet