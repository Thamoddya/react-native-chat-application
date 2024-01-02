import React, { useState } from 'react';
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
    Dimensions,
    Button,
    StackActions 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import './response';

export const Quote = ({ route, navigation }) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [quote, setQuote] = useState("");

    const [Newquote, setNewQuote] = useState("");
    const FullWidth = width;
    const FullHeight = height / 10;


    let userID = route.params.id;


    const aboutUpdate = () => {
        Alert.alert(
            'ALERT',
            'Do You want to Update your About',
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert("Alert", "About Update Process Cancelled"),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => VMobile() }
            ]
        );

    };

    const VMobile = async () => {



        try {
            const existingData = await AsyncStorage.getItem('user');
            const existingDataObj = JSON.parse(existingData);
            existingDataObj.quote = Newquote;
            const updatedData = JSON.stringify(existingDataObj);
            await AsyncStorage.setItem('user', updatedData);
        } catch (error) {
            console.error(error);

        };


        var request = new XMLHttpRequest();
        var form = new FormData();
        form.append('id', userID);
        form.append('quote', Newquote);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                Alert.alert("Alert", request.responseText);
                navigation.reset;
            }
        };
        request.open('POST', `http://${res[0]}/react_chat/aboutUpdate.php`, true);
        request.send(form);


    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#1d3557'
        }}>
            <View style={{
                height: height / 2,
                marginTop: height / 10
            }}>
                <Text style={{
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'center'
                }}>{route.params.quote}</Text>
                <Text style={{
                    fontSize: 16,
                    padding: 20
                }}>DO You Need TO Update Your About. </Text>
                <TextInput style={{
                    borderColor: '#a8dadc',
                    borderWidth: 0.8,
                    margin: 10,
                    borderRadius: 5,
                    color: 'white',
                    fontSize: 19
                }}
                    onChangeText={setNewQuote} />
                <Button title='Update ABout' onPress={aboutUpdate} style={{
                    margin: 10,
                }}
                />
            </View>

            <View style={{
                height: height / 2,
                marginLeft: width / 4,
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <Text>Chat App By Thamoddya Rashmitha </Text>
            </View>
        </SafeAreaView>
    )
};

