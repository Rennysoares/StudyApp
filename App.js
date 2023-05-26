import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Button,
  Alert,
  Modal,
  VirtualizedList
} from 'react-native';

export default function Calculadora() {
  const[value1, setValue1] = useState("");
  const[value2, setValue2] = useState("");
  const[value3, setValue3] = useState("");
  const[buttonEnable, setButtonEnable] = useState(true);

  useEffect(()=>{
    console.log("componente atual atualizado")
    if (value1 == "" || value2 == "" || value3 == ""){
        setButtonEnable(true)
    }else{
        setButtonEnable(false)
    }
  })

  function CalculaMaiorValor(){
    const maiorValor = Math.max(parseInt(value1), parseInt(value2), parseInt(value3))
    if (isNaN(maiorValor)){
        Alert.alert('Erro', 'Insira números válidos para o cálculo');
    }else{
        Alert.alert('Maior Valor', 'O maior valor é ' + maiorValor);
    }
    
  }
  function CalculaMenorValor(){
    const menorValor = Math.min(parseInt(value1), parseInt(value2), parseInt(value3))
    if (isNaN(menorValor)){
        Alert.alert('Erro', 'Insira números válidos para o cálculo');
    }else{
        Alert.alert('Menor Valor', 'O menor valor é ' + menorValor);
    }
  }
  return (
    <View style={styles.container}>
      <Text>Insira números para </Text>
      <TextInput
        style={styles.textInput}
        value={value1}
        onChangeText={setValue1}
        keyboardType='numeric'
        placeholder='valor1'
      />
      <TextInput
        style={styles.textInput}
        value={value2}
        onChangeText={setValue2}
        keyboardType='numeric'
        placeholder='valor2'
      />
      <TextInput
        style={styles.textInput}
        value={value3}
        onChangeText={setValue3}
        keyboardType='numeric'
        placeholder='valor3'
      />
      <StatusBar style="auto" />
      <View style={styles.button}>
      <Button
        title="Ache o maior valor"
        onPress={CalculaMaiorValor}
        disabled={buttonEnable}
      />
      </View>
      <View>
      <Button
        title="Ache o menor valor"
        onPress={CalculaMenorValor}
        disabled={buttonEnable}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    borderWidth: 1,
    width: 200,
    borderRadius: 5,
    padding: 3,
    marginVertical: 5,
    backgroundColor: '#fff'
  },
  modal:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  box:{
    width: 300,
    height: 150,
    backgroundColor: 'rgb(200, 200, 0)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  button:{
    marginVertical: 10
  }
});
