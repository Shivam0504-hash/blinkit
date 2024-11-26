import {create} from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import { mmkvStorage } from './Storage';

interface CartItem{
    _id:string|number;
    item:any;
    count:number;
}

interface CartStore{
    cart:CartItem[];
    addItem:(user:any)=>void;
    removeItem:(id:string|number)=>void;
    clearCart:()=>void;
    getItemCount:(id:string|number)=>void;
    getTotalPrice:()=>number;
    
    
    
}
export const useCartStore=create<CartStore>()
(
    persist(
        (set,get)=>({
            cart:[],
            addItem:(item)=>{
                const currentCart=get.cart()
                const existingItemIndex=currentCart.findIndex(cartItem=>cartItem?._id===item._id)
                if(existingItemIndex>=0)
                {
                    const updatedCart=[...currentCart]
                    updatedCart[existingItemIndex]={
                        ...updatedCart[existingItemIndex],
                        count:updatedCart[existingItemIndex].count+1
                    };
                    set({cart:updatedCart})
                }else{
                    set({
                        cart:[...currentCart,{_id:item._id,item:item,count:1}]
                    })
                    
                }
            },

        }),
        {
            name:'cart-storage',
            storage:createJSONStorage(()=>mmkvStorage)
        }
    ),
)