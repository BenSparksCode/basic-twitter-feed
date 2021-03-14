const express = require('express')
const fs = require('fs').promises;
const path = require('path');

const {
    convertStringsToUsers,
    convertStringsToTweets,
    logServerData
} = require('./Utils/utils')

const app = express()
const port = 5000

let users = []
let tweets = []

const getStringArrayFromFile = async (fileName) => {
    // Will look for file in '../data' dir
    const res = await fs.readFile(path.join(__dirname, '../data') + `/${fileName}`, 'utf8')
    return res.split('\r\n')
}

const getTweetsFromFile = async () => {
    // Get string lines from tweet.text
    const lines = await getStringArrayFromFile('tweet.txt')
    // Convert string lines to Tweet objects
    tweets = convertStringsToTweets(lines)
}

const getUsersFromFile = async () => {
    // Get string lines from user.text
    const lines = await getStringArrayFromFile('user.txt')
    // Convert string lines to User objects
    users = convertStringsToUsers(lines)
}

// Helper function to enable CORS for local dev
const allowCrossDomain = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
}

app.get('/users', (req, res) => {
    allowCrossDomain(req, res)
    return res.status(201).json({ users: users.map(u => u.name) })
})

app.get('/user_feed', (req, res) => {
    allowCrossDomain(req, res)
    
    // Check if a user is specified in the request
    if (!req || !req.body || !req.body.user) {
        return res.status(403).json({ error: "Request data missing." })
    }

    // Find the User object based on the name given
    const chosenUser = users.find(user => user.name === req.body.user)
    const feed = chosenUser.getFeed(tweets)

    if (chosenUser && feed) {
        return res.status(200).json({ feed })
    } else if (chosenUser) {
        return res.status(401).json({ error: "Couldn't retrieve user's feed." })
    } else {
        return res.status(402).json({ error: "Couldn't find user." })
    }
})

app.listen(port, async () => {
    await loadData()
    console.log(`Twitter server listening at http://localhost:${port}\n`)
    logServerData(users, tweets)
})

const loadData = async () => {
    await getUsersFromFile()
    // console.log("Users loaded.")
    await getTweetsFromFile()
    // console.log("Tweets loaded.")
}