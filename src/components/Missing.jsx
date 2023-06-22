import { Link } from 'react-router-dom'
const Missing = () => {
    return (
        <section>
            <h1>404 Page Not Found</h1>
            <p className='back'>Go <Link to='/linkpage'>back</Link></p>
        </section>
    )
}

export default Missing