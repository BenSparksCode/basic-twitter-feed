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

    useEffect( async () => {
        const res = await axios({
            method: 'get',
            url: `${API_URL}/users`,
        })
        console.log(res.data);

        // TODO - handle server down

        setUsers(res.data)

    }, [])

    const changeUser = async (username) => {
        setUserFeedLoaded(false)
        console.log(username);

        // call user_feed
        setUserFeed([]) //TODO

        setUserFeedLoaded(true)
    }


    return (
        <AppContext.Provider value={{
            users, changeUser,
            selectedUser, setSelectedUser,
            userFeed
        }}>
            { props.children }
        </AppContext.Provider>
    )
}

