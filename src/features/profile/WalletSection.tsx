import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants'
import WalletItem from './WalletItem'

const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
      <WalletItem icon='wallet-outline' label='wallet' />
      <WalletItem icon='chatbubble-ellipses-outline' label='Support' />
      <WalletItem icon='card-outline' label='Payments' />

    </View>
  )
}

export default WalletSection

const styles = StyleSheet.create({
  walletContainer:
  {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginVertical: 20,
  }
})