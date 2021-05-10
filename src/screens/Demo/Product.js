import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Dimensions, FlatList, ToastAndroid, Modal, YellowBox, Picker} from 'react-native';
import Swipeout from 'react-native-swipeout';
import styles from './StyleProduct';
import ProductDAO from './ProductDAO';

import firebaseConfig from '../../firebase/firebase';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';


//Insert
const ProductInsert = (props) => {
    const [name, setName] = useState();
    const [image, setImage] = useState('https://reactjs.org/logo-og.png');
    const [price, setPrice] = useState();
    const [material, setMaterial] = useState();

    //choose image
    const _chooseImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [ 4, 3 ]
        });
        if (!result.cancelled)  {
            console.log(image);
            setImage(result.uri);

            console.log(data);
        }
    };

    return (
        <View style={styles.centeredView} >
            <View style={styles.modalView} >
                <Text style={styles.modalText}>ADD PRODUCT</Text>
                <TouchableOpacity onPress={() => _chooseImage()} >
                    <Image 
                        source={{ uri: image, width: 300, height: 200}}
                        style={{ borderWidth: 1, borderColor: 'black', margin: 10, alignSelf: 'center'}}
                    />
                </TouchableOpacity>

                <View style={styles.lineDialog}>
                    
                    <TextInput style={styles.textInputDialog} placeholder="Input name..." value={name} onChangeText={(text) => setName(text)} />
                </View>

                <View style={styles.lineDialog}>
                    
                    <TextInput style={styles.textInputDialog} placeholder="Input price..." value={price} onChangeText={(text) => setPrice(text)} />
                </View>

                <View style={styles.lineDialog}>
                    
                    <TextInput style={styles.textInputDialog} placeholder="Input material..." value={material} onChangeText={(text) => setMaterial(text)} />
                </View>

                <View style={styles.modelButton}>
                    

                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: 'black', padding: 8, marginVertical: 4}}
                        onPress={() => {
                            props._hideDialog();
                            ProductDAO.insert(name, image, price, material);
                        }} >

                            <Text style={styles.textStyle}>ADD</Text>

                        </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: 'black', padding: 8, marginVertical: 4}}
                        onPress={() => {
                            props._hideDialog();
                        }}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>

                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
};

//Update
const ProductUpdate = (props) => {
    const [ key, setKey ] = useState(props.item.key);
    const [ name, setName ] = useState(props.item.name);
    const [ image, setImage ] = useState(props.item.image);
    const [ price, setPrice ] = useState(props.item.price);
    const [ material, setMaterial ] = useState(props.item.material);

    //choose image
    const _chooseImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [ 4, 3 ]
        });
        if (!result.cancelled)  {
            console.log(image);
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.centeredView} >
            <View style={styles.modalView} >
                <Text style={styles.modalText}>UPDATE PRODUCT</Text>
                <TouchableOpacity onPress={() => _chooseImage()} >
                    <Image 
                        source={{ uri: image, width: 300, height: 200}}
                        style={{ borderWidth: 1, borderColor: 'black', margin: 10, alignSelf: 'center'}}
                    />
                </TouchableOpacity>

                <View style={styles.lineDialog}>
                    
                    <TextInput style={styles.textInputDialog} placeholder="Input name..." value={name} onChangeText={(text) => setName(text)} />
                </View>

                <View style={styles.lineDialog}>
                    
                    <TextInput style={styles.textInputDialog} placeholder="Input price..." value={price} onChangeText={(text) => setPrice(text)} />
                </View>

                <View style={styles.lineDialog}>
                    
                    <TextInput style={styles.textInputDialog} placeholder="Input material..." value={material} onChangeText={(text) => setMaterial(text)} />
                </View>

                <View style={styles.modelButton}>
                    

                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: 'black', padding: 8, marginVertical: 4}}
                        onPress={() => {
                            props._hideDialog();
                            ProductDAO.update(key, name, image, price, material);
                        }} >

                            <Text style={styles.textStyle}>UPDATE</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: 'black', padding: 8, marginVertical: 4}}
                        onPress={() => {
                            props._hideDialog();
                        }}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>

                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
};

const Product = () => {

    const [ data, setData ] = useState([]);
    const [ currentItem, setCurrentItem ] = useState(null);
    _setCurrent = async (item) => {
        await setCurrentItem(item);
    };

    const [ modalVisible, setModalVisible ] = useState(false);
    _hideDialog = () => {
        setModalVisible(false);
    };
    _showDialog = () => {
        setModalVisible(true);
    };

    const getAllProduct = () => {
        firebaseConfig.database().ref().child('Products').on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let item = {
                    key: child.key,
                    name: child.val().name,
                    image: child.val().image,
                    price: child.val().price,
                    material: child.val().material
                };
                items.push(item);
            });
            setData(items);
        });
    };
    useEffect(() => {
        console.log(data);
        getAllProduct();

        YellowBox.ignoreWarnings([ 'Setting a timer', 'Warning:' ]);
    }, []);

    const {width} = Dimensions.get('screen');
    const [value, setValue] = useState('thun');
    const [items, setItems] = useState([ {label: 'Áo thun', value: 'thun', selected: true},
                                         {label: 'Áo sơ mi', value: 'somi'},
                                         {label: 'Áo khoác', value: 'khoac'},
                                         {label: 'Giày', value: 'giay'},
                                         {label: 'Nón', value: 'non'},
                                        
                                        ]);
    let controller;
    

    return(
        <View style={styles.container}>
            {/* <Text style={styles.text}></Text> */}
            <View style={styles.header}>
                <Text style={styles.textHeader}>YAME'S PRODUCT</Text>
                <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    
                    _showDialog();
                    // ProductInsert(name, image, price, material);
                }}  >
                    <MaterialCommunityIcons name="plus-circle-outline" color={"white"} size={45}/>
                </TouchableOpacity>
            </View>

            <View style={styles.spinner}>

                <DropDownPicker
                    style={{paddingVertical: 10, marginHorizontal: 8, marginVertical: 5}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    containerStyle={{width, height: 50}}
                    itemStyle={{justifyContent: 'flex-start', marginHorizontal: 10}}
                    items={items}
                    controller={instance => controller = instance}
                    onChangeList={(items, callback) => {
                        new Promise((resolve, reject) => resolve(setItems(items)))
                            .then(() => callback())
                            .catch(() => {});
                    }}

                    defaultValue={value}
                    onChangeItem={item => setValue(item.value)}
                />
            
            </View>
            
            <FlatList style={{zIndex:1}} data={data} renderItem={({ item }) => <ListItem item={item} _showDialog={_showDialog} _setCurrent={_setCurrent} /> } />
            
            

                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    {currentItem ? (
                        <ProductUpdate item={currentItem} _hideDialog={_hideDialog} />
                    ) : (
                        <ProductInsert _hideDialog={_hideDialog} />
                    )}

                </Modal>
                
        </View>
    );

};

//Icon FlatList function
const ListItem = (props) => {
    //Cấu hình Swipeout
    const swipeoutSettings = {
        autoClose: true,
        onClose: () => {
            props._setCurrent(null);
        },
        onOpen: () => {
            props._setCurrent(props.item);
            console.log('Open Swipeout')
        },
        right: [
            {
                text: 'Update',
                type: 'secondary',
                onPress: () => {
                    props._setCurrent(props.item);
                    props._showDialog();
                }
            },
            {
                text: 'Delete',
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete',
                        'Bạn muốn xóa ' + props.item.name+ ' ?',
                        [
                            { text: 'Không', onPress: () => console.log('Cancel delete '), type: 'cancel'},
                            { text: 'Có', onPress: () => ProductDAO.delete(props.item.key) }
                        ],
                        { cancelable: true}
                            
                        );
                }
            }
        ]
    };
    return (
        <Swipeout {...swipeoutSettings}>
            <View style={styles.listContainer}>
                
                <Image
                    style={styles.thumb}
                    height={300}
                    source={{uri: props.item.image}}
                   
                />

                    <View style={styles.info}>
                        <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>{props.item.name}</Text>
                        <Text style={{marginLeft: 10, color: 'grey' }}>Chất liệu: {props.item.material}</Text>
                        <Text style={{marginLeft: 10, color: 'red' }}>Giá: {props.item.price} VNĐ</Text>
                    </View>
            </View>
        </Swipeout>
    );
};

export default Product;
