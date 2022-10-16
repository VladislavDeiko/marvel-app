import { Helmet } from 'react-helmet';
import {useNavigate, Link} from 'react-router-dom';
import './singlePage.scss';

const SingleCharPageLayout = ({data}) => {

    const {name,thumbnail,description} = data;
    const navigate = useNavigate();

    return (
    <div className="single-comic">
        <Helmet>
        <meta
            name="description"
            content={`${name} desription page`}
            />
            <title>{name}</title>
        </Helmet>
        <img src={thumbnail} alt={name} className="single-char__img"/>
        <div className="single-comic__info ">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
        </div>
        <Link onClick={()=> navigate(-1)} className="single-comic__back">BACK</Link>
    </div>
    )
}

export default SingleCharPageLayout;