import { useEffect } from 'react';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export function Chat({ route, navigation }) {
  Alert.alert('Message', 'Chat');

  const [ListData, SetListData] = useState([
    {
      id: '1',
      name: 'Sahan',
    },
    {
      id: '2',
      name: 'Prabath',
    },
    {
      id: '3',
      name: 'nisal',
    },
  ]);

  const ui = (
    <SafeAreaView style={chatStyle.main}>
      <Text style={chatStyle.chatext1}>Chat Ui</Text>
      {/* <Button title="Change" onPress={ChanegListData} /> */}
      <FlatList data={ListData} renderItem={getItemUi} />
    </SafeAreaView>
  );

  function ChanegListData() {
    const newData = [
      { id: '5', name: 'Hashan' },
      { id: '6', name: 'Dasun' },
    ];
    SetListData(newData);
  }

  function start() {
    setInterval(ChanegListData, 5000);
  }
  useEffect(start, []);

  return ui;
}

function getItemUi({ item }) {
  const ui = <Text style={chatStyle.getItemUiTet1}>{item.name}</Text>;
  return ui;
}

const chatStyle = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatext1: {
    fontSize: 20,
    color: 'red',
  },
  getItemUiTet1: {
    fontSize: 20,
    color: 'blue',
  },
});
