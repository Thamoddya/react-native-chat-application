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

export const Profile = ({route , navigation }) => {
    checkstatus();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [quote, setQuote] = useState("");
    const [dark, SetDark] = useState("toggle-on");
    const [BgCOlor, setBgColor] = useState("#1d3557");
    const [TextColor, setTextColor] = useState("#f1faee");
    const [count, getCount] = useState("");

    async function m() {
        let userDataJSOn = await AsyncStorage.getItem('user');
        if (userDataJSOn != null) {
            let UserData = JSON.parse(userDataJSOn);
            setPic(UserData.profile_url);
            setId(UserData.id);
            setQuote(UserData.quote);
            setName(UserData.name);
        }
    };
    m();
    const data = {
        prog:0.4
    }

    const mode = () => {

        if (dark == "toggle-on") {
            SetDark("toggle-off");
            setBgColor("#f1faee");
            setTextColor("black");

        } else {
            SetDark("toggle-on");
            setBgColor("#1d3557");
            setTextColor("#f1faee");
        }
    };

    const accountPage = () => {
        navigation.navigate('Account');
    }
    const optionsPage = () => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                getCount(request.responseText)
            }
        };
        request.open('POST', `http://${res[0]}/react_chat/getCount.php`, true);
        request.send();

        const obj = {
            users: count,
            friends: count - 1
        };
        navigation.navigate('Setting', obj);
    }

    const onj = {
        id:id,
        name:name,
        quote:quote
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BgCOlor }}>
            {/* <Text>{id}</Text> */}
            <View style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: { BgCOlor },
                margin: 20,
                borderRadius: 20,
                borderColor: '#00f5d4',
                borderWidth: 3,
            }}>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Image
                        source={{ uri: `http://${res[0]}/react_chat/` + pic }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            marginTop: 25,
                            borderColor: '#00f5d4',
                            borderWidth: 3,
                        }}
                    />
                    <Text style={{
                        color: TextColor,
                        fontSize: 25,
                        fontWeight: 'bold',
                    }}>{name}</Text>

                    <Icon style={{
                        color: "#00f5d4",
                        fontSize: 35,
                        fontWeight: 'bold',
                    }}
                        name="qrcode" />
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: { BgCOlor },
                marginBottom: 50,
                marginHorizontal: 20,
                borderRadius: 20,
                marginTop: 5,
                borderColor: '#00f5d4',
                borderWidth: 3,
            }}>
                <View style={{
                    gap: 15
                }}>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <Pressable onPress={() => navigation.navigate('Quote',onj)}>
                            <Text style={{
                                color: TextColor,
                                fontSize: 19,
                                fontWeight: 'bold',
                                margin: 8
                            }}> <Icon
                                    name="music"
                                    size={20}
                                    color={TextColor} /> {quote}
                                <Icon
                                    name="music"
                                    size={20}
                                    color={TextColor} />
                            </Text>
                        </Pressable>
                        <Text style={{
                            color: TextColor
                        }}>
                            ____________________________________________
                        </Text>
                    </View>
                    <Pressable onPress={optionsPage}>
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <View style={{
                                paddingVertical: 10,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <Icon name="cog" color={TextColor} size={20} />
                                <Text style={{
                                    color: TextColor,
                                    fontSize: 19,
                                    paddingHorizontal: 5,
                                    fontWeight: 'bold'
                                }}>Options</Text>
                            </View>
                        </View>
                    </Pressable>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Icon name="envelope" color={TextColor} size={20} />
                            <Text style={{
                                color: TextColor,
                                fontSize: 19,
                                paddingHorizontal: 5,
                                fontWeight: 'bold'
                            }}>Mails</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Pressable onPress={mode}>
                                <Icon name={dark} color="#495057" size={20} />
                            </Pressable>
                            <Text style={{
                                color: TextColor,
                                fontSize: 19,
                                paddingHorizontal: 5,
                                fontWeight: 'bold'
                            }}>Dark Mode</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Icon name="shield" color={TextColor} size={20} />
                            <Text style={{
                                color: TextColor,
                                fontSize: 19,
                                paddingHorizontal: 5,
                                fontWeight: 'bold'
                            }}>Privacy</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Icon name="connectdevelop" color={TextColor} size={20} />
                            <Text style={{
                                color: TextColor,
                                fontSize: 19,
                                paddingHorizontal: 5,
                                fontWeight: 'bold'
                            }}>Connect</Text>
                        </View>
                    </View>
                    <View 
                     style={{
                        flexDirection: 'column'
                    }}>
                        <Pressable onPress={()=>navigation.navigate("Storage",data)}>
                        <View style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Icon name="database" color={TextColor} size={20} />
                            <Text style={{
                                color: TextColor,
                                fontSize: 19,
                                paddingHorizontal: 5,
                                fontWeight: 'bold'
                            }}>Storage</Text>
                        </View>
                        </Pressable>
                        
                    </View>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Icon name="globe" color={TextColor} size={20} />
                            <Text style={{
                                color: TextColor,
                                fontSize: 19,
                                paddingHorizontal: 5,
                                fontWeight: 'bold'
                            }}>Language and Input</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <Pressable onPress={()=>navigation.navigate('WebSite')}>
                        <View style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Icon name="braille" color={TextColor} size={20} />
                            <Text style={{
                                color: TextColor,
                                fontSize: 19,
                                paddingHorizontal: 5,
                                fontWeight: 'bold'
                            }}>About Developer</Text>
                        </View>
                        </Pressable>
                        
                    </View>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Pressable style={{
                                flexDirection: 'row',
                            }}

                                onPress={accountPage}>
                                <Icon name="trash" color={TextColor} size={20} />
                                <Text style={{
                                    color: TextColor,
                                    fontSize: 19,
                                    paddingHorizontal: 5,
                                    fontWeight: 'bold'
                                }}>Account Deletion and Signout</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}