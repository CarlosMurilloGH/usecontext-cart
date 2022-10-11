import React, { useContext } from "react";
import "./Cart.css";
import { Cartcontext } from "../context/Context";
const Cart=()=>{

    const Globalstate=useContext(Cartcontext);
    const state=Globalstate.state;
    const dispatch=Globalstate.dispatch;
    const total=state.reduce((total,item)=>{return(total+item.price*item.quantity) },0)

    return (
        <div className="cart">
            {
                state.map((item,index)=>{
                    return(
                        <div className="itemCart" key={index}>
                            <img src={item.image} alt={item.title} />
                            <p>{item.title}</p>
                            <p>{item.quantity*item.price}</p>

                            <div className="quantityContainer">
                            <button onClick={()=>dispatch({type:"INCREASE",payload:item}) }>+</button>
                            <p>{item.quantity}</p>
                            <button onClick={()=>{
                                if(item.quantity>1){
                                    dispatch({type:"DECREASE",payload:item})
                                } else{
                                    dispatch({type:"REMOVE",payload:item})
                                }
                            }}>-</button>
                            </div>
                            <button button onClick={()=>dispatch({type:"REMOVE",payload:item}) }>X</button>
                            {
                                state.length > 0 && (<div className="totalCart"><p>{total.toFixed(2)}</p></div>)
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Cart;