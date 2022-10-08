import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign':'center','fontWeight': 'bold', 'fontSize':'24px'}}>Page doesn't exist</p>
            <Link style={{'textAlign':'center','fontWeight': 'bold', 'fontSize':'22px', 'marginTop':'30px'}}
                  to="/">Back to MAIN PAGE</Link>
        </div>
    )
}

export default Page404;