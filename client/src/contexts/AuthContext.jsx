import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const mockUser = {
        name: 'Dror'
    }

    const [loggedinUser, setLoggedinUser] = useState(mockUser);
    const [currentUserAllergens, setCurrentUserAllergens] = useState([]);

    return (
        <AuthContext.Provider value={{ loggedinUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContextProvider;