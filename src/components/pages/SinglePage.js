import {useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';

import Spiner from '../spinner/Spiner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';


const SinglePage = ({Component, dataType}) =>  {

    const {id} = useParams(null)
    const [data, setData] = useState(null)
    const {error,loading,getCharacter,getComic,clearError} = useMarvelService();


    useEffect(()=> {
        updateData();
    }, [id])

   const updateData = () => {
        clearError()

        switch (dataType) {
            case "char" :
                getCharacter(id)
                .then(loadingData);
                break;
            case "comic" :
                getComic(id)
                .then(loadingData);
        }
           
   }
   
   const loadingData = (data) => {
    setData(data);        
    }

    const errorMessage = error ? <ErrorMessage/> : null,
          spinner = loading ? <Spiner/>:null,
          content = !(error || spinner || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
        
    )
}

export default SinglePage;