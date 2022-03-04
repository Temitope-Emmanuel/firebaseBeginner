import React from 'react';
import { initializeApp } from "firebase/app"
import {getStorage} from "firebase/storage"
import {getFirestore} from 'firebase/firestore/lite'
import {getAuth, onAuthStateChanged} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDzNmeAu-CLWrpHZ5Gm4Y7mJPDBY4ojEwg",
    authDomain: "versustrade-63646.firebaseapp.com",
    databaseURL: "https://versustrade-63646-default-rtdb.firebaseio.com",
    projectId: "versustrade-63646",
    storageBucket: "versustrade-63646.appspot.com",
    messagingSenderId: "320179652216",
    appId: "1:320179652216:web:cfacb578bb8d0c087b8f8d",
    measurementId: "G-6N5RF8TCWC"
}

const app = initializeApp(firebaseConfig)

const createGenericContext = () => {
    // Create a context with a generic parameter or undefined
    const genericContext = React.createContext(undefined)
  
    // Check if the value provided to the context is defined or throw an error
    const useGenericContext = () => {
      const contextIsDefined = React.useContext(genericContext)
      if (!contextIsDefined) {
        throw new Error("useGenericContext must be used within a Provider")
      }
      return contextIsDefined
    }
  
    return [useGenericContext, genericContext.Provider]
  }

const [useFirebaseService,FirebaseServiceContextProvider] = createGenericContext()

export const FirebaseContextProvider = ({children}) => {
    const auth = getAuth(app)
    const db = getFirestore(app)
    const storage = getStorage(app)
    const [currentUser, setCurrentUser] = React.useState({})
    React.useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                setCurrentUser(user)
            }else {
                setCurrentUser(user)
            }
        })
    },[])
    
    return(
        <FirebaseServiceContextProvider value={{db, auth, storage, currentUser}}>
            {children}
        </FirebaseServiceContextProvider>
    )
}

export default useFirebaseService