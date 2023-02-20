import React, { createContext, useEffect, useState } from 'react'
import { baseUrl, postRequest } from '../utils/services'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [isloginLoading, setIsLoginLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })


    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])

    const updateRegisterInfo = (info) => {
        setRegisterInfo(info)
    }

    const updateLoginInfo = (info) => {
        setLoginInfo(info)
    }

    const registerUser = async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)

        console.log(registerInfo)

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

        setIsRegisterLoading(false)

        if (response.error) return setRegisterError(response)

        localStorage.setItem("User", JSON.stringify(response))

        setUser(JSON.parse(localStorage.getItem("User")))
    }

    const loginUser = async (e) => {
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)

        console.log(loginInfo)

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))

        
        if (response.error) return setLoginError(response)
        
        localStorage.setItem("User", JSON.stringify(response))
        
        setUser(JSON.parse(localStorage.getItem("User")))
        setIsLoginLoading(false)
    }

    const LogOut = () => {
        localStorage.clear()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            LogOut,
            registerInfo,
            loginInfo, 
            registerUser,
            loginUser,
            registerError,
            loginError,
            isloginLoading,
            isRegisterLoading,
            updateLoginInfo,
            updateRegisterInfo
        }}>
            {children}
        </AuthContext.Provider>
    )
}