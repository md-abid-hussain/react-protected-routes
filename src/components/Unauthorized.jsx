import { useNavigate } from 'react-router-dom'
const Unauthorized = () => {
    const navigate = useNavigate()
    const handleBack = () => navigate(-1)

    return (
        <section>
            <h1>Unauthorized</h1>
            <p>You do not have access to the requested page</p>
            <button onClick={handleBack} className='back'>Go Back</button>
        </section>
    )
}

export default Unauthorized