"use client"
import {Provider} from "react-redux";
import React ,{useState} from "react"
import NavBar from "@/app/Components/NavBar";
import Footer from "@/app/Components/Footer";
import {store} from "@/app/redux/store";
import Cart from "@/app/Cart/cart";

const App = ( { children }:{children: React.ReactNode}) => {

const [showCart,setShowCart] = useState(false);
const [cart,setCart] = useState({})
const [subTotal,setSubTotal] = useState(0)



  return <Provider store= {store}>
    <NavBar setShowCart={setShowCart}/>
    { showCart && <Cart setShowCart = {setShowCart}/>}
    {children}
    <Footer/>
  </Provider>
}

export default App
