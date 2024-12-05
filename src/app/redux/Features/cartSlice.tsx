import { createSlice , PayloadAction} from "@reduxjs/toolkit"

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

const initialState: Array <ProductData> = [];

export const cartSlice =  createSlice({
    name: "cartSlice",
    initialState,
    reducers:{
        addToCart : (state ,action: PayloadAction<ProductData>) => {
            if (state.findIndex(pro => pro.slug === action.payload.slug) === -1){
                state.push (action.payload)
            }
            else {
                return state.map ( item => {
                    return item.slug === action.payload.slug ? {...item, quantity : item.availableQty+1} : item ;
                });
            }
        },
        removeFromCart : (state ,action : PayloadAction<string>) =>{
            const slug = action.payload
            return state.filter( item => item.slug !== slug)
        }
    },
});

export const {addToCart , removeFromCart} = cartSlice.actions
export default cartSlice.reducer