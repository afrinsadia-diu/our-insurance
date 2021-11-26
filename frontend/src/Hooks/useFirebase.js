/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged, signInWithPopup,
    signOut
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import initializeAuthentication from '../Firebase/initializeAuth';

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    console.log(user);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const auth = getAuth();

    const signInUsingGoogle = (url) => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
				const newUser = {
					isLoggedIn: true,
					name: displayName,
					email,
				};
                setUser(newUser);
                history.push(url)
            })
            .finally(() => setIsLoading(false),
            );
    };

    // observe user state change
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const newUser = {
					isLoggedIn: true,
					name: user.name,
					email: user.email,
				};
                setUser(newUser);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth]);

    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {})
            .finally(() => setIsLoading(false));
    };



    return {
        user,
        isLoading,
        signInUsingGoogle,
        logOut,
        setUser,
    };
};

export default useFirebase;
