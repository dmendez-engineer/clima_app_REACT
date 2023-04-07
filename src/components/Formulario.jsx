import {React,useContext,useState} from 'react'
import useClima from '../hooks/useClima';

function Formulario() {
    const[alerta,setAlerta]=useState('');

  const{busqueda,datosBusqueda,consultarClima}=useClima();
    
  const {ciudad,pais}=busqueda;
    
  const handleSubmit=(e)=>{
    e.preventDefault();

    if(Object.values(busqueda).includes('')){
        setAlerta("Todos los campos son obligatorios");
        return;
    }
    else{
       
        consultarClima(busqueda);
    }
  

}
    return (
    <div className='contenedor'>
        {alerta && <p>{alerta}</p>}
        <form onSubmit={handleSubmit}>
            <div className='campo'>
                <label htmlFor='ciudad'>Ciudad</label>
                <input type='text' id='ciudad' name='ciudad'
                onChange={(e)=>datosBusqueda(e)}
                value={ciudad}
                />    
            </div>

            <div className='campo'>
                <label htmlFor='pais'>Pais</label>
                <select type='text' id='pais' name='pais'
                onChange={(e)=>datosBusqueda(e)}
                value={pais}
                >
                    <option value="">Seleccione un pais</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                </select>    
            </div>

            <input type='submit'
            value="Consultar clima"
            />
        
        </form>
    </div>
  )
}

export default Formulario