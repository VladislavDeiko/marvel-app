import {Link, useNavigate } from 'react-router-dom';
import  parse from 'html-react-parser';

import './singlePage.scss';

const SingleComicPageLayout = ({data}) => {
    const {title,description,price,language,thumbnail,pages} = data[0];
    const navigate = useNavigate()

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{parse(description)}</p>
                <p className="single-comic__descr">{pages || `not availible`} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link onClick={()=> navigate(-1)} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPageLayout;