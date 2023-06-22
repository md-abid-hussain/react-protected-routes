import { Link } from 'react-router-dom'
const Admin = () => {
    return (
        <section>
            <h1>Admin Page</h1>
            <p>
                You must have been assign Admin role
            </p>
            <p className='back'><Link to='/'>Home</Link></p>
        </section>
    )
}

export default Admin