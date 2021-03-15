/*  User class
*   - name: String => User's name
*   - follows: String[] => Array of strings of names of users that this User follows
*   
*   + getFeed(tweets) => takes in a collection of tweets and filters to only what this User should see
*/

class User {
    constructor(name, follows) {
        // Enforce non-blank String name and Array follows
        this.name = name && (typeof name === 'string' || name instanceof String) ? name : "Anon"
        this.follows = (Array.isArray(follows)) ? follows : []
    }

    // Filters an array of Tweets to only what this user would see
    getFeed(tweets) {
        return tweets.filter(tweet => tweet.user === this.name || this.follows.includes(tweet.user))
    }
}

module.exports = User