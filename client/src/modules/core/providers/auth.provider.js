import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const customLogin = (username, password) => {
        setLoading(true);
        // Implement your custom login logic here
        // Example: return someLoginFunction(username, password);
    };

    useEffect(() => {
        // Implement your custom authentication state change logic here
        // Example: const unsubscribe = onAuthStateChanged((currentUser) => { ... });

        // For simplicity, let's simulate a user login after 2 seconds
        const fakeLogin = setTimeout(() => {
            setLoading(false);
            setUser({ username: "exampleUser" });
        }, 2000);

        return () => clearTimeout(fakeLogin); // Cleanup simulation on unmount
    }, []);

    const authInfo = {
        user,
        loading,
        customLogin,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
