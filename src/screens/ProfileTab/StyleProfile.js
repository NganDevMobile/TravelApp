import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center'
        
      },
      text: {
          fontSize: 30,
        fontWeight: 'bold',
      },

      avtView: {
        
          alignItems: 'center',
         
          borderRadius: 80,
          marginVertical: 30,
        
          borderColor: 'grey'
      },
      avtImg: {
          height: 100,
          width: 100,
          borderRadius: 80,
          
      },

      viewpf: {
        flexDirection: 'row',
        padding: 3
      },

      textpf: {
          color: 'red',
          fontSize: 20,
          marginHorizontal: 3
      },

      editView: {
        flexDirection: 'row',
        padding: 3,

      },
      editText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 5,
        color: 'grey'
      },

      
      menu: {
        padding: 5,
        width,
        height: 150,
        marginVertical: 10,
      },

      address: {
        alignSelf: 'center',
        borderWidth: 1/2, 
        width: 300,
        height: 50,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor:'white',
        marginVertical: 10,     
        flexDirection: 'row',
    },

    textMenu: {
      fontSize: 18,
      alignItems: 'center',
      width: '75%',
      textAlign: 'center'
      
    },

    button: {
      alignItems: 'center',
      marginTop: 40,
      width: '85%',
      
      
    },


      signOut: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        backgroundColor:'#1a1a1a',
        marginVertical: 50,
        flexDirection: 'row'
    },
    textSignOut: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',

  }
});