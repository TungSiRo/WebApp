import { Routes, Route } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PrivateRoutes = (props) => {
    const user = useSelector(state => state.user.account)

    if(user && !user.auth) {
        return<>
           <Alert variant="danger" className='mt-3'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You don't have premiss to acess this route.
                </p>
            </Alert>
        </>

    }
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoutes;