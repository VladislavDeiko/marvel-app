import { useParams,Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

import Spiner from '../spinner/Spiner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading,error,getComic,clearError} = useMarvelService();

    useEffect(()=> {
        updateComic();
    }, [comicId])

    const updateComic = () => {

        clearError();
            getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }


    const errorMessage = error ? <ErrorMessage/> : null,
          spinner = loading ? <Spiner/>:null,
          content = !(error || spinner || !comic) ? <View comic = {comic}/> : null;

    return (
        <>
                {errorMessage}
                {spinner}
                {content}
        </>
    )
}

const View = ({comic}) => {
    const {title,description,price,language,thumbnail,pages} = comic[0];
    const navigate = useNavigate()

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages || `not availible`} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link onClick={()=> navigate(-1)} className="single-comic__back">Back to all</Link>
        </div>
    )
}
export default SingleComicPage;