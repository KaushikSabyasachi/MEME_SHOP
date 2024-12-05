import {useAppDispatch} from "@/app/redux/hooks";
import { RxCross1 } from "react-icons/rx";
import { removeFromCart } from "@/app/redux/Features/cartSlice";

   

interface ProductData{
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

const CartProduct: React.FC<ProductData> = ({
  slug ,img,title,price,availableQty,
}) =>{
    const dispatch = useAppDispatch();

    return (
       <div className ="flex justify-betweeen items-center">
        <div className= "flex items-center gap-4">
            <img className="h-[80px]" src={img} alt ={title} />
            <div className="space-y-2">
                <h3 className="font-medium">{title}</h3>
                <p className="text-gray-600 text-[14px]">
                    {availableQty} x ${price}.00
                </p>
            </div>
        </div>
        <RxCross1 className ="cursor-pointer" onClick={() => dispatch(removeFromCart(slug))} />
       </div> 
    );
};

export default CartProduct;
