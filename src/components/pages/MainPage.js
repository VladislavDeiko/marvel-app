import {useState} from "react";
import {Helmet} from "react-helmet";


import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundry/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {


    const [selectedChar, setChar] = useState(null),
    [clickLoading, setClickLoading] = useState(null);


    const onCharSelected = (id) => {
    setChar(id);
    }

    const onClickLoding = (load) => {
    setClickLoading(load);
}

    return (
        <>
            <Helmet>
                <meta charset="utf-8" />
                <meta
                name="description"
                content="Marvel information portal"
                />
            <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}
                            clickLoading = {clickLoading}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId = {selectedChar}
                            onClickLoding = {onClickLoding}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;