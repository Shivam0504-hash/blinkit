import { Image, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Carousel from 'react-native-reanimated-carousel'
import ScalePress from '@components/ui/ScalePress'

const AdCarousal: FC<{ adData: any }> = ({ adData }) => {
  const progressvalue = useSharedValue(0)
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.5,
  }
  return (
    <View style={styles.container}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        mode='parallax'
        data={adData}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.94,
        }}
        renderItem={({ item }: any) => {
          return (
            <ScalePress style={styles.imageContainer}>
              <Image
                source={item}
                style={styles.img}
              />
            </ScalePress>
          )
        }}
      />
    </View>
  )
}

export default AdCarousal

const styles = StyleSheet.create({

  container:
  {
    left: -20,
    marginVertical: 20

  },
  imageContainer:
  {
    width: '100%',
    height: '100%',

  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20
  }
})