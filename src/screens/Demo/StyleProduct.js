import { StyleSheet, Dimensions, Platform } from 'react-native';

const {width} = Dimensions.get('screen');
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
      },

      header: {
        width,
        height: 60,
        backgroundColor: 'black',
        marginTop: 25,
        alignItems: 'center',
        padding: 5,
      },

      textHeader: {
        fontSize: 27,
        fontWeight: 'bold',
        marginVertical: 5,
        color: 'white',
      },

      spinner: {
        zIndex: 2,
        height: 55,
      },

      listContainer: {
          marginVertical: 10,
          marginHorizontal: 8,
          backgroundColor: 'white',
          borderRadius: 8,
      },

      thumb: {
        height: 300,
        alignItems: 'center',
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        
      },

      info: {
        padding: 8
      },

      fab: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        top: 5,
        // borderRadius: 50,
        // backgroundColor: 'gray',
        
      },

      text: {
        color: 'black',
        fontSize: 25,
        
      }, 

      textFab: {
        color: 'white',
        fontSize: 25,
        resizeMode: 'contain',
        alignContent: 'center',
        
        
      },
      centeredView: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'
      },
      modalView: {
        alignContent: 'center',

      },
      modalText: {
        textAlign: 'center',
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginVertical: 8,
        marginHorizontal: 8
      },
      lineDialog: {
        borderWidth: 0.5,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 8,
        padding: 10
      },
      textDialog: {

      },
      textInputDialog: {
        color: 'black'
      },
      modelButton: {
        
        padding: 16
      },
      openButton: {

      },
      textStyle: {
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 20
      }

    //   listContainer: {
    //     backgroundColor: '#f1f1f1',
    //     flexDirection: 'row',
    //     margin: width * 3.6 / 187.5,
    //     padding: width * 3.6 / 187.5,
    //     borderRadius: width * 3.6 / 187.5
    //   }
});