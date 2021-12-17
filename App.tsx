import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Music from './src/components/Music';

export default function App() {
  return (
    <View style={styles.container}>
      <Music />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});
