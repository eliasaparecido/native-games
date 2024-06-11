import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import AppWrapper from "./components/AppWrapper";
import IconGoHome from "./components/IconGoHome";
import { Audio } from 'expo-av';

const Mathematics = () => {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 10) + 1);
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 10) + 1);
  const [operation, setOperation] = useState("+"); // "+" ou "-"
  const [result, setResult] = useState(0);
  const [resultOptions, setResultOptions] = useState<number[]>();
  const [correctResult, setCorrectResult] = useState<number>();
  const [maxRange, setMaxRange] = useState(10) 
  const [resultErrors, setResultErrors] = useState(0) 
  const [resultOk, setResultOk] = useState(0) 
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  const responseApplause = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/checked.mp3')
    );
    await sound.playAsync();
  };

  const responseError = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/error.mp3')
    );
    await sound.playAsync();
  };

  const getNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const createNewNumber = useCallback(() => {
    const firstNumber = getNumber(1, maxRange)
    const secondNumber = getNumber(0, firstNumber)
    const getOperation = Math.random() < 0.5 ? "+" : "-"
    setNumber1(firstNumber);
    setNumber2(secondNumber);
    setOperation(getOperation);
    calculateResult(firstNumber, secondNumber, getOperation);
  },[]);

  useEffect(() => {
    createNewNumber()
  },[createNewNumber, maxRange])


  const calculateResult = (firstNumber: number, secondNumber:number, getOperation: string) => {
    const finalResult = getOperation === "+" ? firstNumber + secondNumber : firstNumber - secondNumber

    setResult(finalResult)
    createOptions(finalResult)
  };

  const createOptions = (finalResult: number) => {
    let optionsTemp = [finalResult]; // Adiciona a resposta correta
    const faixa = 2; // Define a faixa de variação das opções erradas (2 acima e 2 abaixo)
  
    // Gera 2 opções erradas acima do resultado correto
    for (let i = 0; i < faixa; i++) {
      let optionError;
      do {
        optionError = finalResult + (i + 1); // Adiciona 1, 2, ... à resposta correta
      } while (optionError === finalResult || optionsTemp.includes(optionError));
      optionsTemp.push(optionError);
    }
  
    // Gera 2 opções erradas abaixo do resultado correto
    for (let i = 0; i < faixa; i++) {
      let optionError;
      do {
        optionError = finalResult - (i + 1); // Subtrai 1, 2, ... da resposta correta
      } while (optionError === finalResult || optionsTemp.includes(optionError));
      optionsTemp.push(optionError);
    }
  
    // Embaralha as opções usando o algoritmo de Fisher-Yates
    for (let i = optionsTemp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsTemp[i], optionsTemp[j]] = [optionsTemp[j], optionsTemp[i]];
    }
  
    setResultOptions(optionsTemp); 
    setCorrectResult(finalResult);
  };

  const checkResponse = (optionSelected: number) => {
    if (optionSelected === correctResult) {
      responseApplause(); // Inicia a animação
      fadeIn()
      setResultOk(resultOk + 1)
      //Alert.alert("Parabéns!", "OK");
      setShowSuccessAnimation(true)
      createNewNumber();
    } else {
      responseError();
      fadeOut()
      setResultErrors(resultErrors + 1)
      //Alert.alert("Tente novamente!", "ERRO");
    }
  };

  // Animação de fade-in
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setShowSuccessAnimation(false); // Esconde a animação após o fade-out
    });
  };

  // Animação de fade-out
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowSuccessAnimation(false); // Esconde a animação após o fade-out
    });
  };

  return (
    <AppWrapper>
      <View><IconGoHome></IconGoHome></View>
      <View style={styles.container}>
        <Text style={styles.numbers}>
          {number1} {operation} {number2} = ?
        </Text>
        <View style={styles.resultOptions}>
          {resultOptions && resultOptions.map((resultOption, index) => (
            <TouchableOpacity
              key={index}
              style={styles.options}
              onPress={() => checkResponse(resultOption)}
            >
              <Text style={styles.optionsText}>{resultOption}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {showSuccessAnimation && (
        <Animated.View style={[styles.animation, { opacity: fadeAnim }]}>
          <Text style={styles.animationText}>VOCÊ ACERTOU!</Text>
        </Animated.View>
      )}
      <View> 
        <Text style={styles.resultText}>
          Acertou: {resultOk} - Errou: {resultErrors}
        </Text>
      </View>
    </AppWrapper>
  );
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
  },
  resultText: {
    fontSize: 18,
    margin: 8,
  },
  resultOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  options: {
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6AFCE'
  },
  optionsText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white' 
  },
  animation: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
    position: "absolute", // Posiciona a animação em relação à tela
    top: "10%", // Posiciona a animação na parte superior da tela
    left: "20%", // Posiciona a animação na parte esquerda da tela
    opacity: 0.5, // Inicializa a animação com opacidade 0
  },
  animationText: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
});

export default Mathematics;