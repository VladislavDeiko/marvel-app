import { Component } from 'react';
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

    renderItems = (arr) =>  {
        return arr.map(char => {
            return (
            <li tabIndex="0" key = {char.id} className="char__item"
            onClick={() => this.props.onCharSelected(char.id)}>
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