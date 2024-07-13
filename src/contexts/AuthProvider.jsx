import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase-config";
import axios from 'axios';
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create an account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // signup with gmail

  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // login using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // logout
  const logOut = () => {
    return signOut(auth);
  };

  // update profile

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  //check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        setUser(currentuser);
        const userInfo={email:currentuser.email}
        axios.post("https://food-app-server-desi.onrender.com/jwt",userInfo)
          .then((response)=> {
            // handle success
            if(response.data.token){
                localStorage.setItem("access-token",response.data.token)
            }
            // console.log(response.data.token);
          })

        setLoading(false);
        console.log("loading", loading);
      } else {
        localStorage.removeItem("access-token")
        setLoading(false);
        console.log("loading", loading);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    updateUserProfile,
    loading,
    logOut,
  };

  // sign with gmail
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
