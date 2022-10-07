import {useHttp} from "../hooks/http.hook";

import imgNotFound from "../resources/img/not_found.jpg";

const useMarvelService = () =>  {

    const {loading,request,error,clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=92307615a96f3c144c931541a99bd5e9';
    const _baseOffset = 210;



    const getAllCharacters = async (offset = _baseOffset) =>  {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) =>  {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 6) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }



    const _transformCharacter = (char) => {
        const notDescrText = 'Sorry! Desription is empty. Read more on the wiki or site marvel.'
        const sliceText = (text,length) => {
            if (text.length > length) {
                return text.slice(0,length) + "..."
            }
            return text;
        }
        const imgChar = char.thumbnail.path + '.' + char.thumbnail.extension;
        const stockImgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ;

        return {
            id: char.id,
            name: char.name,
            description: sliceText (char.description || notDescrText, 200),
            thumbnail: imgChar === stockImgNotFound? imgNotFound : imgChar,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            price: `9.99$`
        }
    }

    return {loading,error,getAllCharacters,getCharacter,getAllComics,clearError}
}

export default useMarvelService;



  
  
