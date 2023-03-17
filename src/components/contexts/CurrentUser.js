import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = () => {
            axios.get('http://localhost:5000/authentication/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(user => {
                setCurrentUser(user.data)
            }).catch(error => {
                console.log(error) // *** PLACEHOLDER ***
            })
        }

        getLoggedInUser()
    }, [])



    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider