import React,{useState} from "react";
import {View,StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Cards({item,removeWork,navigation}) {

    const [isExpanded,setExpanded] = useState(false);

    function handleEdit() {
        navigation.navigate("Edit",
                {
                    id:item.id,
                    title:item.title,
                    startTime:{...item.startTime},
                    endTime:{...item.endTime},
                    desc:item.description
                });
    }

    return (
        <TouchableWithoutFeedback  onPress={() => setExpanded(prev => !prev)}>
            <View style={[styles.listItem,{elevation: isExpanded?5:0}]}>
                <View style={styles.cardFlex}>
                    <Text style={styles.listItemText}>{item.title}</Text>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity>
                            <Text style={{color:"#fff",marginRight: 10}} >
                                <FontAwesomeIcon style={{color:"#fff"}}  onPress={() => handleEdit()} icon="edit" />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{color:"#fff"}}>
                                <FontAwesomeIcon style={{color:"#fff"}} icon="trash-alt" onPress={() => removeWork(item.id)} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.time}>{`${item["startTime"]["hour"]}:${item["startTime"]["minute"]} - ${item["endTime"]["hour"]}:${item["endTime"]["minute"]}`}</Text>
                {isExpanded && <Text style={styles.desc}>{item.description}</Text>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: "rgb(9,180,115)",
        padding: 20,
        paddingLeft: 35,
        marginVertical: 10,
        width: 320,
        borderRadius: 5,
    },

    listItemText: {
        flex:3,
        fontWeight: "bold",
        color: "white",
        fontSize: 20,
    },

    cardFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },

    time: {
        color: "#fff",
    },

    desc: {
        color: "#fff",
        paddingTop: 10,
        fontFamily: "serif",
    }

})