const User = require('../classes/User')
const Tweet = require('../classes/Tweet')

const MAX_TWEET_LENGTH = 280

const convertStringsToUsers = (userStringsFromFile) => {
    // userStringsFromFile: String[]
    // If blank or no string given => empty array = no Users
    if (!userStringsFromFile || userStringsFromFile.length === 0) return []

    // Object to contain all users and the names of their follows
    let userFollows = {} //k:v => [name]:[Set of follows]
    let allUsers = new Set() //to complete users set with no follows

    userStringsFromFile.forEach(line => {
        //Split into User and Users they follow
        const splitLine = line.split(" follows ")

        //Check line and substrings adhere to expected structure
        if (!line || splitLine.length != 2 || !splitLine[0] || !splitLine[1]) return

        //Split follows into separate names
        const follows = splitLine[1].split(",")
            .map(name => name.trim()) //removes white space on ends
            .filter(Boolean) //removes falsy names

        if (splitLine[0] in userFollows) {
            // User already in userFollows, add new follows
            follows.forEach(follow => {
                // Set object avoids duplicates
                userFollows[splitLine[0]].add(follow)
                allUsers.add(follow)
            });
        } else {
            // User not yet in userFollows as a key
            userFollows[splitLine[0]] = new Set(follows)
            // Keeps track of all users mentioned
            allUsers = new Set([...allUsers, ...new Set(follows)]).add(splitLine[0])
        }
    });

    // Add users with no follows to userFollows
    allUsers.forEach(user => {
        if (user in userFollows) {
            return
        } else {
            userFollows[user] = null
        }
    });

    let users = []
    // Build final array of User objects
    for (const [user, follows] of Object.entries(userFollows)) {
        if(user && follows){
            users.push(new User(user, [...follows]))
        } else if(user){
            // Handles case of user with no follows
            users.push(new User(user, []))
        }
    }

    return users
}

const convertStringsToTweets = (tweetStringsFromFile) => {
    // tweetStringsFromFile: String[]
    // If blank or no string given => empty array = no Tweets
    if (!tweetStringsFromFile || tweetStringsFromFile.length === 0) return []

    let tweets = []

    tweetStringsFromFile.forEach(line => {
        // Split tweet into [user | text]
        splitLine = line.split("> ")

        // Check line and substrings adhere to expected structure
        if (!line || splitLine.length != 2 || !splitLine[0] || !splitLine[1]) return

        // Enforce 280 char limit for Tweet text
        const tweetText = (splitLine[1].length > MAX_TWEET_LENGTH)
            ? splitLine[1].substring(0, MAX_TWEET_LENGTH)
            : splitLine[1]

        // Create Tweet object and add to array
        tweets.push(new Tweet(splitLine[0], tweetText))
    })

    return tweets
}

const logServerData = (users, tweets) => {
    // Checks users and tweets are passed in correctly
    if (!users || !tweets || users.length === 0) {
        console.log("No users/tweets to log...")
        return null
    }

    // Logs each User and tweets from their follows
    users.forEach(user => {
        console.log(user.name)
        const feed = user.getFeed(tweets)
        feed.forEach(tweet => {
            console.log(`\t@${tweet.user}: ${tweet.text}`);
        });
    });
}


module.exports = {
    convertStringsToUsers: convertStringsToUsers,
    convertStringsToTweets: convertStringsToTweets,
    logServerData: logServerData
}