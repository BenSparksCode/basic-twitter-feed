import { createContext, useState, useEffect } from 'react'
const axios = require('axios')

export const AppContext = createContext()

const API_URL = "http://localhost:5000"

export const AppContextProvider = (props) => {

    const [usersLoaded, setUsersLoaded] = useState(false)
    const [userFeedLoaded, setUserFeedLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [userFeed, setUserFeed] = useState([])

    useEffect(() => {
        // Get user list from server when app starts
        const fetchData = async () => {
            const res = await axios({
                method: 'get',
                url: `${API_URL}/users`,
            })

            if (!res.data || !res.data.users || res.data.users.length === 0) {
                console.log("API Error - Couldn't get users on load...")
            } else {
                // Received data as expected - set up state
                setUsers(res.data.users)
                setUsersLoaded(true)
                setSelectedUser(res.data.users[0])
                // Get first user's feed of tweets and display
                changeUser(res.data.users[0])
            }
        }

        fetchData()
    }, [])

    // Gets new feed of tweets for a given user
    const changeUser = async (username) => {
        setSelectedUser(username)
        setUserFeed([])
        setUserFeedLoaded(false)

        const res = await axios({
            method: 'get',
            url: `${API_URL}/user_feed`,
            params: { user: username }
        })

        if (!res || !res.data || !res.data.feed) {
            console.log("API Error - Couldn't get user's feed...");
        } else if (res.data.feed.length === 0) {
            setUserFeedLoaded(true)
        } else {
            setUserFeed(res.data.feed)
            setUserFeedLoaded(true)
        }
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

