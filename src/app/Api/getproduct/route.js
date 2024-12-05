import connect from "@/app/database/page";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";


export const GET = async (request , response) => {
    // export default async function handler(request: any, response: any)  {
       
        await connect();
        try {
            let products = await Product.find({category: 'tshirt'});
            let tshirts = {}
            for (let item of products){
            
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
        
            return NextResponse.json({tshirts});
        } catch (err) {
            return new NextResponse(err, {
                status: 500,
            });
        }
    }
