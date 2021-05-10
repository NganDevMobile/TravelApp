import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image, ToastAndroid, ScrollView} from 'react-native'
import ic_email from '../../assets/images/email.png';
import ic_password from '../../assets/images/password.png';
import styles from './styles';
import ic_user from '../../assets/images/user.png'
import firebaseConfig from '../../firebase/firebase'


console.disableYellowBox = true;
const _register = async (email, password) =>{
    await firebaseConfig
    .auth()
    .createUserWithEmailAndPassword(email, password)
    then(user =>{
        console.log('Register Success!');
        ToastAndroid.show('Register Success!', ToastAndroid.SHORT)
        return true;
    })
    .catch(error => {
        const{code, message} = error;
        console.log('Error', message);
        ToastAndroid.show('Register Failed', ToastAndroid.SHORT)
        return false;
    })
}

const RegisterScreen = ({navigation: {navigate, goBack}}) => {
    const [check, setCheck] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState(true);

   

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor= 'transparent' translucent={true}></StatusBar>
            {/* <Image source={ic_logo} style = {{alignSelf: 'center'}}></Image> */}
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <View style={styles.body}>
                <Text style={styles.txtHello}>Register</Text>
                <Text style={styles.txtNote}>Create an account.</Text>
                {/* Box nhập full name */}
                <View style={[styles.boxForm, {marginTop: 30}]}>
                    <Text>Full Name</Text>
                    <View style={styles.inputForm}>
                        <TextInput style={styles.txtInput} placeholder={'Enter Full Name'} onChangeText={(text) => setName(text)}></TextInput>
                        <TouchableOpacity>
                            <Image style={styles.imageIcon} source={ic_user} ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Box nhập email */}
                <View style={[styles.boxForm, {marginTop: 20}]}>
                    <Text>Email Address</Text>
                    <View style={styles.inputForm}>
                        <TextInput style={styles.txtInput} placeholder={'Enter Email Address'} onChangeText={(text) => setEmail(text)}></TextInput>
                        <TouchableOpacity>
                            <Image style={styles.imageIcon} source={ic_email} ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Box nhập password */}
                <View style={[styles.boxForm, {marginTop:20}]}>
                    <Text>Password</Text>
                    <View style={styles.inputForm}>
                        <TextInput
                        secureTextEntry= {true}
                        autoCapitalize="none"
                        style={styles.txtInput} placeholder={'Enter Password'} onChangeText={(text) => setPassword(text)} ></TextInput>
                        <TouchableOpacity>
                            <Image style={styles.imageIcon} source={ic_password}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Box nhập lại password */}
                <View style={[styles.boxForm, {marginTop:20}]}>
                    <Text>Password Confirm</Text>
                    <View style={styles.inputForm}>
                        <TextInput
                        secureTextEntry= {true}
                        autoCapitalize="none"
                        style={styles.txtInput} placeholder={'Enter Password Confirm'} onChangeText={(text) => setPasswordConfirm(text)}></TextInput>
                        <TouchableOpacity>
                            <Image style={styles.imageIcon} source={ic_password}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity  style={styles.buttonLogin}  onPress={()=> _register(email, password)}>
                    <Text style={styles.txtLogin} >REGISTER</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>

                <View style={styles.txtLeft}>
                    <Text style={{color: 'gray'}}> ALready have an acount ? 
                    </Text>
                    <TouchableOpacity onPress={()=> navigate('Login', {value :'abc'})}>
                        <Text style={styles.txtRegister} > Login now</Text>
                    </TouchableOpacity>
                   
                </View>
           
        </View>
    )
}

export default RegisterScreen;
