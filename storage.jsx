import React, { Component, useState ,useEffect} from 'react'
import { Text, View, Image } from 'react-native'
import AppInfo from 'react-native-app-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

export const Storage = ({ route, navigation }) => {

    const [progess, setProgess] = useState(0.4);

    function set(){
        setProgess(0.5)
    }

    useEffect(set,[]);
    return (

        <SafeAreaView style={{
            backgroundColor: '#1d3557',
            flex: 1
        }}>
            <View style={{
                flexDirection: 'row',
                marginTop: '10%',
                padding: '4%',

            }}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1849/1849458.png' }} style={{
                    width: 200,
                    height: 200
                }} />
                <View style={{
                    rowGap: 30,
                    marginLeft: 10,

                }}>
                    <View style={{
                        backgroundColor: '#2B4446',
                        width: 170,
                        height: 50,
                        borderRadius: 10
                    }}>
                        <Text style={{
                            color: '#00E7F0',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>Application Size</Text>
                        <Text style={{
                            color: '#00E7F0',
                            fontSize: 15,
                            textAlign: 'center'
                        }}>50 MB</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#2B4446',
                        width: 170,
                        height: 50,
                        borderRadius: 10
                    }}>
                        <Text style={{
                            color: '#00E7F0',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>Media</Text>
                        <Text style={{
                            color: '#00E7F0',
                            fontSize: 15,
                            textAlign: 'center'
                        }}>1+ Gb</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#2B4446',
                        width: 170,
                        height: 50,
                        borderRadius: 10
                    }}>
                        <Text style={{
                            color: '#00E7F0',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>Network Storage</Text>
                        <Text style={{
                            color: '#00E7F0',
                            fontSize: 15,
                            textAlign: 'center'
                        }}>102.0 <Icon name="arrow-up" /> 1521.0 <Icon name="arrow-down" /> </Text>
                    </View>


                </View>

            </View>
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30
            }}>
                <Progress.Circle
                    progress={progess}
                    animated={true}
                    size={200}
                    indeterminateAnimationDuration={1000}
                    animationType={'spring'}
                    useNativeDriver={true}
                    showsText={true}
                    borderWidth={10}
                    fill={'none'}
                />
            </View>
        </SafeAreaView>
    )
}

