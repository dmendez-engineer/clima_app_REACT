import axios from "axios";
import {useState,createContext} from "react"

const ClimaContext=createContext();


const ClimaProvider=({children})=>{
    
    const[cargando,setCargando]=useState(false);
    const[noResultado,setNoResultado]=useState('');
   // console.log(import.meta.env.VITE_API_KEY);
    const[busqueda,setBusqueda]=useState({
        ciudad:'',
        pais:''
    });
    const[resultado,setResultado]=useState({});

    const datosBusqueda=(e)=>{
        e.preventDefault();
      //  console.log("FORM: ",e);
        setBusqueda({
            ...busqueda,
            [e.target.name]:e.target.value
        });
    }

    const consultarClima=async (datos)=>{
        setCargando(true);
        setNoResultado(false);
        try{
            const {ciudad,pais}=datos;

            const appId=import.meta.env.VITE_API_KEY;
            const url=`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;
           
            const {data}=await axios(url);
            const {lat,lon}=data[0];

            const urlClima=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
            const {data: clima}=await axios(urlClima);
            
            setResultado(clima);
            setCargando(false);
            
        }catch(error){
            setNoResultado('No hay resultado');
            console.log("ERROR:",error);
        }finally{
            setCargando(false);
        }
       // setCargando(false);
    }
    return(
        <ClimaContext.Provider
        value={{
            busqueda:busqueda,
            datosBusqueda:datosBusqueda,
            consultarClima:consultarClima,
            resultado:resultado,
            cargando:cargando,
            noResultado:noResultado
        }}
        >
            {children}
        </ClimaContext.Provider>
    )
}
export {
    ClimaProvider
}
export default ClimaContext