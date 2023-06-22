import { Link } from 'react-router-dom'
const Editor = () => {
    return (
        <section>
            <h1>Editor Page</h1>
            <p>
                You must have been assign Editor role
            </p>
            <p className='back'><Link to='/'>Home</Link></p>
        </section>
    )
}

export default Editor