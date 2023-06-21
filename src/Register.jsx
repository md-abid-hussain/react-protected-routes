import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from './api/axios'

// RegEx for validation
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register'


const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
    }, [pwd])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }
        try {
            const res = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(res.data)
            setSuccess(true)
            setUser('')
            setPwd('')
            setMatchPwd('')
            setErrMsg('')
        } catch (err) {
            if (!err?.response)
                setErrMsg('No response from Server')
            else if (err.response?.status === 409)
                setErrMsg('Username already taken')
            else
                setErrMsg('Registration failed')
            errRef.current.focus()
        }
    }

    return (
        <>
            {
                success ?
                    (
                        <section className='success'>
                            <h1>Registration Successful</h1>
                            <a href="#">Sign In</a>
                        </section>
                    )
                    :
                    (
                        <section className="register">
                            <p ref={errRef} className={errMsg ? "errMsg" : "offScreen"} aria-live='assertive'><FontAwesomeIcon icon={faInfoCircle} />{errMsg}</p>
                            <h1>Register</h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">Username:
                                    <span className={validName ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={user && !validName ? "invalid" : "hide "}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={user}
                                    ref={userRef}
                                    autoComplete='off'
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    aria-required='true'
                                    aria-invalid={validName ? 'false' : 'true'}
                                    aria-describedby='udinote'
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id="udinote" className={userFocus && user && !validName ? "instructions" : "offScreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must be 4-24 characters long<br />
                                    Must begin with a letter<br />
                                    letter, number, hyphens,underscores are allowed
                                </p>
                                <label htmlFor='password'>Password:
                                    <span className={validPwd ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={!validPwd && pwd ? "invalid" : "hide"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby='pwdnote'
                                    aria-required="true"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offScreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must be between 8-24 digit long<br />
                                    Atleast contains uppercase and lowercase letter, number and special character<br />
                                    Allowed special characters are <span aria-label="exclamation mark">!</span>, <span aria-label="at symbol">@</span>, <span aria-label="hashtag">#</span> and <span aria-label="dollar sign">$</span>
                                </p>
                                <label htmlFor='confirm_pwd'>
                                    Confirm Password:
                                    <span className={validMatch && matchPwd && validPwd ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={!validMatch && matchPwd ? "invalid" : "hide"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input
                                    id="confirm_pwd"
                                    type="password"
                                    value={matchPwd}
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-required="true"
                                    aria-describedby='matchnote'
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="matchnote" className={matchFocus && matchPwd && !validMatch ? "instructions" : "offScreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the password input field
                                </p>
                                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                            </form>
                            <p>Already register ? <span className="line"> <a href="#"> Sign In </a> </span>{/* Router link instead of  */}
                            </p>
                        </section>
                    )
            }
        </>
    )
}

export default Register