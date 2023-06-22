import { Link } from 'react-router-dom'
const Lounge = () => {
    return (
        <section>
            <h1>Lounge Page</h1>
            <p>You must be either Admin or Editor to access this page</p>
            <p className='back'><Link to='/'>Home</Link></p>
        </section>
    )
}

export default Lounge