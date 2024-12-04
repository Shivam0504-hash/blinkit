import { appAxios } from "./apiInterceptor"

export const createOrder = async (items: any, totalPrice: number) => {
    try {
        const response = await appAxios.post(`/order`, {
            items: items,
            branch: '6731b52aebb209207de9a2d2',
            totalPrice: totalPrice

        })
        return response.data;
    }
    catch (error) {
        console.log("Create Order Error", error)
        return null
    }
}

export const getOrderbyId = async (id: string) => {
    try {
        const response = await appAxios.get(`/order/${id}`)
        return response.data;
    }
    catch (error) {
        console.log("Fetch Order Error", error)
        return null
    }
}

export const fetchCustomerOrders = async (userId: string) => {
    try {
        const response = await appAxios.get(`/order?customerId=${userId}`)
        return response.data;
    }
    catch (error) {
        console.log("Fetch Customer Order Error", error)
        return null
    }
}

export const fetchOrders = async (status: string, userId: string, branchId: string) => {
    let uri = status == 'available' ? `/order?status=${status}&branchId=${branchId}` :
        `/order?branchId=${branchId}&deliverPartnerId=${userId}&status=delivered`

    try {
        const response = await appAxios.get(uri)
        // console.log("Available Orders Response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Fetch Delivery Order Error", error)
        return null
    }
}


export const sendLiveOrderUpdates = async (id: string, location: any, status: string) => {
    try {
        const response = await appAxios.patch(`/order/${id}/status`, {
            deliveryPersonLocation: location,
            status
        })
        return response.data;
    }
    catch (error) {
        console.log("sendLiveOrderUpdates Error", error)
        return null
    }
}

export const confirmOrder = async (id: string, location: any) => {
    try {
        const response = await appAxios.post(`/order/${id}/confirm`, {
            deliveryPersonLocation: location,
            
        })
        return response.data;
    }
    catch (error) {
        console.log("confirmOrder Error", error)
        return null
    }
}