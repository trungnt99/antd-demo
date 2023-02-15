import { Spin } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/config';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                navigate('/');
                return;
            }
            setIsLoading(false);
            navigate('/login');
        });
        //clean navigate
        return () => {
            unsubscibed();
        }
    }, [navigate]);


    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}