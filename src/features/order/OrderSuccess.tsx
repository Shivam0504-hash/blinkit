import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { screenWidth } from '@utils/Scaling'
import { Colors, Fonts } from '@utils/Constants'
import LottieView from 'lottie-react-native'
import CustomText from '@components/ui/CustomText'
import { useAuthStore } from '@state/authStore'
import { replace } from '@utils/NavigationUtils'
import { ScreenNames } from '@navigation/screenNames'
import strings from '@utils/string'

const OrderSuccess: FC = () => {
  const { user } = useAuthStore()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      replace(ScreenNames.LiveTracking)
    }, 2300)
    return () => clearTimeout(timeoutId)
  }, [])
  return (
    <View style={styles.container}>
      <LottieView source={require('@assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.lottiewView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid


      />
      <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={styles.orderPlaceText}>
        {strings.palcedorder}
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText variant='h4' fontFamily={Fonts.SemiBold}>
          {strings.deliverytohome}
        </CustomText>
      </View>
      <CustomText variant='h8' style={styles.addressText} fontFamily={Fonts.Medium}>
        {user?.address || 'Somewhere,Knowhere😁'}
      </CustomText>
    </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({
  container:
  {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottiewView:
  {
    width: screenWidth * 0.6,
    height: 150,

  },
  orderPlaceText:
  {
    opacity: 0.4,
  },
  deliveryContainer:
  {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  deliveryText:
  {
    marginTop: 15,
    borderColor: Colors.secondary
  },
  addressText:
  {
    opacity: 0.8,
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
  },
})