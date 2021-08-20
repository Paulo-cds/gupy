import { useContext } from 'react'
import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [dataQuestions, setDataQuestions] = useState([])

    return(
        <AuthContext.Provider value={{dataQuestions, setDataQuestions}}>
            {children}
        </AuthContext.Provider>

    )
}

const useAuth = () => useContext(AuthContext)

export default useAuth