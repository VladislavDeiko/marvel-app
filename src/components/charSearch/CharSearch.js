import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './charSearch.scss';

const CharSearch = () => {

   const [char,setChar] = useState(null);  
   const {loading,getCharacterByName} = useMarvelService();

   const searchChar = (name) => {
        getCharacterByName(name)
              .then(loadingChar)
              
   }

   const loadingChar = (char) => {
        setChar(char);       
   }


   const lodingOverlay = loading ? ` overlay__loading` : ""

    return (
        <div style={{'marginTop':'30px'}} className="char__info">
            <div className={"overlay" + lodingOverlay}>...loading</div>
            <div className="search__form-title">Or find a character by name:</div>
            <Formik
                initialValues= {{
                    char: ''
                }}
                validate={values => {
                    const errors ={};
                    if (!values.char) {
                        errors.char = 'This field is required'
                    }
                    return errors;
                }}
                onSubmit={values => searchChar(values.char)}
            >
                <Form>
                    <div className="form__wrapper">
                        <Field 
                            name="char" 
                            placeholder='Enter name' 
                            className="form__input" 
                            type="text" 
                            />
                        <button 
                            type='submit'
                            className="button button__main">
                            <div className="inner">FIND</div>
                        </button>
                    </div>    
                    <ErrorMessage className="msg msg__error" name="char" component="div" />
                    {!char ? null : char.length > 0 ? <DoneMsg id={char[0].id} name={char[0].name}/> : <ErrorFetching/>}
                </Form>
            </Formik>
        </div>
    )
}

const ErrorFetching = () => {
    return (
        <div className="msg msg__error">
            The character was not found. Check the name and try again
        </div>
    )
}

const DoneMsg = ({name,id}) => {
    return (
        <div className="msg__wrapper">
            <div className="msg msg__done">
                There is! Visit {name} page?
            </div>
            <Link to={`/chars/${id}`}>
                <button
                    className="button button__main button__msg">
                    <div className="inner">TO PAGE</div>
                </button>
            </Link>
        </div>
        
    )
}

export default CharSearch;