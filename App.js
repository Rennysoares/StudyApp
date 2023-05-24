import { useState } from 'react';
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

export default function App() {
  const[value1, setValue1] = useState("");
  const[value2, setValue2] = useState("");
  const[value3, setValue3] = useState("");
  const[visibleModal, setVisibleModal] = useState(true);

  function CalculaMaiorValor(){
    const maiorValor = Math.max(parseInt(value1), parseInt(value2), parseInt(value3))
    Alert.alert('Maior Valor', 'O maior valor é: ' + maiorValor);
  }
  function CalculaMenorValor(){
    const menorValor = Math.min(parseInt(value1), parseInt(value2), parseInt(value3))
    Alert.alert('Menor Valor', 'O menor valor é: ' + menorValor);
  }
  return (
    <View style={styles.container}>
      <Text>Aplicativo para achar o maior valor</Text>
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
      />
      </View>
      <View>
      <Button
        title="Ache o menor valor"
        onPress={CalculaMenorValor}
      />
      </View>
      <Modal
        transparent={visibleModal}
        visible={visibleModal}
      >
        <View style={styles.modal}>
        <View style={styles.box}>
          <Text>Olá, bem vindo ao aplicativo</Text>
          <Button
            title="vamos começar"
            onPress={()=>{setVisibleModal(false)}}
          />
        </View>
        </View>
      </Modal>
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
