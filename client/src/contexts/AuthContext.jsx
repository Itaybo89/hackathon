import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loggedinUser, setLoggedinUser] = useState({});

    const getUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/details', { withCredentials: true });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log('Error retrieving user details:', error);
            return null;
        }
    }

    const verifyUser = async (userDetails) => {
        try {
            const endpoint = 'http://localhost:8080/users/login';
            const payload = {
                email: userDetails.email,
                password: userDetails.password,
            };
            const response = await axios.post(endpoint, payload, { withCredentials: true });
            if (response.status === 200) {
                console.log('Login successful');
                const userDetails = await getUserDetails();
                setLoggedinUser(userDetails);
                return userDetails;
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    };

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

    return (
        <AuthContext.Provider value={{ verifyUser, loggedinUser, addUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContextProvider;