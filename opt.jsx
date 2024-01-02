import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, Image, Pressable, SafeAreaView, StyleSheet, ImageBackground, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from '@rneui/themed'


export function Home({ navigation }) {

    const [searchText, setSearchText] = useState("");
    const [items, setItems] = useState([]);

    async function loadFriendList(text) {
        const userJSONText = await AsyncStorage.getItem("user");
        if (userJSONText != null) {
            const formData = new FormData();
            formData.append('userJSONText', userJSONText);
            formData.append('text', text);

            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    setItems(JSON.parse(request.responseText));
                    // Alert.alert("Alert", request.responseText);
                }
            };
            request.open("POST", "http://10.0.2.2/react_chat/load_users.php", true);
            request.send(formData);
        }
    }

    function start() {
        loadFriendList("");
    }

    useEffect(start, []);


    const ui = (
        <SafeAreaView style={styles.home}>
            <ImageBackground source={require("./images/backgroundmain3.png")} style={styles.image}>
                <Text style={styles.homeText1}>Message</Text>
                <View style={styles.logout} >
                    <Pressable onPress={logout} >
                        <View style={{ backgroundColor: 'white', width: 10, }}>
                            <Icon name="dot-circle-o" size={10} />
                            <Icon name="dot-circle-o" size={10} />
                            <Icon name="dot-circle-o" size={10} />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.homeView1}>
                    <TextInput style={styles.homeTextInput1} onChangeText={p} />
                    <TouchableOpacity onPress={loadFriendList}>
                        <Image style={styles.homeTextInputItem} source={{ uri: "https://cdn-icons-png.flaticon.com/512/5636/5636698.png" }} />
                    </TouchableOpacity>
                </View>
                <FlatList style={styles.flatlist} data={items} renderItem={itemUI} />
            </ImageBackground>
        </SafeAreaView>
    )
    return ui;

    function p(text) {
        setSearchText(text);
        loadFriendList(text);
    }
    async function logout() {
        await AsyncStorage.clear();
        navigation.navigate("Sign In");
        Alert.alert("Message", "Back to Sign In");
    }

    function itemUI({ item }) {
        const ui = (
            <Pressable onPress={m}>
                <View style={styles.item}>
                    <Image style={styles.itemImage} source={{ uri: "http://10.0.2.2/react_chat/" + item.pic }} />
                    <View style={styles.itemView1}>
                        <Text style={styles.itemText1}>{item.name}</Text>
                        <Text style={styles.itemText2}>{item.msg}</Text>
                    </View>
                    <View style={styles.itemView2}>
                        <Text style={styles.itemText3}>{item.time}</Text>
                        <View style={styles.itemShape1}>
                            <Text style={styles.itemText4}>{item.count}</Text>
                        </View>

                    </View>
                </View>
            </Pressable>
        );
        return ui;

        function m() {
            // Alert.alert("Success");
            const obj = { "name": item.name, "id": item.id, "img": "http://10.0.2.2/react_chat/" + item.pic };
            navigation.navigate('Chat', obj);
        }
    }


}


const styles = StyleSheet.create({
    logout: {
        flexDirection: "row",
        right: -180,
        marginTop: -50,


    },
    signUpSelect: {
        width: "80%",
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 80,
        borderWidth: 1,
        borderStyle: "solid",

    },
    signUpMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInButtonText1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    signInButton1: {
        width: '80%',
        height: 45,
        backgroundColor: "black",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,


    },
    image: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

    },
    signInButton2: {
        width: '80%',
        height: 45,
        backgroundColor: "#16a336",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,

    },

    signInview1: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    signInIcon1: {
        fontSize: 24,
        position: "absolute",
        start: 15,

    },
    signInInput1: {
        width: "80%",
        height: 50,
        fontSize: 22,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        paddingStart: 45,
        paddingEnd: 20,
    },
    signInMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    signInImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    chatSendView1: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
    },
    chatInput1: {
        width: "80%",
        height: 40,
        borderStyle: "solid",
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "black",

    },
    chatIcon: {
        marginLeft: 10,
        width: 25,
        height: 25,
    },
    chatText3: {
        fontSize: 11,
    },
    chatIconSeen: {
        color: "green",
        paddingLeft: 10,
    },
    chatIconSent: {
        color: "red",
        paddingLeft: 10,
    },
    chatList: {
        width: '100%',
        paddingHorizontal: 5,
    },
    chatViewLeft: {
        backgroundColor: "#8080ff",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: "flex-start",
        marginLeft: 10,
    },
    chatViewRight: {
        backgroundColor: "#8080ff",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: "flex-end",
        marginLeft: 10,
    },
    chatView1: {
        flexDirection: "row",
    },
    chat: {
        flex: 1,
        alignItems: "center"
    },
    chatText1: {
        fontSize: 28,
        paddingVertical: 15,
        color: "black",
        fontFamily: "Lobster",

    },
    chatText2: {
        fontSize: 22,
        paddingVertical: 10,
        color: "black",
        fontWeight: "bold",

    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 40,

    },
    item: {
        flexDirection: "row",
        paddingBottom: 9,

    },
    itemText1: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    itemText2: {

        fontSize: 16,
        color: "#808080",

    },
    itemText3: {
        color: "black",
        fontSize: 14,
        paddingBottom: 5,

    },
    itemText4: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",

    },
    itemShape1: {
        width: 24,
        height: 24,
        backgroundColor: "#7171ff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",

    },
    itemView1: {
        justifyContent: "center",
        paddingHorizontal: 20,
        width: "54%",


    },
    itemView2: {
        alignItems: "flex-end",
        justifyContent: "center",
        width: "20%",

    },

    home: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#3e3e3e",


    },
    homeText1: {
        fontSize: 28,
        paddingVertical: 15,
        color: "black",
        fontFamily: "Lobster",
    },
    homeTextInput1: {
        borderWidth: 2,
        borderColor: "#000000",
        width: "90%",
        borderRadius: 20,
        fontSize: 20,
        height: 45,
        color: "black",
        paddingLeft: 20,
        paddingRight: 47,
        marginTop: 10,

    },
    homeTextInputItem: {
        height: 35,
        width: 35,
        position: "absolute",
        marginTop: 15,
        right: 10,
    },
    homeView1: {
        flexDirection: "row",

    },
    flatlist: {
        marginTop: 20,

    }

});