import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loggedinUser, setLoggedinUser] = useState({});

    const getLoggedInUser = () => {
        const mockUser = {
            name: 'Dror'
        }
        setLoggedinUser(mockUser);
    }

    return (
        <AuthContext.Provider value={{ loggedinUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContextProvider;