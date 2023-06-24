import { Link } from 'react-router-dom'
import Users from './Users'

const Admin = () => {
    return (
        <section>
            <h1>Admin Page</h1>
            <Users />
            <p className='back'><Link to='/'>Home</Link></p>
        </section>
    )
}

export default Admin