import { Link } from 'react-router-dom'

const LinkPage = () => {

    return (
        <section>
            <h1>Links</h1>

            <h2>Public</h2>
            <ul>
                <li key='login'>
                    <Link to='/login'>Login</Link>
                </li>
                <li key='register'>
                    <Link to='/register'>Register</Link>
                </li>
            </ul>

            <h2>Private</h2>
            <ul>
                <li key='home'>
                    <Link to='/'>Home</Link>
                </li>
                <li key='editor'>
                    <Link to='/editor'>Editor Page</Link>
                </li>
                <li key='admin'>
                    <Link to='/admin'>Admin Page</Link>
                </li>
                <li key='lounge'>
                    <Link to='/lounge'>Lounge Page</Link>
                </li>
            </ul>
        </section>
    )
}

export default LinkPage