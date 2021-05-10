import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import travel from '../../assets/images/travel.jpg'

const Choose = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
           <Image source={travel} style={{width: '100%',height: '90%'}}/>
           <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
               <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={{borderColor: '#fff', borderWidth: 1/2,alignItems: 'center', width: '50%',height: '100%', backgroundColor: '#21465b'}}>
                   <Text style={{fontSize: 25, color: '#fff',alignItems: 'center',marginTop: 25,
                    fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center'}}>SING IN</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=> navigation.navigate('Register')} style={{borderColor: '#fff', borderWidth: 1/2, alignItems: 'center', width: '50%',height: '100%', backgroundColor: '#21465b'}}>
                   <Text style={{fontSize: 25, color: '#fff',alignItems: 'center',marginTop: 25,
                    fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center'}}>SING UP</Text>
               </TouchableOpacity>
           </View>
        </View>
    )
}

export default Choose

const styles = StyleSheet.create({})
