import { useEffect } from 'react';
import React, { useState } from 'react';
import { Alert, ImageBackground } from 'react-native';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './response';

const emoji = '❤️';
const codePoint = emoji.codePointAt(0).toString(16);

const decodedEmoji = String.fromCodePoint('0x' + codePoint);

export const Chat = ({ route, navigation }) => {

  const [chatHistory, setchatHistory] = useState([]);
  const [chatText, SetChatText] = useState(null);
  const [ssid, setSsid] = useState('');
  const [id, setId] = useState('');
  const [image, NewImage] = useState('');

  const getssid = () => {
    const formData = new FormData();
    formData.append('id', id);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        setSsid(request.responseText);
      }
    };
    request.open('POST', `http://${res[0]}/react_chat/getssid.php`, true);
    request.send(formData);
  };
  getssid();


  async function SendRequest() {
    var userJsonText = await AsyncStorage.getItem('user');
    if (userJsonText != null) {
      var userJsObject = JSON.parse(userJsonText);
      setId(userJsObject.id);
      NewImage(userJsObject.profile_url);
      var form1 = new FormData();
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        form1.append('Id1', userJsObject.id);
        form1.append('Id2', route.params.id);

        if (request.readyState == 4 && request.status == 200) {
          var jsResponseObjectArray = JSON.parse(request.responseText);
          setchatHistory(jsResponseObjectArray);
        }
      };
      request.open('POST', `http://${res[0]}/react_chat/load_chat.php`, true);
      request.send(form1);
    }
  };


  async function saveChat() {

    if (ssid == '') {
      Alert.alert("wait");
    }
    else {
      var userJsonText = await AsyncStorage.getItem('user');
      var userJsObject = JSON.parse(userJsonText);
      var requestObject = {
        from_user_id: userJsObject.id,
        to_user_id: route.params.id,
        message: chatText,
        ssid: ssid,
      };

      const formData = new FormData();
      formData.append('requestJson', JSON.stringify(requestObject));
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4) {
          console.log(request.responseText);
        }
      };
      request.open('POST', `http://${res[0]}/react_chat/saveChat.php`, true);
      request.send(formData);
    };

  };
  async function saveChat2() {

    if (ssid == '') {
      Alert.alert("wait");
    }
    else {
      var userJsonText = await AsyncStorage.getItem('user');
      var userJsObject = JSON.parse(userJsonText);
      var requestObject = {
        from_user_id: userJsObject.id,
        to_user_id: route.params.id,
        message: codePoint,
        ssid: ssid,
      };

      const formData = new FormData();
      formData.append('requestJson', JSON.stringify(requestObject));
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4) {
          console.log(request.responseText);
        }
      };
      request.open('POST', `http://${res[0]}/react_chat/saveChat.php`, true);
      request.send(formData);
    };

  };

  const chatui = (
    <SafeAreaView style={chatstyle.main}>
      <View style={chatstyle.mainView}>
        <Image source={{ uri: `http://${res[0]}/react_chat/${image}` }} style={chatstyle.profile} />
        <Image source={{ uri: route.params.img }} style={chatstyle.profile} />
        <View style={{ paddingLeft: 20 }}>
          <View>
            <Text style={chatstyle.text2}>{route.params.name}</Text>
          </View>
          <View style={{ marginEnd: 20 }}>
            <Text style={chatstyle.text3}>{route.params.state == '0' ? "Last Seen at " + route.params.time2 : "Online"}</Text>
          </View>
        </View>
      </View>
      <ImageBackground style={{ flex: 1, width: '100%', backgroundColor: 'hsla(360 100% 100% / 1.0)', borderColor: '#e63946', borderWidth: 0.5 }} source={require('./images/pexels-marcelo-dias-2010877.jpg')}>
        <FlatList
          data={chatHistory}
          renderItem={chatItem}
          style={{ width: '100%', height: 630 }}
        />
        <View style={chatstyle.sendView}>
          <TextInput
            style={chatstyle.ChatBar}
            placeholder={'Enter your message'}
            autoCorrect={false}
            onChangeText={SetChatText}
            aria-expanded={true}
            placeholderTextColor={'#a8dadc'}
          />
          <Pressable onPress={saveChat}>
            <Icon
              name="send"
              size={30}
              color="black"
              style={chatstyle.sendIcon}
            />
          </Pressable>
          <Pressable onPress={saveChat2}>
            <Icon
              name="heart"
              size={30}
              color="black"
              style={chatstyle.sendIcon}
            />
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );

  function start() {
    setInterval(SendRequest, 2500);
  }
  useEffect(start, []);

  return chatui;
}

function chatItem({ item }) {
  const chaItemui = (
    <View
      style={
        item.side == 'right' ? chatstyle.chatViewRight : chatstyle.chatViewLeft
      }>
      <Text style={chatstyle.chatText4}>{item.msg == "2764" ? emoji : item.msg}</Text>
      <View style={chatstyle.chatView1}>
        <Text style={chatstyle.chatText3}>{item.time}</Text>
        {item.side == 'right' ? (
          <Icon
            name="check"
            size={15}
            style={
              item.status == 'seen' ? chatstyle.chatIconseen : chatstyle.chaticonsent
            }
          />
        ) : null}
      </View>
    </View>
  );
  return chaItemui;
};

const chatstyle = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: '#31587a',
    padding: 30,
  },
  sendView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    paddingEnd: 20
  },
  ChatBar: {
    color: '#cdeae5',
    width: '70%',
    height: 48,
    borderRadius: 15,
    borderWidth: 2,
    paddingLeft: 10,
    fontSize: 20,
    borderColor: '#a8dadc',
  },
  sendIcon: {
    color: '#e63946',
    paddingLeft: 15,
  },
  chatIconseen: {
    color: 'green',
  },
  chaticonsent: {
    color: 'red',
  },
  chatText3: {
    fontSize: 13,
    color: 'black',
  },
  chatText4: {
    color: 'black',
    fontSize: 16,
  },
  chatViewRight: {
    color: 'black',
    backgroundColor: '#80ed99',
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginRight: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  chatViewLeft: {
    color: 'black',
    backgroundColor: '#80ffff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginLeft: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  chatView1: {
    flexDirection: 'row',
    alignItems: 'center',
    right: -12,
    color: 'black',
  },
  main: {
    flex: 1,
    alignItems: 'center',
  },
  text1: {
    marginTop: 10,
    fontSize: 35,
    fontFamily: 'Dancing Script',
    color: 'black',
  },
  profile: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginTop: 20,
    borderWidth: 1,
    margin: 5,

  },
  text2: {
    marginTop: 15,
    fontSize: 23,
    color: '#a8dadc',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'justify'
  },
  text3: {
    fontSize: 15,
    color: '#b5bdc8',
    marginBottom: 0,
    textAlign: 'justify',
  },
});