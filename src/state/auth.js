import { useContext } from 'react'
import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [dataQuestions, setDataQuestions] = useState([])
    const [respostaAtual, setRespostaAtual] = useState([])
    const [respostasCertas, setRespostasCertas] = useState(0)

    return(
        <AuthContext.Provider value={{dataQuestions, setDataQuestions, 
        respostaAtual, setRespostaAtual,
        respostasCertas, setRespostasCertas}}>
            {children}
        </AuthContext.Provider>

    )
}

const useAuth = () => useContext(AuthContext)

export default useAuth