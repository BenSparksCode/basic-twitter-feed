const express = require('express')
const fs = require('fs').promises;
const path = require('path');

const {
    convertStringsToUsers
} = require('./Utils/utils')

const User = require('./Classes/User')
const Tweet = require('./Classes/Tweet')

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
    const lines = await getStringArrayFromFile('tweet.txt')
    tweets = lines
}

const getUsersFromFile = async () => {

    const lines = await getStringArrayFromFile('user.txt')
    users = lines

    // convertStringsToUsers(lines)
    convertStringsToUsers(lines)

    // pull lines
    // split lines into first name and follows
    // combine all follows to unique first names
    // build User objects
}

app.get('/users', (req, res) => {
    console.log("Requesting users...", users);

    return res.status(201).json({users, tweets})
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, async () => {
    await loadData()
    console.log(`Twitter server listening at http://localhost:${port}`)
})

const loadData = async () => {
    await getUsersFromFile()
    console.log("Users loaded.")
    await getTweetsFromFile()
    console.log("Tweets loaded.")
}