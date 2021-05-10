import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Dimensions, FlatList, ToastAndroid } from 'react-native';
import Swipeout from 'react-native-swipeout';
import styles from './StyleProduct';

import firebaseConfig from '../../firebase/firebase';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

//function upload image

const _uploadImage = async (name, uri) => {
    const path = 'images/' + name + '.jpg';
    return new Promise(async ( res, rej) => {
        const response = await fetch(uri);
        const file = await response.blob();

        let upload = firebaseConfig.storage().ref(path).put(file);

        upload.on(
            'state_changed',
            (snapshot) => {},
            (err) => {
                rej(err);
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
        );
    });
};

// function insert
module.exports.insert = async (name, image, price, material) => {
    const remoteUri = await _uploadImage(name, image);
    firebaseConfig
    .database()
    .ref()
    .child('Products')
    .push({
        name: name,
        image: remoteUri,
        price: price,
        material: material
    })
    .then(() => {
        console.log('Thêm thành công!')
        ToastAndroid.show('Thêm thành công!', ToastAndroid.SHORT);
    })
    .catch((error) => {
        console.log('Thêm thất bại! ' + error)
        ToastAndroid.show('Thêm thất bại!', ToastAndroid.SHORT);
    });
};

//function delete
module.exports.delete = (key) => {
    firebaseConfig.database().ref().child('Products').child(key).remove()
    .then(() => {
        console.log('Xóa thành công!');
        ToastAndroid.show('Xóa thành công!', ToastAndroid.SHORT);
    })
    .catch((error) => {
        console.log('Xóa thất bại!' + error);
        ToastAndroid.show('Xóa thất bại!', ToastAndroid.SHORT);
    });
};

//function update

module.exports.update = async (key, name, image, price, material) => {
    const remoteUri = await _uploadImage(name, image);
    firebaseConfig
    .database()
    .ref()
    .child('Products')
    .child(key)
    .set({
        name: name,
        image: remoteUri,
        price: price,
        material: material
    })
    .then(() => {
        console.log('Update thành công!')
        ToastAndroid.show('Update thành công!', ToastAndroid.SHORT);
    })
    .catch((error) => {
        console.log('Update thất bại! ' + error)
        ToastAndroid.show('Update thất bại!', ToastAndroid.SHORT);
    });
};