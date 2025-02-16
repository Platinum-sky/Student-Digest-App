import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet,ScrollView, ActivityIndicator} from 'react-native';
import {MyButton} from '../App/components/dummyButton';
import { Cards } from '../App/components/card.component';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import {API_KEY,MSI,APP_ID} from "@env";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: '${API_KEY}',
  authDomain: "student-digest-app.firebaseapp.com",
  databaseURL: "https://student-digest-app-default-rtdb.firebaseio.com",
  projectId: "student-digest-app",
  storageBucket: "student-digest-app.appspot.com",
  messagingSenderId: '${MSI}',
  appId: '${APP_ID}',
  measurementId: "G-S76LZ12738"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
//firebase.initializeApp(firebaseConfig);

const db = getFirestore();



const Homescreen = ({navigation}) => {
  const [itemsArray, setItemsArray] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const fecthData = async () => {
    let temp = [];
    const querySnapshot = await getDocs(collection(db, "digest"));
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setItemsArray(temp);
  }
  React.useEffect(() => {
    fecthData().then(setLoading(false));
    return () => {};
  }, []);

  const makeCards = () => {
    return itemsArray.map((digest, i) => {
      return(
        <Cards
          navigation = {navigation}
          name = {digest["title"]}
          des = {digest["description"]}
          img = {digest["imageOverlay"]}
          key = {i}
        />
      );
    });
  }


  return(
    <ScrollView>
      <View style = {styles.container}>
        {makeCards()}
      </View>
    </ScrollView>
  );
};   
export default Homescreen;


const styles = StyleSheet.create({
      container: {
        margin: 10,
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',

      },

    });
      
