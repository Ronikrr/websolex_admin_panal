import React, { createContext, useContext, useState } from 'react'
const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [userRole, setuserRole] = useState(null);
    const login = (role) => {
        setuserRole(role);
    }
    return (
        <UserContext.Provider value={{ userRole, login }} >
            {children}
        </UserContext.Provider>
    )
}
