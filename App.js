import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

// Firebase configuration (replace this with your Firebase project configuration)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: "https://testapp-f70a8-default-rtdb.firebaseio.com",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [count, setCount] = useState(1); // Initial count value is 1

  // Function to increment count and update in Firebase
  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    // Update count value in Firebase
    set(ref(database, 'count'), newCount)
      .then(() => console.log('Count updated successfully'))
      .catch(error => console.error('Error updating count:', error));
  };

  // Fetch initial count value from Firebase on component mount
  useEffect(() => {
    get(ref(database, 'count'))
      .then(snapshot => {
        const initialCount = snapshot.val() || 1;
        setCount(initialCount);
      })
      .catch(error => console.error('Error fetching count:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>My first React Native app. Yay! This app is using Firebase</Text>
      <Button title="Count" onPress={incrementCount} />
      <Text>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
