
import { addToCart } from "@/app/redux/Features/cartSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import Image from "next/image";
import link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";



import {
    AiFillStar,
    AiOutlineStar,
    AiOutlineHeart,
    AiOutlineShoppingCart,
}from "react-icons/ai"

export interface Product {
    
    title : string,
    slug : string,
    desc : string,
    img: string,
    category:string,
    size:string,
    color: string,
    price :number,
    availableQty :number

}

const ProductCard = ({ slug,img,title,price}: Product) =>{
    const dispatch = useAppDispatch();
    const router = useRouter();

    
    const addProductToCart = (e: React.FormEvent) =>{
      e.stopPropagation();
      const payload ={
        slug,
        title,
        img,
        price,
        availableQty :1,
        desc: '',
        category: '',
        size: '',
        color: ''
      };

      dispatch(addToCart(payload));
      
    };
    
    return(
        <div className="cursor-pointer group"
        onClick ={() => router.push('/details/${id}')}
        >
        <div className="relative">
            <Image 
            className="w-full"
            src ={img}
            width ={1000}
            height ={1142}
            alt={title}
            />
        
            <div className="absolute top-0 left-0 w-full h-full bg-[#00000050] opacity-0 transition-opacity duration-500 group-hover:opacity-100 cursor-pointer">
                <div className="absolute bottom-0 mb-4 left-[50%] translate-x-[-50%] flex gap-2">
                    
                    <div className="bg-white w-[50px] h-[50px] text-[26px] grid place-items-center" 
                    onClick={addProductToCart}
                    >
                        <AiOutlineShoppingCart/>
                    </div>
                </div>
            </div>
        </div>
        
        <h2 className="font-medium pb-3 hover:text-accent">{title}</h2>
        <p className="text-gray-600 font-light"> ${price}.00</p>
        </div>
    );
};

export default ProductCard;