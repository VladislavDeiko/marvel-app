import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';

const useNewListItem = () => {

    const [items, setItems] = useState([]),
          [newItemLoading, setItemLodaing] = useState(false),
          [itemEnded,setItemEnded] = useState(false);

    const onRequest = (offset,initial) => {
        initial?setItemLodaing(false):setItemLodaing(true);
        getAllComics(offset)
        .then(onComicsListLoaded)
    }

    const {getAllComics} = useMarvelService();

    const onComicsListLoaded = (newItems, nextOffset) => {
        let ended = false;
        if(newItems.length < nextOffset) {
            ended = true
        }
        setItems([...items,...newItems]);
        setItemLodaing(false);
        setOffset(offset => offset+nextOffset);
        setItemEnded(itemEnded => ended);
    }

    return {onRequest,items,newItemLoading,itemEnded,onComicsListLoaded}
}