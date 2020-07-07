import React, { useState, useEffect } from "react";
import {TextInput,View,StyleSheet,Text,FlatList,Button, TouchableOpacity, Dimensions} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Cards from "./Cards";
import Background from "./Background";

export default function Showschedule({navigation,work,removeWork,setModal}) {

    return(
        <View style={styles.container}>

            <TouchableOpacity style={styles.Settings}  onPress={() => setModal(false)}>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Text style={{color:"#fff"}}>Schedules</Text>
                    <Text style={{color: "#fff"}}>
                        <FontAwesomeIcon style={{color:"#fff"}} icon="angle-down" />
                    </Text>
                </View>
            </TouchableOpacity>
            
            {work.length?
                <FlatList
                style = {styles.list}
                data={work}
                renderItem={({ item }) => {
                    return (<Cards item={item} removeWork={removeWork} navigation={navigation}/>)
                }}
                keyExtractor={item => item.id+""}
                />
                :
                <View style={styles.emptyList}>
                    <Text style={{color:"#616161"}}>No Schedules Planned</Text>
                </View>
            }
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.addBtn}>
                        <FontAwesomeIcon size={25} style={{color:"#f1f1f1"}} icon="plus" onPress={() => {navigation.navigate("Edit")}} /> 
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        padding: 10,
        backgroundColor: "#dfdfdf"
    },

    heading: {
        fontSize: 30,
        marginBottom: 20,
        color: "#616161",
    },
    
    list: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)"
    },

    emptyList: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0)"
    },

    addBtn: {
        padding: 15,
        backgroundColor: "rgb(9,187,115)",
        borderRadius: 100,
        elevation: 20,
    },

    addBtnText:{
        fontSize: 25,
        color: "white",
    },

    Settings: {
        width: 400,
        top:-10,
        padding: 10,
        backgroundColor: "rgb(9,157,115)",
        justifyContent: "center",
        alignItems: "center",
    },

    btnContainer:{
        flex: 0.12,
        paddingHorizontal: 150,
        width: Dimensions.width,
        backgroundColor: "rgba(0,0,0,0)",
        alignContent: "center",
        justifyContent:"center"
    },

})