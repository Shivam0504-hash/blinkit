import { appAxios } from "./apiInterceptor"

export const createOrder=async(items:any,totalPrice:number)=>
    {
        try{
           const response=await appAxios.post(`/order`,{
            items:items,
            branch:'6731b52aebb209207de9a2d2',
            totalPrice:totalPrice

           })
            return response.data;
        }
        catch(error)
        {
            console.log("Create Order Error",error)
            return null
        }
    }

    export const getOrderbyId=async(id:string)=>
        {
            try{
               const response=await appAxios.get(`/order/${id}`)
                return response.data;
            }
            catch(error)
            {
                console.log("Fetch Order Error",error)
                return null
            }
        }

        export const fetchCustomerOrders=async(userId:string)=>
            {
                try{
                   const response=await appAxios.get(`/order?customerId=${userId}`)
                    return response.data;
                }
                catch(error)
                {
                    console.log("Fetch Customer Order Error",error)
                    return null
                }
            }