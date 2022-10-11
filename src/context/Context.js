import { createContext, useReducer } from "react";

export const Cartcontext = createContext()
export const Context = (props) =>{

    const reducer=(state,action)=>{
        switch(action.type){
            case "ADD":
                //aca comprobamos si estamos agregando el mismo producto, si es el mismo, que no se agregue por separado
                const temporaryState=state.filter((item)=>action.payload.id===item.id)
                if(temporaryState.length>0){
                    return state
                }else{
                    return[...state,action.payload];
                }
            //Con esto añadimos productos duplicados al carrito
            case "INCREASE":
                // Acá comprobamos si ya existe el producto, si ya existe cambia el estado de quantity a +1
                const temporaryStateIncrease= state.map((item)=>{
                    if(item.id=== action.payload.id){
                        return{...item,quantity:item.quantity+1};
                    }else{
                        return item;
                    }
                })
                return temporaryStateIncrease;

            //Con esto removemos productos duplicados al carrito
            case "DECREASE":
                // Acá comprobamos si ya existe el producto, si ya existe cambia el estado de quantity a -1
                const temporaryStateDecrease= state.map((item)=>{
                    if(item.id=== action.payload.id){
                        return{...item,quantity:item.quantity-1};
                    }else{
                        return item;
                    }
                })
                return temporaryStateDecrease;

            case "REMOVE":
                // Acá comprobamos si ya existe el producto, si ya existe cambia el estado de quantity a -1
                const temporaryStateRemove= state.filter((item)=> item.id !== action.payload.id);
                return temporaryStateRemove;                

            default:return state;
        }
    }

    //usereducer toma 2 parametros y una constante dividida en 2, state que va a ser el valor actual de la variable
    //y el valor con el que inicia va a ser el 2do parametro del useReducer, en este caso un array vacio
    const [state,dispatch] = useReducer(reducer,[]);
    const info={state,dispatch}

    return(
        <Cartcontext.Provider value={info}>{props.children}</Cartcontext.Provider>
    );
};