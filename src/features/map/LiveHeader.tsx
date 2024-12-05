import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigate } from '@utils/NavigationUtils';
import { useAuthStore } from '@state/authStore';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { ScreenNames } from '@navigation/screenNames';

const LiveHeader: FC<{ type: 'customer' | 'Delivery'; title: string; secondTitle: string }> = ({ type, title, secondTitle }) => {
    const isCustomer = type === 'customer'
    const { currentOrder, setCurrentOrder } = useAuthStore()

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Pressable style={styles.backButton} onPress={() => {
                    if (isCustomer) {
                        navigate(ScreenNames.ProductDashboard)
                        if (currentOrder?.status == 'delivered') {
                            setCurrentOrder(null)
                        }
                        return
                    }
                    navigate(ScreenNames.DeliveryDashboard)
                }}>
                    <Icon name='chevron-back' size={RFValue(16)} color={isCustomer ? "#fff" : '#000'} />
                </Pressable>
                <CustomText variant='h8' fontFamily={Fonts.Medium} style={isCustomer ? styles.titleTextWhite : styles.titleTextblack}>
                    {title}
                </CustomText>
                <CustomText variant='h4' fontFamily={Fonts.SemiBold} style={isCustomer ? styles.titleTextWhite : styles.titleTextblack}>
                    {secondTitle}
                </CustomText>

            </View>
        </SafeAreaView>
    )
}

export default LiveHeader

const styles = StyleSheet.create({
    headerContainer:
    {
        justifyContent: 'center',
        paddingVertical: 10,
        alignItems: 'center',

    },
    backButton:
    {
        position: 'absolute',
        left: 20,

    },
    titleTextblack: {
        color: 'black'
    },
    titleTextWhite:
    {
        color: 'white',
    }
})