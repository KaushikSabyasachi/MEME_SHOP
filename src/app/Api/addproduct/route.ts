import connect from "@/app/database/page";
import Product from "@/app/models/Product";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: any, res: any) =>{
    await connect();
    if (req.method === 'POST'){
        try {
            const jsonRrquest = await req.json();
            const products = jsonRrquest;

            for (const productData of products) {
                const product = new Product({
                    title: productData.title,
                    slug: productData.slug,
                    desc: productData.desc,
                    img: productData.img,
                    category: productData.category,
                    size: productData.size,
                    color: productData.color,
                    price: productData.price,
                    availableQty: productData.availableQty,
                });
                await product.save();
            }
            return new NextResponse("Products saved successfully", { status: 200 });
        }  catch (error) {
            console.error("Error saving products:", error);
            
            return new NextResponse("Failed to save products", { status: 500 });

        }
    } 
    
    else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: "Method not allowed" });
    }
};
