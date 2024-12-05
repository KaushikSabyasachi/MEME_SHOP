'use client'
import React from 'react'
import Image from 'next/image'
import  Link  from "next/link";
import { PiShoppingCart } from "react-icons/pi";
//import { BrowserRouter as Router,Rout,Switch } from 'react-router-dom';

import { AiFillCloseCircle } from "react-icons/ai";
import { useRef } from 'react';
//import { useRouter } from 'next/navigation'
import { FaCirclePlus , FaCircleMinus} from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import {useAppSelector} from "@/app/redux/hooks";
import Tshirt from "@/app/Tshirt/page";

const Navbar = ({setShowCart}:any) => {

const cartCount = useAppSelector((state) => state.cartReducer.length)

  return (
    
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10'>
         <div className="logo mx-5">
          <Link href="/" ><a><Image  width={60} height={10}src="/LOGO.png" alt=""/></a> </Link>
         </div>
         <div className="nav">
          <ul className='flex item-center space-x-6 font-bold md:text-md'>

          <Link href="/Tshirt"><li>Tshirt</li></Link>
          <Link href="/Hoodies"><li>Hoodies</li></Link>
          <Link href="/Mugs"><li>Mugs</li></Link>
          <Link href="/Sticker"><li>Sticker</li></Link>  
          
          </ul>
         </div>

         <div className="cursor-pointer cart absolute right-0 top-4 mx-5 flex">
         <Link href="/Login">  <MdAccountCircle className='text-xl md:text-2xl mx-2'/> </Link>
          <div className='text-xl md:text-2xl mx-2'
            onClick ={() => setShowCart(true)}>
<PiShoppingCart/>
<div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"> {cartCount}</div>
          </div>
     </div >

       
    </div>
  )
}

export default Navbar

