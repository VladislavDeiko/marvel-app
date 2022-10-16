import {useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';
import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';


const SinglePage = ({Component, dataType}) =>  {

    const {id} = useParams(null)
    const [data, setData] = useState(null)
    const {process,setProcess,getCharacter,getComic,clearError} = useMarvelService();


    useEffect(()=> {
        updateData();
    }, [id])

   const updateData = () => {
        clearError()
        switch (dataType) {
            case "char" :
                getCharacter(id)
                .then(loadingData)
                .then(() => setProcess('confirmed'));
                break;
            case "comic" :
                getComic(id)
                .then(loadingData)
                .then(() => setProcess('confirmed'));
        }
           
   }
   
   const loadingData = (data) => {
    setData(data);        
    }


    return (
        <>
            <AppBanner/>
            {setContent(process,data, Component)}
        </>
        
    )
}

export default SinglePage;