import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: localStorage.getItem('token') ? 'placeholderId' : null,
        isAdmin: false
    });

    // Function to set user on login
    const setLoggedInUser = (userId) => {
        setUser({
            id: userId,
            isAdmin: false // Adjust if admin data is available
        });
    };

    // Function to clear user data on logout
    const unsetUser = () => {
        localStorage.removeItem('token');
        setUser({
            id: null,
            isAdmin: false
        });
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            unsetUser();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser: setLoggedInUser, unsetUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
