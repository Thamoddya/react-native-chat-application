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
import { checkstatus } from './checkstatus';

export function Setting({ route, navigation }) {
    checkstatus();

    return (
        <SafeAreaView style={{
            backgroundColor:'#1d3557',
            flex:1
        }}>

            <View style={{
                flexDirection: 'row',
                width: '100%',
                padding: 6,
                gap: 3,
                marginTop:20
                
            }}>
                <View style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#31587a',
                    borderRadius: 5
                }}>
                    <Text style={{
                        fontSize: 23,
                        color: 'white',
                    }}>
                        Users
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                    }}>
                        {route.params.users}
                    </Text>
                </View>
                <View style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#31587a',
                    borderRadius: 5
                }}>
                    <Text style={{
                        fontSize: 23,
                        color: 'white',
                    }}>
                        Friends
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                    }}>
                        {route.params.friends}
                    </Text>
                </View>

            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#31587a',
                borderRadius: 5,
                margin: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 23,
                        padding: 10,
                        fontWeight: 'bold'
                    }}>Link Your Account</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/720/720255.png' }} style={{
                        width: 40,
                        height: 40,
                        margin: 10
                    }} />
                    <Text style={{
                        textAlign: 'auto',
                        marginVertical: 12,
                        fontSize: 25,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>Google</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/732/732214.png' }} style={{
                        width: 40,
                        height: 40,
                        margin: 10
                    }} />
                    <Text style={{
                        textAlign: 'auto',
                        marginVertical: 12,
                        fontSize: 25,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>Icloud</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/732/732221.png' }} style={{
                        width: 40,
                        height: 40,
                        margin: 10
                    }} />
                    <Text style={{
                        textAlign: 'auto',
                        marginVertical: 12,
                        fontSize: 25,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>Microsoft</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3955/3955163.png' }} style={{
                        width: 40,
                        height: 40,
                        margin: 10
                    }} />
                    <Text style={{
                        textAlign: 'auto',
                        marginVertical: 12,
                        fontSize: 25,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>Yahoo Mail</Text>
                </View>



            </View>
        </SafeAreaView>
    )
};
