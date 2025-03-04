import CustomText from "@components/ui/CustomText"
import { ScreenNames } from "@navigation/screenNames"
import { useNavigationState } from "@react-navigation/native"
import { SOCKET_URL } from "@service/config"
import { getOrderbyId } from "@service/orderService"
import { useAuthStore } from "@state/authStore"
import { hocStyles } from "@styles/GlobalStyle"
import { Colors, Fonts } from "@utils/Constants"
import { navigate } from "@utils/NavigationUtils"
import strings from "@utils/string"
import React, { FC, useEffect } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import io from "socket.io-client"



const withLiveStatus = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {



    const WithLiveStatusComponent: FC<P> = (props) => {

        const { currentOrder, setCurrentOrder } = useAuthStore()
        const routeName = useNavigationState(state => state.routes[state.index]?.name)
        const fetchOrderDetails = async () => {
            const data = await getOrderbyId(currentOrder?._id as any)
            setCurrentOrder(data)
        }

        useEffect(() => {
            if (currentOrder) {
                const socketInstance = io(SOCKET_URL, {
                    transports: ['websocket'],
                    withCredentials: false
                })
                socketInstance.emit('joinRoom', currentOrder?._id)
                socketInstance.on('liveTrackingUpdates', (updatedOrder) => {
                    fetchOrderDetails()
                    console.log("RECEIVING LIVE UPDATES🔴")
                })
                socketInstance.on("orderConfirmed", (confirmOrder) => {
                    fetchOrderDetails()
                    console.log("ORDER CONFIRMATION LIVE UPDATES🔴")
                })
                return () => {
                    socketInstance.disconnect()
                }
            }

        }, [currentOrder])

        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />

                {currentOrder && routeName === "ProductDashboard" && (
                    <View style={[hocStyles.cartContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={styles.flexRow}>
                            <View style={styles.img}>
                                <Image source={require('@assets/icons/bucket.png')} style={{ width: 20, height: 20 }} />

                            </View>
                            <View style={{ width: '68%' }}>
                                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                                    {strings.order} {currentOrder?.status}
                                </CustomText>
                                <CustomText variant="h9" fontFamily={Fonts.Medium}>
                                    {currentOrder?.items![0]?.item.name + (currentOrder?.items?.length - 1 > 0 ? `and ${(currentOrder?.items?.length - 1)}+items` : '')}
                                </CustomText>

                            </View>

                        </View>
                        <TouchableOpacity onPress={() => navigate(ScreenNames.LiveTracking)} style={styles.btn}>
                            <CustomText variant="h8" style={{ color: Colors.secondary }} fontFamily={Fonts.Medium}>
                                {strings.view}
                            </CustomText>
                        </TouchableOpacity>

                    </View>
                )}

            </View>

        )

    }
    return WithLiveStatusComponent
}

export default withLiveStatus

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flexRow:
    {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 15,
        marginBottom: 15,
        paddingVertical: 10,
        padding: 10,
    },
    img: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 0.7,
        borderColor: Colors.secondary,
        borderRadius: 5,
    }
})
