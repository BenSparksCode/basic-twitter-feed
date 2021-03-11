const express = require('express')
const fs = require('fs')
var path = require('path');

// const userFile = require('../data/user.txt')
const tweetFile = ''

const app = express()
const port = 5000

app.get('/users', (req, res) => {

    let data = ''

    const readStream = fs.createReadStream(
        path.join(__dirname, '../data') + '/user.txt',
        'utf8');

    readStream.on('data', function (chunk) {
        if(chunk) data += chunk;
    }).on('end', function () {
        console.log(data);

        // process user follows string
        let follows = data.split("\n")

        const users = {
            follows: follows
        }

        return res.status(201).json(users)
    });
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})