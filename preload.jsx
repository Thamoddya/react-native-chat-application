import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './response';

export const Preload = ({ navigation }) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");


    const checkState = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user != null) {

            let UserData = JSON.parse(user);

            const obj = {
                id: id,
                pic: pic,
                name: name
            }

            setPic(UserData.profile_url);
            setId(UserData.id);
            setName(UserData.name);
            navigation.navigate('Home', obj);
        } else {
            navigation.navigate('Sign In');
        }
    };

    checkState();
    return (
        <SafeAreaView style={{
            backgroundColor: '#1d3557',
            flex: 1,
            justifyContent: 'center'
        }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 24,
                    color: '#ffffff',
                    fontFamily: 'Poppins-Bold'
                }}>ChatApp</Text>
                <View>
                    <Image
                        source={require('./images/social-media.png')}
                        style={{
                            width: 150,
                            height: 150,
                            tintColor: '#a8dadc',
                            padding: 20
                        }}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <Text style={{
                textAlign:'center',
                marginTop:100
            }}>Thamoddya Rashmitha</Text>

        </SafeAreaView>
    )
}