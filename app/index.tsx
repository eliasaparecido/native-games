import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { Routes } from "./types/types";
import AppWrapper from "./components/AppWrapper";

export default function Index() {
  const router = useRouter();

  const images = [
    { id: 1, url: require('../assets/images/mathematics.png'), link: Routes.Mathematics },
    { id: 2, url: require('../assets/images/words.png'), link: Routes.Words },
    { id: 3, url: require('../assets/images/memory.png'), link: Routes.Memory },
    // Adicione outras imagens aqui, se necessário
  ];

  const handlePressImage = (link: Routes) => {
    router.push(link); 
  }

  return (
    <AppWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Vamos Jogar?</Text>
        <View style={styles.grid}>
          {images.map((image) => (
            <TouchableOpacity
              key={image.id}
              onPress={() => handlePressImage(image.link)}
              style={styles.imageItem}
            >
              <Image source={image.url} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFF"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageItem: {
    margin: 10,
    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
});
