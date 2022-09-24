import React,{ Component } from 'react';
import './charList.scss';
import Spiner from '../spinner/Spiner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';



class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading:false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount () {
        this.onRequest();
    }

    componentDidUpdate (prevProps) {
        if(this.props.clickLoading !== prevProps.clickLoading) {
            this.onClickLoading(this.props.clickLoading)  
        }
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading:true
        })
    }


    onCharsListLoaded = (newChars) => {

        let ended = false;
        if(newChars.length < 9) {
            ended = true
        }

        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    arrItemList = [];

    setItemRef = elem => {
        this.arrItemList.push(elem)
    }

    onFocusElement = (id) => {
        this.arrItemList.forEach(item => {
            item.classList.remove('char__item_selected')
            })
        this.arrItemList[id].classList.add('char__item_selected');
        this.arrItemList[id].focus();
    }

    onClickLoading = (click) => {
        if(click) {
            this.arrItemList.forEach(item => {
                item.classList.add('loading')
                })
        } else {
            this.arrItemList.forEach(item => {
                item.classList.remove('loading')
                })
        }
        
        
    }


    renderItems = (arr) =>  {
        
        return arr.map((char,i) => {
            return (
            <li ref={this.setItemRef} tabIndex="0" key = {char.id} className="char__item"
            onClick={() => {
            this.props.onCharSelected(char.id);
            this.onFocusElement(i);
            }}
            onKeyPress = {(e) => {
                e.preventDefault();
                if (e.key === ' ' || e.key === "Enter") {
                    this.props.onCharSelected(char.id);
                    this.onFocusElement(i);
                }
            }}>
                <img src={char.thumbnail} alt="abyss"/>
                <div className="char__name">{char.name}</div>
            </li>
            )
        })
    }


    render () {

        const {chars,loading,error,newItemLoading,offset,charEnded} = this.state;
        const items = this.renderItems(chars)
        

        const errorMessega = error ? <ErrorMessage/> : null,
              spinner = loading ? <Spiner/>:null,
              content = !(error || spinner) ? items : null;


        return (
            <div className="char__list">
                    {errorMessega}
                    {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style = {{'display': charEnded? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

   
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;