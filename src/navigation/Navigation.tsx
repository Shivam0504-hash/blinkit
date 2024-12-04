import React, { FC } from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '@features/auth/SplashScreen'
import { naviagtionRef } from '@utils/NavigationUtils'
import CustomerLogin from '@features/auth/CustomerLogin'
import DeliveryLogin from '@features/auth/DeliveryLogin'
import ProductDashboard from '@features/dashboard/ProductDashboard'
import DeliveryDashboard from '@features/delivery/DeliveryDashboard'
import ProductCategories from '@features/category/ProductCategories'
import ProductOrder from '@features/order/ProductOrder'
import OrderSuccess from '@features/order/OrderSuccess'
import LiveTracking from '@features/map/LiveTracking'
import Profile from '@features/profile/Profile'
import DeliveryMap from '@features/delivery/DeliveryMap'


const Stack=createNativeStackNavigator()

const Navigation:FC = () => {
  return (
    <NavigationContainer ref={naviagtionRef}>
        <Stack.Navigator 
        initialRouteName='SplashScreen'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen 
            name="SplashScreen" 
            component={SplashScreen}
            />
            <Stack.Screen 
            name="ProductDashboard" 
            component={ProductDashboard}
            />
            <Stack.Screen 
            name="DeliveryDashboard" 
            component={DeliveryDashboard}
            />
            <Stack.Screen 
            name="OrderSuccess" 
            component={OrderSuccess}
            />
            <Stack.Screen 
            name="LiveTracking" 
            component={LiveTracking}
            />
            <Stack.Screen 
            name="Profile" 
            component={Profile}
            />
            <Stack.Screen 
            name="DeliveryMap" 
            component={DeliveryMap}
            />
             <Stack.Screen 
            name="ProductOrder" 
            component={ProductOrder}
            />
            <Stack.Screen
            options={{animation:'fade'}} 
            name="DeliveryLogin" 
            component={DeliveryLogin}
            />
            <Stack.Screen 
            options={{animation:'fade'}} 
            name="CustomerLogin" 
            component={CustomerLogin}
            />
            <Stack.Screen 
            name="ProductCategories" 
            component={ProductCategories}
            />

        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default Navigation