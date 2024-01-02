import React, { useState } from 'react';
import {
  Alert,
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
import SelectDropdown from 'react-native-select-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import './response';

export function SignUp({ navigation }) {
  const [MobileNumber, SetMobileNumber] = useState('');
  const [Name, SetName] = useState('');
  const [Password, SetPassword] = useState('');
  const [RePassword, SetRePassword] = useState('');
  const [Country, SetCountry] = useState('');
  const [ProfileImage, SetProfileImage] = useState(null);
  const [countries, SetCountriesArray] = useState([]);

  function loadCountries() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        SetCountriesArray(JSON.parse(request.responseText));
      }
    };
    request.open('GET', `http://${res[0]}/react_chat/loadCountries.php`, true);
    request.send();
  }
  loadCountries();


  const signIn = () => {
    navigation.navigate('Sign In');
  }

  const signUpui = (
    <SafeAreaView >
      <ImageBackground source={require('./images/pexels-kursat-akkoyunlu-3681242.jpg')} resizeMode="cover" style={{
        width: '100%',
        height: '100%',
      }}>
        <Text style={signUpstyle.text1}>Sign UP</Text>
        <Pressable onPress={SelectProfileImage}>
          <Image
            source={require('./images/addIcon.png')}
            style={signUpstyle.profile}
          />
        </Pressable>
        <View style={signUpstyle.view1}>
          <TextInput
            style={signUpstyle.textInput1}
            placeholder={'Enter Your name'}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={SetName}
            placeholderTextColor="white"
          />
          <Icon
            style={signUpstyle.textinputIcon1}
            name="user"
            size={30}
            color="black"
          />
        </View>
        <View style={signUpstyle.view2}>
          <TextInput
            style={signUpstyle.textInput2}
            placeholder={'Enter Your mobile'}
            autoCorrect={false}
            keyboardType={'phone-pad'}
            onChangeText={SetMobileNumber}
            placeholderTextColor="white"
          />
          <Icon
            style={signUpstyle.textinputIcon2}
            name="mobile"
            size={35}
            color="black"
          />
        </View>
        <View style={signUpstyle.view3}>
          <TextInput
            style={signUpstyle.textInput3}
            placeholder={'Enter Your password'}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={SetPassword}
            placeholderTextColor="white"
          />
          <Icon
            style={signUpstyle.textinputIcon3}
            name="lock"
            size={30}
            color="black"
          />
        </View>
        <View style={signUpstyle.view4}>
          <TextInput
            style={signUpstyle.textInput4}
            placeholder={'Re enter Your password'}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={SetRePassword}
            placeholderTextColor="white"
          />
          <Icon
            style={signUpstyle.textinputIcon4}
            name="lock"
            size={30}
            color="black"
          />
        </View>
        <View style={signUpstyle.view4}>

          <SelectDropdown
            defaultButtonText="Select Country"

            data={countries}
            buttonTextStyle={{
              color: "white",
            }}
            onSelect={SetCountry}
            buttonStyle={{
              marginTop: 10,
              marginLeft: 10,
              alignItems: 'center',
              borderRadius:20,
              color: "white",
              backgroundColor:'#1d3557'
            }}
          />
        </View>

        <View style={{
          alignContent: 'center',
          justifyContent: 'center',
          marginLeft:'20%'
        }}>
        <Pressable style={signUpstyle.Button1} onPress={SignUpRequest}>
          <Text style={signUpstyle.Button1Text}>Sign Up</Text>
        </Pressable>
        <Pressable style={signUpstyle.Button2} onPress={signIn}>
          <Text style={signUpstyle.Button2Text}>back to sign In</Text>
        </Pressable>
        </View>
        
      </ImageBackground>

    </SafeAreaView>
  );
  return signUpui;

  async function SelectProfileImage() {
    // Alert.alert("Test");

    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    if (result.didCancel) {
      Alert.alert('ALert', 'No Image Selected!');
    } else {
      // const content = result.assets['0'].uri;
      // Alert.alert('ALert', content);

      const ImageObject = {
        uri: result.assets['0'].uri,
        name: 'ProfilePic',
        type: 'image/png',
      };
      SetProfileImage(ImageObject);
    }
  }
  function SignUpRequest() {
    let form = new FormData();
    form.append("ProfileImage", ProfileImage);
    form.append("Name", Name);
    form.append('mobile', MobileNumber);
    form.append("Password", Password);
    form.append("VerifyPassword", RePassword);
    form.append("Country", Country);

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        Alert.alert('Response', request.responseText);
      }
    };
    request.open('POST', `http://${res[0]}/react_chat/signUp.php`, true);
    request.send(form);
  }
}

const signUpstyle = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  text1: {
    fontSize: 35,
    color: 'white',
    marginTop: 20,
    textAlign: 'center'
  },
  profile: {
    width: 90,
    height: 90,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '40%'
  },
  view1: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput1: {
    width: '85%',
    height: 55,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#457b9d',
    paddingLeft: 43,
    fontSize: 22,
    color: '#f1faee',
  },
  textinputIcon1: {
    position: 'absolute',
    left: 40,
    color: '#ec9a9a'
  },
  view2: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput2: {
    width: '85%',
    height: 55,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#457b9d',
    paddingLeft: 43,
    fontSize: 22,
    color: '#f1faee',
  },
  textinputIcon2: {
    position: 'absolute',
    left: 43,
    color: '#ec9a9a'
  },
  view3: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput3: {
    width: '85%',
    height: 55,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#457b9d',
    paddingLeft: 43,
    fontSize: 22,
    color: '#f1faee',
  },
  textinputIcon3: {
    position: 'absolute',
    left: 43,
    color: '#ec9a9a'
  },
  view4: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput4: {
    width: '85%',
    height: 55,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#457b9d',
    paddingLeft: 43,
    fontSize: 22,
    color: '#f1faee',
  },
  textinputIcon4: {
    position: 'absolute',
    left: 43,
    color: '#ec9a9a'
  },
  Button1: {
    width: '70%',
    height: 45,
    backgroundColor: '#0080ff',
    borderRadius: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button2: {
    width: '70%',
    height: 45,
    backgroundColor: '#00ff80',
    borderRadius: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
