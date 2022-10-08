import React,{ useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Spiner from '../spinner/Spiner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [newItemLoading,setNewItemLoading] = useState(false);
    const [offset,setOffset] = useState(6);
    const [comicsEnded,setComicsEnded] = useState(false);

    
    const {getAllComics,loading,error} = useMarvelService();

    useEffect(()=> {
        onRequest(offset,true);
    },[])

    const onRequest = (offset,initial) => {
        initial?setNewItemLoading(false):setNewItemLoading(true);
        getAllComics(offset)
        .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComics) => {
        let ended = false;
        if(newComics.length < 8) {
            ended = true
        }
        setComics([...comics,...newComics]);
        setNewItemLoading(false);
        setOffset(offset => offset+8);
        setComicsEnded(comicsEnded => ended);
    }

    const renderItems = (arr) => {
        return arr.map((comics,i) => {
            return (
                <li key = {comics.id} className="comics__item">
                    <Link to={`/comics/${comics.id}`}>
                        <img src={comics.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.price}$</div>
                    </Link>
                </li>
            )
        })
    }

    const items = renderItems(comics);

    const errorMessage = error ? <ErrorMessage/> : null,
          spinner = loading && !newItemLoading ? <Spiner/>:null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">
                {items}
            </ul>
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style = {{'display': comicsEnded? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;