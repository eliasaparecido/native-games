import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

interface AppWrapperProps {
    children: React.ReactNode;
}
  
const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        NavigationBar.setBehaviorAsync('overlay-swipe');
    }, []);
      
    return (
        <View style={styles.wrapper}>
            <ImageBackground source={require('../../assets/images/background.png')} style={styles.backgroundImage}>
                {children}
            </ImageBackground>
            <StatusBar hidden={true} />
        </View>
    );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1, // Define um zIndex menor para que a imagem de fundo fique abaixo do conteúdo
  },
  icon: {
    width: 50,
    height: 50,
    zIndex: 999
  },
});

export default AppWrapper;
