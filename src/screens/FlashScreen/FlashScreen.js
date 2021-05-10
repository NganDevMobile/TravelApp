import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import LottieView from 'lottie-react-native';
import logo from '../../assets/images/flash.png'
console.disableYellowBox = true;
const FlashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() =>{
            navigation.navigate('Choose');
        }, 5000)
    })
    return (
        <View style={{alignItems: 'center',justifyContent: 'center', flex: 1}}>
      
            <Image style={{height: 200, width: 200, alignSelf: 'center',
                 }} source={logo}></Image>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 20, color: '#21465b'}}>Trip Advisor</Text>

        </View>
    )
}

export default FlashScreen

const styles = StyleSheet.create({})
