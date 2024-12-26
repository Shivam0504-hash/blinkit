import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import strings from '@utils/string';

interface ArrowButtonProps {
    title: string;
    onPress?: () => void;
    price?: number;
    loading?: boolean;

}

const ArrowButton: FC<ArrowButtonProps> = ({ title, onPress, price, loading }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} disabled={loading} onPress={onPress} style={[styles.btn, { justifyContent: price != 0 ? 'space-between' : 'center' }]}>
            {price != 0 && price &&
                <View>
                    <CustomText variant='h7' style={{ color: 'white' }} fontFamily={Fonts.Medium}>{strings.rupay}{price + 34}{strings.rupay}</CustomText>
                    <CustomText variant='h9' style={{ color: 'white' }} fontFamily={Fonts.Medium}>{strings.total}</CustomText>
                </View>
            }
            <View style={styles.flexRow}>
                <CustomText variant='h6' style={{ color: '#fff' }} fontFamily={Fonts.Medium}>
                    {title}
                </CustomText>
                {loading ?
                    <ActivityIndicator
                        style={{ marginHorizontal: 5 }}
                        color='white'
                        size='small' /> :
                    <Icon name='arrow-right' color='#fff' size={RFValue(25)} />
                }

            </View>

        </TouchableOpacity>
    )
}

export default ArrowButton

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.secondary,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 12,
        marginVertical: 10,
        marginHorizontal: 15,

    },
    flexRow:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})