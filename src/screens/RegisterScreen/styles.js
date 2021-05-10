import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({

    container : {
        flex: 1,
        paddingTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#21465b',
       
    },
   
    body : {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingTop: 15,
        marginTop: 20,
        paddingBottom: 15,
        flex:1
    },
    txtHello:{
        fontSize: 30,
        // fontFamily: 'Releway-Bold',
        alignSelf: 'center',
        fontWeight: 'bold',
        },
    txtNote:{
        marginTop: 8,
        alignSelf: 'center',
        fontSize: 16,
        // fontFamily: 'Raleway-Regular'
    },
    // Tiêu đề và ô nhập + icon 
    boxForm:{
        marginLeft: 20,
        marginRight: 20,
        // paddingBottom: 7,
        borderBottomWidth: 1,
        borderColor: '#707070',
    },
    // Input text và icon 
    inputForm:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtInput:{
        height: 35,
         color: '#1D2226',
        // fontFamily: 'Raleway-Bold',
        flex: 1,
    },
    imageIcon:{
        marginRight: 21,
        width: 13, height: 15,
        resizeMode: 'contain'
    },
    txtFogot:{
        color: '#21465b',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 22,
    },
    buttonLogin:{
        marginTop: 37,
        width: 200,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        backgroundColor: '#21465b',
        alignSelf: 'center',
        alignItems: 'center',
    },
    txtLogin:{
        color: '#fff',
        // fontFamily: 'Raleway-Bold',
        fontSize: 16,
    },
    txtUsing:{
        marginTop: 20,
        // fontFamily: 'Raleway-Bold',
        alignSelf: 'center'
    },
    boxSocial:{
        width: 80,
        justifyContent: 'space-between',
        marginTop: 28,
        flexDirection: 'row', 
        flex: 1,
        alignSelf: 'center',
    }, 
    icon:{
        resizeMode: 'contain', 
        width: 16, height: 12,
    }, txtLeft:{
        flexDirection: 'row',
        alignSelf: 'center',
         marginTop: 20,
        height: 85,
    },
    txtRegister: {
        // fontFamily: 'Raleway-Medium',
        color: '#fff',
        textDecorationLine: 'underline',
    }

})

export default styles;
