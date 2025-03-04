import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/Storage";
import { refresh_tokens } from "./authService";
import { Alert } from "react-native";

export const appAxios=axios.create({
    baseURL:BASE_URL
})
appAxios.interceptors.request.use(async config=>{
     const accessToken=tokenStorage.getString('accessToken')
     if(accessToken)
     {
        config.headers.Authorization=`Bearer ${accessToken}`
     }
     return config
})

 appAxios.interceptors.response.use(
    response=>response,
    async error=>
    {
        if(error.response && error.response.status===401)
        {
            try{
                const newAccessToken=await refresh_tokens()
                if(newAccessToken)
                {
                    error.config.headers.Authorization=`Bearer ${newAccessToken}`
                    return axios(error.config)
                }
            }
            catch(error)
            {
                console.log("Error Refreshing token")
            }
        }
        if(error.response && error.response.status!==401)
        {
            const errorMessage=error.response.data.message ||"something went wwrong"
            Alert.alert(errorMessage)
        }
        return Promise.resolve(error)

    }

 )