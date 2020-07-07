import React from "react";
import {View,StyleSheet,Text,TouchableOpacity,Keyboard} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Showschedule from "./Showschedule";
import Editschedule from "./Editschedule";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Schedule({work,setWork,setModal}) {
    
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('work', jsonValue)
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('work');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch(e) {
            console.log(e);
        }
    }

    function handleWork(workAdd){
        Keyboard.dismiss();
        if(workAdd.id === undefined){
            workAdd.id = Math.random();
        }
        let data =  work.filter((item) => item.id !== workAdd.id);
        data = [
            ...data,
            {
                id : workAdd.id,
                title : workAdd.title,
                startTime: {...workAdd.startTime},
                endTime: {...workAdd.endTime},
                description: workAdd.description,
            }
        ];
        storeData(data).then(()=>{
            getData().then(val => setWork(val.sort((a,b) => (a.startTime.hour*60+a.startTime.minute) - (b.startTime.hour*60+b.startTime.minute))));
        });
       
    }

    function removeWork(id,resolve) {
        setWork(prev => {
            data =  prev.filter((item) => item.id !== id);
            storeData(data);
            return data;
        });
    }

    return (
        <View style={styles.container} >

            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                       name="Schedules" 
                       initialParams={work,removeWork,setModal} 
                       options={{header:() => null}}
                    >
                    {(props) => {return <Showschedule {...{...props,work,removeWork,setModal}} />}}
                    </Stack.Screen>
                    <Stack.Screen 
                       name="Edit" 
                       initialParams={handleWork}
                       options={
                           {
                                title: "Add Schedule",
                                headerStyle: {
                                    backgroundColor: "rgb(9,157,115)",
                                },
                                headerTintColor: "#fff",
                                headerTitleAlign: "center",
                            }
                       }
                    >
                    {(props) => {return <Editschedule {...{...props,handleWork}} />}}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)",
    },
});