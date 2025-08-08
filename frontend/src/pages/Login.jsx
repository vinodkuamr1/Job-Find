import React, { useState } from 'react'
import { FaEnvelope,FaLock, FaUser } from 'react-icons/fa'
import { useAppContext } from '../context/context'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const {token,setToken,backendUrl,navigate} = useAppContext()
    const [isLogin,setIsLogin] = useState('sign up')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const authHandler = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post(backendUrl + `/api/auth/${isLogin === 'sign up'? 'register' : 'login' }`,{name, email,password})
            if(data.success){
                console.log(data)
                navigate('/')
                setToken(data.token)
                toast.success(data.message)
                localStorage.setItem('token',data.token)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center py-10 '>
            <form className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{isLogin === 'sign up' ? 'Sign Up' : 'Sign In'}</h1>
                <p className="text-gray-500 text-sm mt-2">{isLogin === 'sign up' ? 'Please sign up to continue' : 'Welcome Back '}</p>
                {isLogin === 'sign up' && <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <FaUser className='text-gray-500'/>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Name" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required/>
                </div>}

                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <FaEnvelope className='text-gray-500'/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required/>
                </div>

                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <FaLock className='text-gray-500'/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required/>
                </div>
                <div className="mt-5 text-left text-indigo-500">
                    <a className="text-sm" href="#">Forgot password?</a>
                </div>

                <button type="submit" onClick={authHandler} className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                    {isLogin === 'sign up' ? 'Sign up' : 'Login'}
                </button>
                <p className="text-gray-500 text-sm mt-3 mb-11">{isLogin === 'sign up' ? 'I have already account?' : 'Don’t have an account? ' } <span className="text-indigo-500 cursor-pointer" onClick={()=> isLogin === 'sign up' ? setIsLogin('sign in') : setIsLogin('sign up')}>Sign up</span></p>
            </form>
        </div>
    )
}

export default Login