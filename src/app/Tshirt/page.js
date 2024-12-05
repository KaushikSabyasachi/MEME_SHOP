
import React from 'react'
import  Link  from "next/link";
import Product from "@/app/models/Product";
import  mongoose from "mongoose";
import connect from "@/app/database/page";
import { NavLink } from 'react-router-dom';
import ProductPage from "@/app/ProductPage/page"

// import { useRouter } from "next/navigation";

const  Tshirt = async () => {
  
    var resp = await fetch('http://localhost:3000/Api/getproduct', { cache: 'no-store' });
    // await connect();
    let data = await Product.find({category : 'tshirt'});
    let tshirts = {}

            for (let item of data){
            
                if(item['title'] in tshirts) {
            
                    if(!tshirts[item['title']]['color'].includes(item['color']) && item['availableQty'] > 0) {
                    tshirts[item['title']]['color'].push(item['color']);
                }
                    if(!tshirts[item['title']]['size'].includes(item['size']) && item['availableQty'] > 0) {
                        tshirts[item['title']]['size'].push(item['size']);
                }
                } 
                else {
                        tshirts[item['title']] = JSON.parse(JSON.stringify(item));
                    if(item['availableQty'] > 0) {
                
                        tshirts[item['title']]['color'] = [item['color']];
                        tshirts[item['title']]['size'] = [item['size']];
        
                    }
                
                } 
                 
            }

        
  // const router = useRouter(); // for sending the JSON object to a another page we have to use the router 

  const handleClick = (someData) => {
    const data = { someData }; // Example JSON object
    localStorage.setItem('slugInfo', JSON.stringify(someData));
    window.open(`/$someData`);
  };
      

          
  return (
    <>
      <div>
      <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
      <div className="grid grid-cols-4 gap-4">

      
      {Object.keys(tshirts).map((product) => (
        // linkUrl = "/ProductPage?data=" + JSON.stringify(tshirts[product])
        
         <Link key={tshirts[product].slug}  href = {{
           // receiver: `/ProductPage/${JSON.stringify(tshirts[product])}`,
           pathname: "/ProductPage",
           query: { data: JSON.stringify(tshirts[product])}
         }} >
          
        
           
        <div   className='rounded shadow-lg'>
        <a className="block relative  rounded overflow-hidden" >
          <img alt="ecommerce" className="m-auto p-4 h-[30vh] md:h-[36vh] block" src={tshirts[product].img}/>

        </a>
        <div className="mt-4 text-center md:text-left">
          <h3 className="text-gray-500 text-xs title-font mb-1 pb-1 pl-2">T-Shirts</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium pb-1 pl-2">{tshirts[product].title}</h2>
          <p className="mt-1 ">₹ {tshirts[product].price}</p>
          <div className="mt-1">
           {tshirts[product].size.includes('S')  && <span className='border border-gray-300 px-1 mx-1'>S</span>}
           {tshirts[product].size.includes('M')  && <span className='border border-gray-300 px-1 mx-1'>M</span>}
           {tshirts[product].size.includes('L')  && <span className='border border-gray-300 px-1 mx-1'>L</span>}
           {tshirts[product].size.includes('XL')  && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
           {tshirts[product].size.includes('XXL')  && <span className='border border-gray-300 px-1 mx-1'>XXL</span>} 
           </div>
          <div className='mt-1'>
          {tshirts[product].color.includes('red')  && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {tshirts[product].color.includes('brown')  && <button className="border-2 border-gray-300 ml-1 bg-brown-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {tshirts[product].color.includes('blue')  && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {tshirts[product].color.includes('black')  && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
          {tshirts[product].color.includes('pink')  && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {tshirts[product].color.includes('white')  && <button className="border-2 border-gray-300 ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {tshirts[product].color.includes('gray')  && <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {tshirts[product].color.includes('yellow')  && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          </div>
        </div>
        </div>
        </Link>
      ))}   
     </div>
  </div>
</section>
      </div>
    </>
  )
}


export default Tshirt
