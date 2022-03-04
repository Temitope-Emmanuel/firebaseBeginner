import React from 'react';
import { initializeApp } from "firebase/app"
import {getStorage} from "firebase/storage"
import {getFirestore} from 'firebase/firestore'
import {getAuth, onAuthStateChanged} from "firebase/auth"

const firebaseConfig = {
    apiKey:process.env.REACT_APP_apiKey,
    authDomain:process.env.REACT_APP_authDomain,
    databaseURL:process.env.REACT_APP_databaseURL,
    projectId:process.env.REACT_APP_projectId,
    storageBucket:process.env.REACT_APP_storageBucket,
    messagingSenderId:process.env.REACT_APP_messagingSenderId,
    appId:process.env.REACT_APP_appId,
    measurementId:process.env.REACT_APP_measurementId
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