import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdCarousal from './AdCarousal'
import { adData, categories } from '@utils/dummyData'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from './CategoryContainer'
import strings from '@utils/string'

const ContentContainer = () => {
  return (
    <View style={styles.container}>
      {/* <AdCarousal adData={adData}/> */}
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>{strings.grocery}</CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>{strings.best}</CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>{strings.homestyle}</CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>{strings.snacks}</CustomText>
      <CategoryContainer data={categories} />
    </View>
  )
}

export default ContentContainer

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  }
})