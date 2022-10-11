import { useContext, useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { Cartcontext } from "./context/Context";
import Cart from "./cart/Cart";

const Homepage=()=>{
  const [data,setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setData(response.data);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  },[])

  // con esta constante llamamos al cartcontext
  const GlobaltState = useContext(Cartcontext);
  //declaramos la constante del dispatch
  const dispatch = GlobaltState.dispatch;
  console.log(GlobaltState)

  return(
    <div className="Homepage">
      <div className="titles">
        <h1>Products</h1>
      </div>
      <div className="productGrid">
        {data.map((item, index)=>{
          item.quantity=1;
          return(
            <div key={index} className="productContainer">
              <img src={item.image} alt={item.title} className="imgContainer"/>
              <p>{item.title}</p>
              <p>${item.price}</p>
              {/* aca le decimos el tipo de informacion y que informacion vamos a mandar */}
              <button onClick={()=>dispatch({type:"ADD",payload:item})}>añadir</button>
            </div>
          )
        })}
      </div>
      <div className="titles">
        <h2>Cart</h2>
      </div>

      <Cart />
    </div>
  )
}
export default Homepage;