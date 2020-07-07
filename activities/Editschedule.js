import React,{useState} from "react";
import {View,StyleSheet,TextInput,Button,TouchableOpacity, Keyboard,Alert} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Editschedule({route,handleWork,navigation}) {

    const [start,setStart] = useState(false);
    const [end,setEnd] = useState(false);

    const [text,setText] = useState({
        id: route.params.id,
        title: route.params.title,
        startTime: {...route.params.startTime},
        endTime: {...route.params.endTime},
        description: route.params.desc,
    });

    function valid(val){
        console.log(`Start ${text.startTime}`);
        console.log(text.startTime.hour);
        if(val.title === undefined || val.title === ""
           ||val.startTime.hour === undefined || val.startTime === "" || val.startTime === {}
           ||val.endTime.hour === undefined || val.endTime === "" || val.endTime === {}) {
               return false;
        }
        return true;
    }

    function addWork() {
        if (valid(text)){
            handleWork(text);
            setText({
                id:route.params.id,
                title: "",
                startTime: {
                    hour: 0,
                    minute: 0,
                },
                endTime: {
                    hour: 0,
                    minute: 0,
                },
                description: "",
            });
            navigation.goBack();
        }

        else {
             if(text.title === "" || text.title === undefined) {
                Alert.alert(
                    "Sorry !",
                    "Title cannot be empty",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
             }
             else if(text.startTime.hour === undefined || text.startTime === "" || text.startTime === {}) {
                Alert.alert(
                    "Please select a start time",
                    "Start time cannot be empty",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
             }
             else if(text.endTime.hour === undefined || text.endTime === "" || text.endTime === {}) {
                Alert.alert(
                    "Please select a end time",
                    "End time cannot be empty",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
             }
        }
        
    }

    function startTimeHandler(event,val){
        let date = new Date(val+"");
        let hour = date.getHours();
        if(hour < 10){
            hour = "0" + hour;
        }
        let minute = date.getMinutes();
        if(minute < 10){
            minute = "0" + minute;
        }
        setStart(false);
        setText(prev => {
            return {
                ...prev,
                startTime: {
                    hour: hour,
                    minute: minute,
                }
            }
        });
    }

    function endTimeHandler(event,val){
        let date = new Date(val+"");
        let hour = date.getHours();
        if(hour < 10){
            hour = "0" + hour;
        }
        let minute = date.getMinutes();
        if(minute < 10){
            minute = "0" + minute;
        }
        setEnd(false);
        setText(prev => {
            return {
                ...prev,
                endTime: {
                    hour: hour,
                    minute: minute,
                }
            }
        });
    }

    return (
        <View style={styles.input}>
            <TextInput
                onChangeText = {(val) => setText(prev => {return {...prev,title:val}})}
                value = {text.title} 
                style = {styles.textInput}
                placeholder = "Title"
            />
            <TextInput
                onFocus = {() => {Keyboard.dismiss();setStart(true);}}
                value = {text.startTime.hour?`${text.startTime.hour} - ${text.startTime.minute}`:""} 
                style = {styles.textInput}
                placeholder = "Start Timing"
            />
            <TextInput
                onFocus = {() => {Keyboard.dismiss();setEnd(true);}}
                value = {text.endTime.hour?`${text.endTime.hour} - ${text.endTime.minute}`:""} 
                style = {styles.textInput}
                placeholder = "End Timing"
            />
            <TextInput
                onChangeText = {(val) => setText(prev => {return {...prev,description:val}})}
                value = {text.description} 
                style = {styles.textInput}
                placeholder = "Description"
                multiline
            />
            {start && <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event,val) => {startTimeHandler(event,val)}}
            />}
            {end && <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event,val) => {endTimeHandler(event,val)}}
            />}
            <View style={styles.btn}>
                <Button title="ADD" onPress={addWork} color={"rgb(9,187,115)"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },

    textInput: {
        fontSize: 20,
        margin: 20,
        width: 300,
        borderBottomColor: "rgb(9,187,115)",
        borderBottomWidth: 2,
        borderStyle: "solid",
    },

    btn: {
        margin: 20,
        width: 300,
        fontSize: 30,
        marginLeft: 10,
        borderRadius: 10,
        color: "rgb(9,187,115)",
    },

})