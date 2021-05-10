import React from 'react'
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import firebaseConfig from '../../firebase/firebase'

// Xóa post
module.exports.delete = (key) =>{
    firebaseConfig
    .database
    .ref()
    .child('Posts')
    .child(key)
    .render()
    .then(() =>{
        console.log('Delete success');
        ToastAndroid.show('Delete success', ToastAndroid.SHORT)
    })
    .catch((error)=> {
        console.log('Delete fail');
        ToastAndroid.show('Delete fail', ToastAndroid.SHORT)
    })
}

// Upload image --> storage
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
// Insert post
module.exports.insert = async (post, image) => {
    const remoteUri = await _uploadImage(post, image);
    firebaseConfig
    .database()
    .ref('Post')
    .push({
        post: post,
        image: remoteUri,
        
       

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
    firebaseConfig.database().ref().child('Post').child(key).remove()
    .then(() => {
        console.log('Xóa thành công!');
        ToastAndroid.show('Xóa thành công!', ToastAndroid.SHORT);
    })
    .catch((error) => {
        console.log('Xóa thất bại!' + error);
        ToastAndroid.show('Xóa thất bại!', ToastAndroid.SHORT);
    });
};


// Update
module.exports.update = async (key, post, image) => {
    const remoteUri = await _uploadImage(post, image);
    firebaseConfig
    .database()
    .ref()
    .child('Post')
    .child(key)
    .set({
        post: post,
        image: remoteUri,
       
    })
    .then(() => {
        console.log('Update success!')
        ToastAndroid.show('Update success!', ToastAndroid.SHORT);
    })
    .catch((error) => {
        console.log('Update fail! ' + error)
        ToastAndroid.show('Update success!', ToastAndroid.SHORT);
    });
};



