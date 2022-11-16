import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged ,
    GoogleAuthProvider,
    signInWithPopup, 
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    async function signUp  (email, password) {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', email), {
            savedShows: []
        })
      }    
    
     async function googleSignIn () {
        const provider =  new GoogleAuthProvider();
       const result = await signInWithPopup(auth, provider)
            setDoc(doc(db, 'users', `${result.user.email}`), {
               savedShows: []
           })
    }  
    
    function logIn( email, password) {
        return signInWithEmailAndPassword(auth, email, password )
    }
    function logOut( ) {
        return signOut(auth)
    }

    // console.log(user?.email)
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => {
        unsubscribe();
        };
        });

    return (
        <AuthContext.Provider value={{ signUp, logIn, googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}