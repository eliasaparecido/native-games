import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Routes } from '../types/types';


  
const IconGoHome = () => {
    const router = useRouter();

    const goToHome = () => {
        router.push(Routes.Index); 
    }

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => goToHome()}>
            <Image
                source={require("../../assets/images/home.png")}
                style={styles.icon}
            />
        </TouchableOpacity> 
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'flex-end',   // Alinha à direita
    },
    icon: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginRight: 10
    },
});

export default IconGoHome;
