import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {

    const { unsetUser, setUser } = useContext(UserContext);

    useEffect(() => {
        // Clear user data on logout
        unsetUser();
        setUser({
            id: null
        });
    }, [unsetUser, setUser]);

    return (
        <Navigate to='/login' />
    );
}
