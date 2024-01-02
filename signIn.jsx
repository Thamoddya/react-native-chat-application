import React, { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignIn({ navigation }) {

  const [mobile, setmobile] = useState(null);
  const [password, setpassword] = useState(null);
  const [customText, setCustomText] = useState('Enter The Mobile & Password Correctly');

  const signUp = () => {
    navigation.navigate('sign Up');
  }

  const signInui = (
    <SafeAreaView >
      <ImageBackground source={require('./images/pexels-kursat-akkoyunlu-3681242.jpg')} resizeMode="cover" style={signInstyle.image} >
        <Text style={signInstyle.text1}> Sign In</Text>
        <Text style={signInstyle.text2}> Welcome To Chat App</Text>
        <Image
          style={signInstyle.profile}
          source={require('./images/ic_launcher.png')}
        />
        <View style={signInstyle.view1}>
          <TextInput
            style={signInstyle.mobileInput}
            placeholder={'Enter your mobile'}
            keyboardType={'phone-pad'}
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={10}
            onChangeText={setmobile}
            placeholderTextColor={'gray'}
            defaultValue='07'
          />
          <Icon
            name="mobile"
            size={40}
            color={'white'}
            style={signInstyle.inputIcon1}
          />
        </View>
        <View style={signInstyle.view2}>
          <TextInput
            style={signInstyle.passwordInput}
            placeholder={'Enter your password'}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={setpassword}
            placeholderTextColor={'gray'}
          />
          <Icon
            name="lock"
            size={32}
            color={'white'}
            style={signInstyle.inputIcon2}
          />
        </View>
        <View style={signInstyle.view2}>
          <Text style={{
            color: 'red',
            padding: 10,
            fontSize: 18
          }}>{customText}</Text>
        </View>
        <Pressable style={signInstyle.Button1} onPress={signinprocess}>
          <Text style={signInstyle.Button1Text}>Sign In</Text>
        </Pressable>
        <Pressable style={signInstyle.Button2} onPress={signUp}>
          <Text style={signInstyle.Button2Text}>Sign Up</Text>
        </Pressable>

        <View style={{ marginTop: '100%' }}>
          <Button title='Test' />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
  return signInui;

  function signinprocess() {
    var jsRequestObject = { mobile: mobile, password: password };
    var jsonRequestText = JSON.stringify(jsRequestObject);

    var request = new XMLHttpRequest();
    var form = new FormData();
    form.append('jsonRequestText', jsonRequestText);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var jsResponseobject = JSON.parse(request.responseText);
        if (jsResponseobject.msg == 'Success') {

          AsyncStorage.setItem('user', JSON.stringify(jsResponseobject.user));
          const obj = jsResponseobject.user.name;
          navigation.navigate('Preload', obj);

        } else {
          setCustomText(jsResponseobject.msg);
        }
      }
    };
    request.open('POST', `http://${res[0]}/react_chat/signin.php`, true);
    request.send(form);
  }
}

const signInstyle = StyleSheet.create({

  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text1: {
    marginTop: 25,
    fontSize: 35,
    color: '#a8dadc',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text2: {
    marginTop: 25,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 25,
    marginBottom: 20,
    marginLeft: 150
  },
  mobileInput: {
    width: '88%',
    height: 55,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 25,
    paddingLeft: 40,
    color: 'black',
  },
  passwordInput: {
    width: '88%',
    height: 55,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 25,
    paddingLeft: 40,
    color: 'black',
  },
  view1: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  view2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon1: {
    position: 'absolute',
    left: 40,
  },
  inputIcon2: {
    position: 'absolute',
    left: 40,
  },
  Button1: {
    width: '90%',
    height: 45,
    backgroundColor: '#0080ff',
    borderRadius: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  Button2: {
    width: '90%',
    height: 45,
    backgroundColor: '#00ff80',
    borderRadius: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  Button1Text: {
    fontSize: 27,
    color: 'white',
  },
  Button2Text: {
    fontSize: 27,
    color: 'white',
  },
});
