import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppWrapper from './components/AppWrapper';
import IconGoHome from './components/IconGoHome';

const Words = () => {
  return (
    <AppWrapper>
      <View><IconGoHome></IconGoHome></View>
        <View style={styles.container}>
          <Text style={styles.numbers}>
            Palavras
          </Text>
        </View>
    </AppWrapper>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  numbers: {
    fontSize: 60,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    backgroundColor: '#0098DA',
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
  }
});


export default Words;
