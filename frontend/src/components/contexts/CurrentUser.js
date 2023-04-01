import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CurrentUser = createContext() // Context used throughout the app to pass user data

function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)

    // Verifies user's json web token everytime page is reloaded
    useEffect(() => {
        const getLoggedInUser = () => {
            axios.get('http://localhost:5000/authentication/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Send current user's json web token attached through authorization header
                }
            }).then(user => {
                setCurrentUser(user.data)
            }).catch(error => {
                setCurrentUser({
                    defaultName: 'Guest' // If user can not be verified then default them to the 'Guest' name
                })
            })
        }

        getLoggedInUser()
    }, [])

    // Child components of CurrentUser provider will be able to access currentUser and setCurrentUser from using CurrentUser context
    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider