import React, {useEffect} from 'react'
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
console.disableYellowBox = true;
const {width, height} =  Dimensions.get('window');

// List slider
const slides = [
    {
      key: "one",
      title: "PLAN A TRIP",
      text:
        "Descripption. \nSay something cool",
        
      image: require("../../assets/images/1.jpg"),
    },
    {
      key: "two",
      title: "START YOUR JOURNEY",
      text:
        "Order coolstuff",
      image: require("../../assets/images/onboard.jpg")
    },
    {
      key: "three",
      title: "TRIP SCHEDULE",
      text:
        "I'm already out of description\n\nLorem ipsum bla bla bla",
        image: require("../../assets/images/3.jpg"),
    },
  ];
  
  export default class App extends React.Component {

    
    state = { showHomePage: false };
    _renderItem = ({ item }) => {
      return (
        <View style={{flex: 1}}>
          <Image
            source={item.image}
            style={{
              resizeMode: "cover",
              height: "73%",
              width: "100%",
            }}
          />
          <Text
            style={{
              paddingTop: 25,
              paddingBottom: 10,
              fontSize: 23,
              fontWeight: "bold",
              color: "#21465b",
              alignSelf: "center",
            }}
          >
            {item.title}
          </Text>
  
          <Text style={{
            textAlign:"center",
            color:"#000",
            fontSize:15,
            paddingHorizontal:30
          }}>
            {item.text}
          </Text>
        </View>
      );
    };
    _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
           <Text style={{color: "#000"}}>Next</Text>
          </View>
        );
      };
      _renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
             <Text style={{color: "#000"}}>Done</Text>
          </View>
        );
      };
  
    render() {
      if (this.state.showHomePage){
        return <App/>
      } else 

    
      return (
      <AppIntroSlider
        showNextButton={true}
        showDoneButton={true}
        renderItem={this._renderItem} 
        data={slides} 
        activeDotStyle={{
          backgroundColor:"#21465b",
          width:30
        }}
       />
      );
    }
    
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
  });
