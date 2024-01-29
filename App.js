import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [count, setCount] = useState(1); // Initial count value is 1
  const incrementCount = () => {
    setCount(count + 1);
  };
  return (
    <View style={styles.container}>
      <Text>My first react native app. Yay!</Text>
      <Button title="Count" onPress={incrementCount} />
      <Text>{count}</Text>
      <StatusBar style="auto" />
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
