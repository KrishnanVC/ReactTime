/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ useState, useEffect } from 'react';
import Landingpage from "./activities/Landingpage";
import AsyncStorage from '@react-native-community/async-storage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faTrashAlt,faPlus,faAngleUp,faAngleDown } from '@fortawesome/free-solid-svg-icons'

library.add(fab,faEdit,faTrashAlt,faPlus,faAngleUp,faAngleDown);


const App = () => {

  const getData = async () => {
    try {
    const jsonValue = await AsyncStorage.getItem('work');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
        console.log(e);
    }
  }

  const [work,setWork] = useState();

  useEffect(()=>{
    getData().then(val => setWork(val.sort((a,b) => (a.startTime.hour*60+a.startTime.minute) - (b.startTime.hour*60+b.startTime.minute))));
  },[]);

  return ( 
      <Landingpage work={work} setWork={setWork}/>
  );
};

export default App;
