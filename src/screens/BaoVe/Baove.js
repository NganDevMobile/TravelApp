import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import firebase from '../../firebase/firebase';

console.disableYellowBox = true;
 const BaoVe = () => {
	const itemsRef = firebase.database().ref().child('NhanVien');
	const [ lists, setLists ] = useState([]);

	// Function add Product vao lists
	const getALl = (itemsRef) => {
		itemsRef.on('value', (snap) => {
			var items = [];
			snap.forEach((child) => {
				let item = {
					key: child.key,
					MNV: child.val().MNV,
					Ten: child.val().Ten,
					CMND: child.val().CMND,
					GioiTinh: child.val().GioiTinh
				};
				items.push(item);
			});

			setLists(items);
		});
	};

	useEffect(() => {
		getALl(itemsRef);
	}, []);

	return (
		<View style={styles.container}>
			<FlatList data={lists} renderItem={({ item }) => <ProductItem item={item} />} />

		</View>
	);
};
export default BaoVe;

//Item FlatList & Delete function
const ProductItem = (props) => {
	return (
			<View style={styles.listContainer}>
				<View>
					<Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Mã nhân viên: {props.item.MNV}</Text>
					<Text style={{ marginLeft: 10,marginTop: 10, fontSize: 16 }}>Tên: {props.item.Ten}</Text>
					<Text style={{ marginLeft: 10, fontSize: 16  }}>CMND {props.item.CMND}</Text>
                    <Text style={{ marginLeft: 10, fontSize: 16  }}>Giới tính: {props.item.GioiTinh}</Text>
				</View>
			</View>
	);
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		flex: 1,
		backgroundColor: '#fff'
	},

	listContainer: {
		backgroundColor: '#f1f1f1',
		flexDirection: 'row',
		margin: width * 3.6 / 187.5,
		padding: width * 3.6 / 187.5,
		borderRadius: width * 3.6 / 187.5
	},
	fab: {
		height: 50,
		width: 50,
		borderRadius: 200,
		position: 'absolute',
		bottom: 20,
		right: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#686cc3'
	},
	text: {
		fontSize: 30,
		color: 'white'
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		width: width * 167.5 / 187.5,
		padding: width * 8 / 187.5,
		borderRadius: width * 3.6 / 187.5,

		margin: 20,
		backgroundColor: 'white',

		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		margin: 2,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		fontSize: 20,
		marginBottom: 15,
		textAlign: 'center'
	},
	lineDialog: {
		width: '100%',
		height: 40,
		margin: 8,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#f1f1f1'
	},
	textInputDialog: {
		height: 34,
		flex: 1,
		marginRight: 4,
		borderWidth: 0.1,
		borderRadius: 5,
		color: '#111111',

		fontSize: 15,
		paddingLeft: 5
	}
});
