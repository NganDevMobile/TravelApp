import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
} from "react-native";
import ic_email from "../../assets/images/email.png";
import ic_password from "../../assets/images/password.png";
import ic_facebook from "../../assets/images/facebook.png";
import ic_gmail from "../../assets/images/gmail.png";
import styles from "./styles";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import firebaseConfig from "../../firebase/firebase";
import PasswordInputText from "react-native-hide-show-password-input";

console.disableYellowBox = true;
const _login = async (email, password, { navigation }) => {
  await firebaseConfig
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("Login Success!");
      ToastAndroid.show("Login success!", ToastAndroid.SHORT);
      navigation.navigate("Main");
      return true;
    })
    .catch((error) => {
      const { code, message } = error;
      console.log("Error", message);
      ToastAndroid.show("Login fail!" + message, ToastAndroid.SHORT);
      return false;
    });
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const checkLogin = () => {
    if (_login(email, password, { navigation })) {
    } else {
    }
  };

  const [check, setCheck] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      ></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.txtHello}>Hello</Text>
            <Text style={styles.txtNote}>Please login to your account.</Text>
          </View>
          {/* Box nhập email */}
          <View style={[styles.boxForm, { marginTop: 43 }]}>
            <Text style={{ fontFamily: "RalewayMedium" }}>Email Address</Text>
            <View style={styles.inputForm}>
              <TextInput
                style={styles.txtInput}
                value={email}
                placeholder={"Enter Email Address"}
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
              <TouchableOpacity>
                <Image style={styles.imageIcon} source={ic_email}></Image>
              </TouchableOpacity>
            </View>
          </View>
          {/* Box nhập password */}
          <View style={[styles.boxForm, { marginTop: 20 }]}>
            <Text>Password</Text>
            <View style={styles.inputForm}>
              <TextInput
                secureTextEntry={true}
                autoCapitalize="none"
                style={styles.txtInput}
                value={password}
                placeholder={"Enter Password"}
                onChangeText={(text) => setPassword(text)}
              ></TextInput>
              <TouchableOpacity>
                <Image style={styles.imageIcon} source={ic_password}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.txtFogot}>Fogot Password ?</Text>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              checkLogin();
            }}
          >
            <Text style={styles.txtLogin}>LOGIN</Text>
          </TouchableOpacity>
          {/* <Text style={styles.txtUsing}>Or Login using social media</Text> */}
          {/* Social */}
          {/* <View style={styles.boxSocial}>
                  <Image style={styles.icon} source={ic_facebook}></Image>
                  <Image style={styles.icon} source={ic_gmail}></Image>
                </View> */}
        </View>
      </ScrollView>

      {/* <View style={styles.txtLeft}>
                    <Text style={{ marginTop: 8,}}> Don’t have an account ? 
                    </Text >
                    <TouchableOpacity onPress={() => navigate('Register')}>
                          <Text style={styles.txtRegister} > Register now</Text>
                    </TouchableOpacity>
                  
                </View> */}
    </View>
  );
};

export default LoginScreen;
