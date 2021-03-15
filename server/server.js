const express = require('express')
const fs = require('fs').promises;
const path = require('path');

const {
    convertStringsToUsers,
    convertStringsToTweets,
    logServerData
} = require('./utils/utils')

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
    // Sends only user names, not follows, for min data egress
    return res.status(200).json({ users: users.map(u => u.name) })
})

app.get('/user_feed', (req, res) => {
    allowCrossDomain(req, res)
    
    // Check if a user is specified in the request
    if (!req || !req.query || !req.query.user) {
        return res.status(400)
    }

    // Find the User object based on the name given
    const chosenUser = users.find(user => user.name === req.query.user)
    const feed = chosenUser.getFeed(tweets)

    if (chosenUser && feed) {
        return res.status(200).json({ feed })
    } else {
        return res.status(400)
    }
})

// Starting server
app.listen(port, async () => {
    // Wait for data from text files
    await loadData()
    console.log(`Twitter server listening at http://localhost:${port}\n`)
    // Log User and Tweet data in specified format
    logServerData(users, tweets)
})

// Async loading in data from text files on server start
const loadData = async () => {
    await getUsersFromFile()
    await getTweetsFromFile()
}

// For unit testing
module.exports = {
    getStringArrayFromFile: getStringArrayFromFile,
    getTweetsFromFile: getTweetsFromFile,
    getUsersFromFile: getUsersFromFile
}