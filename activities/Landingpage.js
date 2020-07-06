import React, { useState } from "react";
import {View,StyleSheet,Text,Dimensions,Modal,TouchableOpacity,Image,StatusBar} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Schedules from "./Schedules";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Easing } from "react-native-reanimated";

export default function Landingpage({ work,setWork}) {

    let [time,setTime] = useState(100);

    const [modalVisible,setModal] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#rgb(40,40,40)"/>
            <Image
               source={require("../public/src/img/bg2.jpg")}
               style={styles.bgImage} 
            />
            <View style={styles.mainContainer}>
                <AnimatedCircularProgress
                    size={270}
                    width={15}
                    duration = {6000}
                    fill={time}
                    easing = {Easing.linear(Easing.linear)}
                    tintColor="rgb(9,210,115)"
                    onAnimationComplete={() =>{console.log('onAnimationComplete');setTime(40)}}
                    backgroundColor="#9191aa"
                    rotation={0} >
                        {(fill) => (
                            <Text style={{color:"#fff",textAlign:"center"}}>
                                Animations are Planned
                        here {"\n" + parseInt(fill)}%
                            </Text>
                        )}
                </AnimatedCircularProgress>
            </View>
            <TouchableOpacity style={styles.Settings}  onPress={() => setModal(true)}>
                <View>
                    <Text style={{color: "#000"}}>
                        <FontAwesomeIcon icon="angle-up" />Schedules
                    </Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={modalVisible}
                presentationStyle={"fullScreen"}
            >
                <Schedules work={work} setWork={setWork} setModal = {setModal}/>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    mainContainer: {
        flex: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.05)",
        color: "#fff",
    },

    Settings: {
        flex: 1,
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.9)",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        elevation: 5,
    },

    bgImage: {
        flex: 1,
        position: "absolute",
        zIndex: 0,
        width: '100%',
        height: '100%',
    }
})