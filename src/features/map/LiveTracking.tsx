import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAuthStore } from '@state/authStore'
import { getOrderbyId } from '@service/orderService'
import { Colors, Fonts } from '@utils/Constants'
import LiveHeader from './LiveHeader'
import LiveMap from './LiveMap'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
import DeliveryDetails from './DeliveryDetails'
import OrderSummary from './OrderSummary'
import withLiveStatus from './withLiveStatus'

const LiveTracking: FC = () => {
    const { currentOrder, setCurrentOrder } = useAuthStore()
    const fetchOrderDetails = async () => {
        const data = await getOrderbyId(currentOrder?._id as any)
        setCurrentOrder(data)

    }

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    let msg = 'Packing Your Order'
    let time = 'Arriving in 10 minutes'
    if (currentOrder?.status == 'confirmed') {
        msg = 'Arriving Soon',
        time = 'Arriving in 8 minutes'
    }
    else if (currentOrder?.status == 'arriving') {
        msg = 'Order Picked Up',
        time = 'Arriving in 6 minutes'
    }
    else if (currentOrder?.status == 'delivered') {
        msg = 'Order Delivered',
        time = 'Fastest Delivery ⚡️'
    }


    return (
        <View style={styles.container}>
            <LiveHeader type='customer' title={msg} secondTitle={time} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>

                {/* <LiveMap /> */}
                <View style={styles.flexRow}>
                    <View style={styles.iconcontainer}>
                        <Icon name={currentOrder?.deliveryPartner ? "phone" : "shopping"} color={Colors.disabled} size={RFValue(20)} />
                    </View>
                    <View style={{ width: '82%' }}>
                        <CustomText numberofLines={1} variant='h7' fontFamily={Fonts.SemiBold}>{currentOrder?.deliveryPartner?.name || "We will soon asign delivery partner "}</CustomText>
                        {currentOrder?.deliveryPartner && <CustomText variant='h7' fontFamily={Fonts.Medium}>{currentOrder?.deliveryPartner?.phone}</CustomText>}
                        <CustomText variant='h9' fontFamily={Fonts.Medium}>{currentOrder?.deliveryPartner ? "For delivery instruction you can connect here." : msg}</CustomText>
                    </View>

                </View>

                <DeliveryDetails details={currentOrder?.customer} />
                <OrderSummary order={currentOrder} />



            </ScrollView>
        </View>
    )
}

export default withLiveStatus(LiveTracking)

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: Colors.secondary,
    },
    scrollContent:
    {
        paddingBottom: 150,
        backgroundColor: Colors.backgroundSecondary,
        padding: 15,

    },
    flexRow:
    {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border,
    },
    iconcontainer:
    {

        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }

})