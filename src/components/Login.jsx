import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


import axios from '../api/axios'

const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth } = useAuth();
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const userRef = useRef()
    const errRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(res.data))
            const accessToken = res?.data?.accessToken
            const roles = res?.data?.roles
            setAuth({
                user, pwd, accessToken, roles
            })
            setUser('')
            setPwd('')
            setErrMsg('')
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response)
                setErrMsg('No response from server')
            else if (err.response?.status === 401)
                setErrMsg('Unauthorized')
            else
                setErrMsg('Login failed')
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offScreen"} aria-live='assertive'>
                <FontAwesomeIcon icon={faInfoCircle} />
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id='username'
                    value={user}
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
                <button disabled={user && pwd ? false : true}>Login</button>
            </form>
            <p>Need an account ? </p>
            <Link to='/register'>Sign up</Link>
        </section>

    )
}

export default Login