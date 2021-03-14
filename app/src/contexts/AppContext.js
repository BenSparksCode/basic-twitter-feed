import { createContext, useState } from 'react'
const axios = require('axios')

export const AppContext = createContext()

const API_URL = "http://localhost:5000"

export const AppContextProvider = (props) => {

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')

    const pullUsers = async () => {
        
        // API call
        const config = {
            method: 'get',
            url: `${API_URL}/users`,
        }
        const res = await axios(config)

        console.log(res.data);

        setUsers(JSON.stringify(res.data))

    }


    return (
        <AppContext.Provider value={{
            users, pullUsers,
            selectedUser, setSelectedUser,

        }}>
            { props.children }
        </AppContext.Provider>
    )
}

