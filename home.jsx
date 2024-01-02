import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ImageBackground,
  TouchableHighlight,
  FileSystem
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './response';
import NetInfo from "@react-native-community/netinfo";
import DashedLine from 'react-native-dashed-line';


NetInfo.fetch().then(state => {
  console.log(state.isConnected);
  if (!state.isConnected) {
    Alert.alert(
      'No Network Connection',
      'Please check your network connection and try again.',
      [{
        text: 'OK', onPress: () => {
          for (var x = 0; state.isConnected == 'true'; x++) {
            Alert.alert("Enable Connection");
          };
        }
      }]
    );
  }
});


export const Home = ({ route, navigation }) => {

  const [homeusers, setHomeUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const LoadFriendList = async (text) => {
    var userJsonText = await AsyncStorage.getItem('user');
    if (userJsonText != null) {
      var request = new XMLHttpRequest();
      var form = new FormData();
      form.append('userJsonText', userJsonText)
      form.append("text", text);
      request.onreadystatechange = function () {
        if (request.readyState == 4) {
          let responseJSOn = JSON.parse(request.responseText);
          setHomeUsers(responseJSOn);
        }
      };
      request.open('POST', `http://${res[0]}/react_chat/load_user.php`, true);
      request.send(form);

    }
  }

  function test() {
    LoadFriendList();
  }
  useEffect(test, []);

  function getItem(text) {
    setSearchText(text);
    LoadFriendList(text);
  }
  const homeui = (

    <SafeAreaView style={homeStyle.main}>
      <View style={{ backgroundColor: '#1d3557', width: '100%' }}>
        <View style={{
          paddingTop: 35,
          paddingLeft: 30,
          flexDirection: 'row',
          backgroundColor: '#1d3557'
        }}>
          <Image source={{ uri: `http://${res[0]}/react_chat/` + route.params.pic }} style={{
            height: 45,
            width: 45,
            borderRadius: 30
          }} />
          <Pressable onPress={navigateToProfile}>
            <Text style={{
              color: 'white',
              fontSize: 20,
              paddingTop: 12,
              paddingLeft: 10,
              fontFamily: 'Montserrat-Medium',
              letterSpacing: -2
            }}>{route.params.name}</Text>
          </Pressable>
        </View>
        <View >
          <TextInput style={{
            marginTop: 25,
            color: 'white',
            height: 40,
            borderRadius: 10,
            alignContent: "center",
            justifyContent: "center",
            width: '75%',
            backgroundColor: "#4a4e69",
            marginLeft: 20
          }}
            onChangeText={getItem}
            placeholder='Search Users'
            placeholderTextColor={"#6c757d"}
          />
          <Icon name="search" style={{
            position: 'absolute',
            right: 50,
            marginTop: 34,
            fontSize: 20
          }} />
        </View>
        <View >
          <Text style={{
            alignItems: 'flex-start',
            color: 'white',
            fontSize: 25,
            paddingTop: 10,
            paddingLeft: 35,
            fontFamily: 'Roboto',
            fontWeight: "400",
            lineHeight: 34
          }}>Favourites</Text>
          <FlatList data={homeusers} renderItem={stateItems} style={{ backgroundColor: '#1d3557', width: '100%' }} horizontal={true} showsHorizontalScrollIndicator={false} />
        </View>
        <View>


        </View>
        <DashedLine
          dashLength={5} dashThickness={5} dashGap={8} dashColor='#a8dadc' dashStyle={{ borderRadius: 5 }}
          style={
            {
              width: "50%",
              marginLeft: '25%'
            }} />
      </View>
      <FlatList data={homeusers} renderItem={homeItem} style={{ backgroundColor: '#1d3557', width: '100%', }} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );

  function navigateToProfile() {
    navigation.navigate('Profile');
  }

  return homeui;

  function homeItem({ item, route }) {

    const homeitemUi = (
      <Pressable onPress={GoToChat}>
        <View style={homeStyle.userMainView}>
          <Image
            style={{
              width: 68,
              height: 68,
              borderRadius: 35,
              borderColor: `${item.state == '0' ? 'blue' : 'green'}`,
              borderWidth: 4
            }}
            source={{ uri: `http://${res[0]}/react_chat/` + item.pic }}
          />
          <View style={homeStyle.userSubView1}>
            <Text style={homeStyle.userName}>{item.name}</Text>
            <Text style={homeStyle.latestChat}>{item.msg}</Text>
          </View>
          <View style={homeStyle.userSubView2}>
            <Text style={homeStyle.time}>{item.time}</Text>
            <View style={{
              width: 27,
              height: 27,
              borderRadius: 20,
              backgroundColor: `${item.state == '0' ? '#4646ff' : 'green'}`,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={homeStyle.count}>{item.count}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );

    return homeitemUi;

    function GoToChat() {

      const Obj = {
        name: item.name,
        id: item.id,
        img: `http://${res[0]}/react_chat/` + item.pic,
        quote: item.quote,
        time2: item.time2,
        state: item.state
      };
      navigation.navigate('Chat', Obj);
    };
  };

  function stateItems({ item, route }) {

    const homeitemUi = (

      <Pressable onPress={GoToChat}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',

        }}>
          <View style={{
            padding: 10,
            alignItems: 'flex-end',
            justifyContent: 'center',
            flexDirection: 'row',

          }}>
            <Image style={{
              width: 120,
              height: 140,
              borderRadius: 30,
              backfaceVisibility: 'hidden'
            }}
              source={{ uri: `http://${res[0]}/react_chat/` + item.pic }} resizeMode='cover' />
          </View>
        </View>
      </Pressable>

    );
    return homeitemUi;

    function GoToChat() {

      const Obj = {
        name: item.name,
        id: item.id,
        img: `http://${res[0]}/react_chat/` + item.pic,
        quote: item.quote,
        time2: item.time2,

      };
      navigation.navigate('Chat', Obj);
    };

  };

};



const homeStyle = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  homeText1: {
    fontSize: 30,
    color: 'white',
    padding: 20
  },
  textinput1: {
    marginTop: 20,
    width: '87%',
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 20,
    paddingLeft: 10,
  },
  inputIcon: {
    position: 'absolute',
    right: 40,
    paddingTop: 20,
    color: '#023047'
  },
  view1: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },

  userMainView: {
    marginVertical: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingVertical: 13,
  },
  userSubView1: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    width: '53%',
  },
  userSubView2: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '23%',
  },

  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500'
  },
  latestChat: {
    color: 'gray',
    fontSize: 16,
  },
  time: {
    color: 'black',
    fontSize: 13,
  },
  count: {
    color: 'white',
  },
});
