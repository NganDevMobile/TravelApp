import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ToastAndroid, Image } from 'react-native';
import styles from './StyleProfile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import dataConfig from '../../firebase/firebase';

console.disableYellowBox = true;
const _logOut = ({navigation}) => {

    dataConfig.auth().signOut().then(() => {
        // Sign-out successful.
        ToastAndroid.show('Đã đăng xuất!', ToastAndroid.SHORT);
        // navigation.navigate('Login');
      }).catch((error) => {
        // An error happened.
      });

}
const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.avtView}>
                <Image
                    style={styles.avtImg}
                    width={80}
                    height={80}
                    source={{uri: "https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-75-512.png"}}
                />
            </View>
            <TouchableOpacity style={styles.editView} onPress={() =>  ToastAndroid.show('Open edit profile', ToastAndroid.SHORT)}>
                <Text style={styles.editText}>Edit profile</Text>
            </TouchableOpacity>

                <View style={styles.menu}>
                <TouchableOpacity style={styles.address} onPress={() =>  ToastAndroid.show('Manage Address', ToastAndroid.SHORT)}>
                    <Feather style={{marginHorizontal: 10}} name="info" color={"#1a1a1a"} size={20} />
                    <Text style={styles.textMenu}>Manage Address</Text>
                    <MaterialIcons name="navigate-next" color={"gray"} size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.address} onPress={() =>  ToastAndroid.show('Favorites', ToastAndroid.SHORT)}>
                    <FontAwesome style={{marginHorizontal: 10}} name="heart-o" color={"#1a1a1a"} size={20} />
                    <Text style={styles.textMenu}>Favorites</Text>
                    <MaterialIcons name="navigate-next" color={"gray"} size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.address} onPress={() =>  ToastAndroid.show('Settings', ToastAndroid.SHORT)}>
                    <Feather style={{marginHorizontal: 10}} name="settings" color={"#1a1a1a"} size={20} />
                    <Text style={styles.textMenu}>Settings</Text>
                    <MaterialIcons name="navigate-next" color={"gray"} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.address} onPress={() =>  ToastAndroid.show('Settings', ToastAndroid.SHORT)}>
                    <AntDesign style={{marginHorizontal: 10}} name="logout" color={"#1a1a1a"} size={20} />
                    <Text style={styles.textMenu}>Logout</Text>
                    <MaterialIcons name="navigate-next" color={"gray"} size={20} />
                </TouchableOpacity>
            </View>


            {/* <View style={styles.button}>
                <TouchableOpacity style={styles.signOut} onPress={() =>  _logOut()}>
                    <MaterialCommunityIcons style={{marginHorizontal: 10}} name="export" color={"white"} size={30} />
                    <Text style={styles.textSignOut}>SIGN OUT</Text>
                </TouchableOpacity>
            </View> */}
            
        </View>
        )
};

export default ProfileScreen;