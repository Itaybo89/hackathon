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

    const addUser = async (userDetails) => {
        try {
            const res = await axios.post('http://localhost:8080/users', userDetails, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    const getDishes = async () => {
        try {
            const res = await axios.get('http://localhost:8080/providers/restaraunt/:id');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ loggedinUser, addUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContextProvider;