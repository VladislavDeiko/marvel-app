import Spiner from '../spinner/Spiner';
import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount () {
        this.updateChar();
        /* this.intervalId = setInterval (this.updateChar, 80000) */
    }


    componentWillUnmount () {
       /*  clearInterval(this.intervalId); */
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
            })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)+1011000);
        this.onCharLoading();
        if (this.state.error === true) {
            this.setState({
                error: false
            })
        }
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);

    }


    render() {
        const {char,loading, error}= this.state;
        const errorMessega = error ? <ErrorMessage/> : null,
              spinner = loading ? <Spiner/>:null,
              content = !(error || spinner) ? <View char = {char}/> : null;

        return (
            <div className="randomchar">
                {errorMessega}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick = {this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {

    const {name,description, thumbnail, homepage,wiki} = char;


    const thumbnailStyle = {objectFit: 'cover'};
    if (thumbnail.includes("image_not_available.jpg")) {
        thumbnailStyle.objectFit = 'contain';
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style = {thumbnailStyle} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;