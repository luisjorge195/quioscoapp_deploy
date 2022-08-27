import {useRouter} from 'next/router'

const pasos = [
    {paso:1, nombre: "Menu", url: "/"},
    {paso:2, nombre: "Resumen", url: "/resumen"},
    {paso:3, nombre: "Datos y Total", url: "/total"},
]

const Pasos = () => {
    const router = useRouter()

    const calcularProgreso = ()=>{
        let valor;
        router.pathname=== "/" ? valor=2 : ((router.pathname === '/resumen')? valor=50 : valor= 100)
        return valor
    }
  return (
    <>
        <div className="flex justify-between mb-5">
            {pasos.map(paso =>(
                <button
                    onClick= {()=>{
                        router.push(paso.url)
                        
                    }} 
                    className= 'text-2xl font-bold' 
                    key = {paso.paso}
                >
                    {paso.nombre}
                </button>
            ))}
        </div>
        <div className="bg-gray-100 mb-10"> {/**este va a ser el contenedro de la barra de progreso */}
            <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
             style={{width: `${calcularProgreso()}%`}}>
                    
            </div>
        </div>
    </>
  )
}

export default Pasos