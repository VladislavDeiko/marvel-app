import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Page404 = () => {
    return (
        <div>
            <Helmet>
            <meta
                name="description"
                content='Page eror 404'
                />
                <title>404</title>
            </Helmet>

            <ErrorMessage/>
            <p style={{'textAlign':'center','fontWeight': 'bold', 'fontSize':'24px'}}>Page doesn't exist</p>
            <Link style={{'textAlign':'center','fontWeight': 'bold', 'fontSize':'22px', 'marginTop':'30px'}}
                  to="/">Back to MAIN PAGE</Link>
        </div>
    )
}

export default Page404;