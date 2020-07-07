import React, { useState,useRef, useEffect } from "react";
import {View,StyleSheet,Text,Dimensions,Modal,TouchableOpacity,Image,StatusBar} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Schedules from "./Schedules";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Easing } from "react-native-reanimated";
import GestureRecognizer from 'react-native-swipe-gestures';

export default function Landingpage({ work,setWork}) {

    let [prefill,setPrefill] = useState(0);
    let [current,setCurrent] = useState("No works Scheduled");
    let [isComplete,setComplete] = useState(false);
    const [modalVisible,setModal] = useState(false);
    const anime = useRef(null);

    function getTotalDuration(work) {
        let startHour = work.startTime.hour; 
        let startMinute = work.startTime.minute; 
        let endHour = work.endTime.hour; 
        let endMinute = work.endTime.minute;
        
        let startDur = startHour*60 + startMinute;
        let endDur = endHour*60 + endMinute;

        if(startDur > endDur){
            endDur += 1440
        }

        return (endDur - startDur)*60;
    }

    function getCurrentDuration(work) {
        let startHour = work.startTime.hour; 
        let startMinute = work.startTime.minute; 
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        let startDur = startHour*3600 + startMinute*60;
        let currDur = hour*3600 + minute*60 + second;

        if(startDur > currDur){
            currDur += 1440*60
        }

        return (currDur - startDur);
        
    }

    function inInterval(work) {

        if (getCurrentDuration(work) < getTotalDuration(work)){
            return true;
        }
        return false;
    }

    useEffect(() => {
        
        let flag = 0;
                
        if(work !== undefined){
            for(let i=0;i<work.length;i++){
                
                if(inInterval(work[i])) {

                    let prefillVal = parseInt(getCurrentDuration(work[i]) * 100/getTotalDuration(work[i]));
                    console.log(prefillVal);
                    setPrefill(prefillVal);
                    setCurrent(work[i].title);
                    flag = 1;
                    break;
                }
                    
            }
            if(flag === 0){
                setPrefill(0);
                setCurrent("No works Scheduled");
                console.log("Hi");
            }
        }
        
    },[isComplete]);

    function reAnime() {
        anime.current.reAnimate(0,100,5000,Easing.linear(Easing.linear));
    }

    return (
        <GestureRecognizer style={{flex:1}} onSwipeUp={() => setModal(true)} >
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
                        ref = {anime}
                        duration = {5000}
                        fill={100}
                        easing = {Easing.linear(Easing.linear)}
                        tintColor="rgb(9,210,115)"
                        onAnimationComplete={() =>{console.log('onAnimationComplete');reAnime();setComplete(prev => !prev)}}
                        backgroundColor="#9191aa"
                        rotation={0} >
                            {() => (
                                <View>
                                    <Text style={{color:"#fff",textAlign:"center",fontSize:20,marginHorizontal:5}}>
                                        {current}
                                    </Text>
                                    <Text style={{color:"#fff",textAlign:"center",fontSize:20}}>
                                        {current !== "No works Scheduled"?`\n${prefill}%`:""}
                                    </Text>
                                </View>

                            )}
                    </AnimatedCircularProgress>
                </View>
                <TouchableOpacity style={styles.Settings}  onPress={() => setModal(true)}>
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <Text style={{color: "#000"}}>
                            <FontAwesomeIcon icon="angle-up" />
                        </Text>
                        <Text>Schedules</Text>
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
        </GestureRecognizer>
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