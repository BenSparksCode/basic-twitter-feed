import { createContext, useState, useEffect } from 'react'
const axios = require('axios')

export const AppContext = createContext()

const API_URL = "http://localhost:5000"

// DELEET
const testTweet = {
    user: "Vitalik",
    text: "Things like tornado cash and uniswap, kyber and the like are successful in part because they are just tools that people can put into their existing workflows, and not ecosystems. We need more tools that are content with being tools and fewer attempts at ecosystems."
}

const testTweet2 = {
    user: "Veronica",
    text: "Worried about shifting your focus from now another sister will surely become to have bugs, only!"
}

export const AppContextProvider = (props) => {

    const [usersLoaded, setUsersLoaded] = useState(false)
    const [userFeedLoaded, setUserFeedLoaded] = useState(true)
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [userFeed, setUserFeed] = useState([testTweet, testTweet2])

    useEffect(async () => {
        // Get user list from server when app starts
        const res = await axios({
            method: 'get',
            url: `${API_URL}/users`,
        })

        if (!res.data || !res.data.users || res.data.users.length === 0) {
            console.log("API Error - Couldn't get users on load...");
            // TODO - handle API error
            
        } else {
            // Received data as expected
            setUsers(res.data.users)
            setUsersLoaded(true)
            setSelectedUser(res.data.users[0])
        }

    }, [])

    const changeUser = async (username) => {
        setSelectedUser(username)
        setUserFeedLoaded(false)
        console.log(username);

        // const res = await axios({
        //     method: 'get',
        //     url: `${API_URL}/users`,
        //     body: {user: username}
        // })
        // setUserFeed([]) //TODO

        // setUserFeedLoaded(true)
    }


    return (
        <AppContext.Provider value={{
            users, changeUser, usersLoaded,
            selectedUser,
            userFeed, userFeedLoaded,
        }}>
            { props.children}
        </AppContext.Provider>
    )
}

