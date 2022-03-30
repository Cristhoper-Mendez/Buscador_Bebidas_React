import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [ recetas, guardarRecetas ] = useState([]);

    const [ busqueda, buscarRecetas ] = useState({
        nombre: '',
        categoria: ''
    })

    const [ consulta, guardarConsulta ] = useState(false);

    const { nombre, categoria } = busqueda;

    useEffect(() => {
        if(consulta){
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
    
                const resultado = await Axios.get(url)
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busqueda, nombre, categoria, consulta]);

    return ( 
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsulta
            }}
        >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;