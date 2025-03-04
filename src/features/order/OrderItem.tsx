import { Image, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
import UniversalAdd from '@components/ui/UniversalAdd'

const OrderItem:FC<{item:any}>= ({item}) => {
  return (
    <View style={styles.flexRow}>
        <View style={styles.imgConatiner}>
            <Image source={{uri:item?.item?.image}} style={styles.img}/>
        </View>
        <View style={{width:'55%'}}>
            <CustomText numberofLines={2} variant='h8' fontFamily={Fonts.Medium}>
                {item.item.name}
            </CustomText>
            <CustomText variant='h9'>
                {item.item.quantity}  
            </CustomText>

        </View>
        <View style={styles.addContainer}>
            <UniversalAdd item={item.item}/>
            <CustomText variant='h8' fontFamily={Fonts.Medium} style={styles.text}>₹{item.count*item.item.price}</CustomText>

        </View>
     
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    img:{
        width:40,
        height:40,
    },
    imgConatiner:
    {
        backgroundColor:Colors.backgroundSecondary,
        padding:10,
        borderRadius:15,
        width:'17%'
    },
    flexRow:
    {
        alignItems:'center',
        flexDirection:'row',
        gap:12,
        paddingHorizontal:10,
        paddingVertical:12,
        borderTopWidth:0.6,
        borderTopColor:Colors.border,
    },
    text:{
        alignSelf:'flex-end',
        marginTop:4
    },
    addContainer:
    {
        width:'20%',
        alignItems:'flex-end'
    }
   

})