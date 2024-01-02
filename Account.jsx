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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import './response';

export const Account = ({ navigation }) => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [Newmobile, NewsetMobile] = useState("");


    const alertStyle = {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        textAlign: 'center'
    };
    const LogOut = () => {
        Alert.alert(
            'LogOut',
            'Do You Want To LogOut',
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert("Alert", "LogOut Process Cancelled"),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => logOutAfterV() }
            ],
        );
    }
    const logOutAfterV = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Sign In');
    };
    async function m() {
        let userDataJSOn = await AsyncStorage.getItem('user');
        let UserData = JSON.parse(userDataJSOn);
        setName(UserData.name);
        setId(UserData.id);
        setMobile(UserData.mobile);
    };
    m();

    const updateMobile = () => {
        Alert.alert(
            'Alert',
            'Update MObile Number',
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert("Alert", "Mobile Number Update Process Cancelled"),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => VMobile() }
            ]
        );
    };

    const VMobile = () => {
        var request = new XMLHttpRequest();
        var form = new FormData();
        form.append('id', id);
        form.append('number', Newmobile);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                Alert.alert("Alert", request.responseText)
            }
        };
        request.open('POST', `http://${res[0]}/react_chat/noUpdate.php`, true);
        request.send(form);
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#1d3557',
            justifyContent: 'center'
        }}>
            <View>
                <Text style={{
                    color: '#a8dadc',
                    fontSize: 20,
                    padding: 20
                }}>{`Mobile Number :- ${mobile}`}</Text>
                <Text style={{
                    color: '#a8dadc',
                    padding: 10,
                }}>Do You Want To Change Your Number,</Text>
                <TextInput style={{
                    borderColor: '#fefae0',
                    borderWidth: 1,
                    width: '80%',
                    left: '10%',
                    borderRadius: 10,
                    fontSize: 19,
                    height: 40
                }}
                    onChangeText={NewsetMobile}
                    maxLength={10}
                    defaultValue="07" />
                <Text style={{
                    color: 'red',
                    padding: 10,
                    textAlign: 'center'
                }}>This May cause Some data loss of your Account . </Text>
                <Pressable style={{
                    padding: 10,
                }}
                    onPress={updateMobile}>
                    <View style={{
                        backgroundColor: '#a8dadc',
                        width: '50%',
                        marginLeft: '25%',
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 20
                        }}>Update Number</Text>
                    </View>
                </Pressable>
            </View>
            <View>
                <Text style={{
                    color: '#a8dadc',
                    fontSize: 20,
                    padding: 20
                }}>{`LogOut`}</Text>
                <Pressable style={{
                    padding: 10,
                }}
                    onPress={LogOut}>
                    <View style={{
                        backgroundColor: '#a8dadc',
                        width: '50%',
                        marginLeft: '25%',
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 20
                        }}>LogOut</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};