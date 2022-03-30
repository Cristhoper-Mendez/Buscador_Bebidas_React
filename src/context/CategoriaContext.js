import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

//crear context
export const CategoriasContext = createContext();

//provider donde estan funcs y state

const CategoriasProvider = (props) => {
    //crear state del context
    const [ categorias, guardarCategorias ] = useState([])

    //llamar api
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"

            const categorias = await Axios.get(url);
            guardarCategorias(categorias.data.drinks);

        }
        obtenerCategorias();
    }, [])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider