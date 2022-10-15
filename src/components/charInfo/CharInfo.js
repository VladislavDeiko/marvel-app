import { useState,useEffect } from 'react';
import Spiner from '../spinner/Spiner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
import CharSearch from '../charSearch/CharSearch';

import './charInfo.scss';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../errorBoundry/ErrorBoundary';

const CharInfo = (props) => {

    const [char,setChar] = useState(null);

    const {loading,error,getCharacter,clearError} = useMarvelService();



    useEffect(()=> {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        
        const {charId} = props;
        if (!charId) {   
        return; 
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
        
    }

    const onCharLoaded = (char) => {
        setChar({...char});
        props.onClickLoding(false)
    }



        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessega = error ? <ErrorMessage/> : null,
              spinner = loading ? <Spiner/>:null,
              content = !(error || spinner || !char) ? <View char = {char}/> : null;


        return (
            <div className="char__info-wrapper">
                <div className="char__info">
                {skeleton}
                {errorMessega}
                {spinner}
                {content}
                </div> 

                <ErrorBoundary>
                    <CharSearch/> 
                </ErrorBoundary>    
            </div>
        )
    }

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki,comics} = char;
    const thumbnailStyle = {objectFit: 'cover'};
    if (thumbnail.includes("image_not_available.jpg")) {
        thumbnailStyle.objectFit = 'contain';
    }

    const renderComicsList = (arr) => {
        const listComics = [];
        if (comics.length === 0) {return "No Comics"}
        for (let i = 0; i<10; i++) {
            const comicId = arr[i].resourceURI.replace('http://gateway.marvel.com/v1/public/comics/', "");
            const item = (
            <li key = {comicId} className="char__comics-item">
                <Link to={`/comics/${comicId}`}>{arr[i].name}</Link>
            </li>
            )
            listComics.push(item);
        }
        return listComics;
    }

    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name} style = {thumbnailStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        renderComicsList(comics)
                    }               
                </ul>
        </>
    )
}

CharInfo.propTypes = { 
     charId: PropTypes.number
}

export default CharInfo;