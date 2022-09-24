import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundry/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null,
        clickLoading: null
    }

    onCharSelected = (id) => {
        this.setState ({
            selectedChar: id,
        })
    }

    onClickLoding = (load) => {
        this.setState ({
            clickLoading: load
        })
    }

    render() {
        return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={this.onCharSelected}
                                  clickLoading = {this.state.clickLoading}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId = {this.state.selectedChar}
                                  onClickLoding = {this.onClickLoding}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
    }
}

export default App;