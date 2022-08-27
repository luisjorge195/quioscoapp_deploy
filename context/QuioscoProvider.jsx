import {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import  {toast} from 'react-toastify'
import {useRouter} from 'next/router'
const QuioscoContext = createContext();



const QuioscoProvider = ({children})=>{
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const[modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] =useState(0)
    const router = useRouter();
    const obtenerCtegorias = async()=>{
        const {data} = await axios('/api/categorias');
        setCategorias(data);
    }

    useEffect(()=>{
        obtenerCtegorias();
    },[])

    //los useEffect se ejecutan cuando el componente se monta y cuando se desmonta ademas se ejecutan en el orden que se declaran
    useEffect (()=>{
        setCategoriaActual(categorias[0]);
    },[categorias])

    useEffect (()=>{
        const nuevoTotal = pedido.reduce((total, producto)=>(producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    },[pedido])

    const handleClickCategoria = id =>{
        const categoria = categorias.filter( cat => cat.id === id);
        setCategoriaActual(categoria[0]);
        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto);
    }
    const handleChangeModal = ()=>{
        setModal(!modal);
    }
    
    const handleAgregarPedidio = ({categoriaId, ...producto})=>{
        ///some retorna true op false y esta condicion evalua si el prodicto ya existe en el state
        if(pedido.some(productoState => productoState.id === producto.id)){
            ///si el producto existe actualizamos la cantidad y para eso iteramos en el array
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto: productoState )
            setPedidio(pedidoActualizado)
            toast.success('Actualizado Correctamente',{
                posiction: 'top-center',
                autoClose: 400
            })
        }
        else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido', {
                position: 'top-center',
                autoClose: 400
            })
        }
        setModal(false)
        
    }
    const handleEditarCantidades = (id)=>{
        const productoActualizar =  pedido.filter(producto=> producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }
    const handleEliminarProducto = (id)=>{
        const productoEliminar =  pedido.filter(producto=> producto.id !== id)
        setPedido(productoEliminar)
    }
    const colocarOrden = async(e)=>{
        e.preventDefault()
        try {
             await axios.post('/api/ordenes', {pedido,nombre,total, fecha:Date.now().toString()});
            //resetear la app
            setCategoriaActual([0])//lo deja en la opcion café
            setPedido([]);
            setNombre('');
            setTotal(0)
            toast.success('Pedido enviado correctamente', {
                position: 'top-center',
                autoClose: 400
            })
            setTimeout(() => {
                router.push('/')
            }, 3000);
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetProducto,
                producto,
                handleChangeModal,
                modal,
                handleAgregarPedidio,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
                
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext;