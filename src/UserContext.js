import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        isAdmin: false
    });

    // Function to clear user data on logout
    const unsetUser = () => {
        localStorage.removeItem('token');
        setUser({
            id: null,
            isAdmin: false
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch user details if token exists
            fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser({
                        id: data.user._id,
                        isAdmin: data.user.isAdmin
                    });
                }
            })
            .catch(() => {
                unsetUser();
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, unsetUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
