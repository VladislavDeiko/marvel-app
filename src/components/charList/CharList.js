import React,{ useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';
import Spiner from '../spinner/Spiner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';



const CharList = (props) =>  {

    const [chars, setChars] = useState([]),
          [newItemLoading, setItemLodaing] = useState(false),
          [offset, setOffset] = useState(210),
          [charEnded,setCharEnded] = useState(false);
        

    const {loading,error,getAllCharacters} = useMarvelService();

    useEffect(()=> {
        onRequest(offset, true);
    },[])

    useEffect (() => {
        onClickLoading(props.clickLoading)
    },[props.clickLoading])


    const onRequest = (offset,initial) => {
        initial?setItemLodaing(false):setItemLodaing(true);
        getAllCharacters(offset)
            .then(onCharsListLoaded);
    }


    const onCharsListLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            ended = true
        }
        setChars([...chars, ...newChars]);
        setItemLodaing(false);
        setOffset(offset => offset+9);
        setCharEnded(charEnded => ended);
    }

    const arrItemList = useRef([]);

    const onFocusElement = (id) => {
        arrItemList.current.forEach(item => {
            item.classList.remove('char__item_selected')
            })
        arrItemList.current[id].classList.add('char__item_selected');
        arrItemList.current[id].focus();
    }

    const onClickLoading = (click) => {
        if(click) {
            arrItemList.current.forEach(item => {
                item.classList.add('loading')
                })
        } else {
            arrItemList.current.forEach(item => {
                item.classList.remove('loading')
                })
        }
        
        
    }


   function  renderItems(arr) {


        return (
            arr.map((char,i) => {    
                return (
                <CSSTransition key={char.id} timeout={1000} classNames="char__item">
                    <li ref={el => arrItemList.current[i] = el} tabIndex="0" key = {char.id} className="char__item"
                        onClick={() => {
                        props.onCharSelected(char.id);
                        onFocusElement(i);
                        }}
                        onKeyPress = {(e) => {
                    e.preventDefault();
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(char.id);
                        onFocusElement(i);
                    }
                    }}>
                    <img src={char.thumbnail} alt="abyss"/>
                    <div className="char__name">{char.name}</div>
                    </li>
                </CSSTransition>
                
                )
            })
        )
    }

        const items = renderItems(chars)
        

        const errorMessega = error ? <ErrorMessage/> : null,
              spinner = loading && !newItemLoading ? <Spiner/>:null;


        return (
            <div className="char__list">
                    {errorMessega}
                    {spinner}
                <ul className="char__grid">
                    <TransitionGroup component={null}>
                        {items}
                    </TransitionGroup>
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style = {{'display': charEnded? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;