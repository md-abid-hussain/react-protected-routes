import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
const Home = () => {
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)

    const handleSignOut = () => {
        setAuth({})
        navigate('linkpage')
    }

    return (
        <section>
            <h1>Home</h1>
            <p>You are logged in</p>
            <ul className='homelinks'>
                <li>
                    <Link to='/editor'>Go to the Editor Page</Link>
                </li>
                <li>
                    <Link to='/admin'>Go to the Admin Page</Link>
                </li>
                <li>
                    <Link to='/lounge'>Go to the Lounge</Link>
                </li>
                <li>
                    <Link to='/linkpage'>Go to the Link Page</Link>
                </li>
            </ul>
            <button className='back' onClick={handleSignOut}>Sign Out</button>
        </section>

    )
}

export default Home