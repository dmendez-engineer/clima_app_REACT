import React from 'react'
import Formulario from './Formulario'
import Resultado from './Resultado'
import useClima from '../hooks/useClima'
import { Spinner } from './Spinner';

function AppClima() {
    
    const {resultado,cargando,noResultado}=useClima();
    console.log("Resultado:",resultado);
    return (
    <div>
        <main className='dos-columnas'>
            <Formulario/>
            {cargando?<Spinner/>:
            resultado?.name ? <Resultado/> : noResultado?<p>noResultado</p>:<p>El clima se va a mostrar aquí</p>
            }
            
        </main>
    </div>
  )
}

export default AppClima