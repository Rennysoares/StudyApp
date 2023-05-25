import {React, useState, useEffect} from 'react';
import {
  Text, 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Button,
  Switch
} from 'react-native';
import * as SQLite from "expo-sqlite";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function CadastroReagentes( ){

  const db = SQLite.openDatabase('dbName');

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS armario (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)'
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS lote (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT, validade TEXT, quantidade_geral REAL, unidade_medida TEXT)'
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS produto (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, armario_id INTEGER, lote_id INTEGER, FOREIGN KEY (armario_id) REFERENCES armario (id), FOREIGN KEY (lote_id) REFERENCES lote (id))'
    );
  });

  function deletarDados(){
    db.transaction(tx => {
      tx.executeSql('DELETE FROM armario', () => {
        console.log('Deletado com sucesso');
      });
      error => {
        console.log('Erro de transação para deletar: ', error);
      }
    });
  }

  function consultaDados(){
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM armario', [], (_, { rows }) => {
        console.log(rows._array);
      });
    });
  }

  const[nomeReagente, setNomeReagente] = useState('')
  const[lote, setLote ] = useState('')
  const[quantidade, setQuantidade] = useState('')
  const[validade, setValidade] = useState('')
  const[localizacao, setLocalizacao] = useState('')
  const [unidadeMedida, setUnidadeMedida] = useState('ml');

  const toggleUnidadeMedida = () => {
    const novaUnidadeMedida = unidadeMedida === 'g' ? 'ml' : 'g';
    setUnidadeMedida(novaUnidadeMedida);
    console.log(novaUnidadeMedida)
  };
  
  function insertDatas(){
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO armario (nome) VALUES (?)',
        [nomeReagente],
        () => {
          console.log('Dado inserido com sucesso');
        },
        error => {
          console.log('Error inserting data: ', error);
        }
      );
    });
  }

  return(
    <SafeAreaView>
      <StatusBar
        backgroundColor='rgb(0, 255, 0)'/>
      <Text style={styles.titleinput}>Nome do reagente: </Text>
      <TextInput
        value={nomeReagente}
        onChangeText={setNomeReagente}

        style={styles.txtInput}
        placeholder="Ex: Ácido Clorídrico"
        placeholderTextColor='rgb(200, 200, 200)'
      />

      <Text style={styles.titleinput}>Lote: </Text>
      <TextInput
        value={lote}
        onChangeText={setLote}

        style={styles.txtInput}
        placeholder="Ex: 7234923"
        placeholderTextColor='rgb(200, 200, 200)'
      />

      <Text style={styles.titleinput}>Quantidade: </Text>
      <TextInput
        value={quantidade}
        onChangeText={setQuantidade}

        placeholder="Ex: 2"
        placeholderTextColor='rgb(200, 200, 200)'
        style={styles.txtInput}
      />
      <Switch
        value={unidadeMedida === 'ml'}
        onValueChange={toggleUnidadeMedida}
      />
      <Text style={styles.titleinput}>Validade: </Text>
      <TextInput
        value={validade}
        onChangeText={setValidade}

        style={styles.txtInput}
        placeholder="Ex: 12/07/2025"
        placeholderTextColor='rgb(200, 200, 200)'
      />

      <Text style={styles.titleinput}>Localização: </Text>
      <TextInput
        value={localizacao}
        onChangeText={setLocalizacao}

        placeholder="Ex: Armário de Reagentes"
        placeholderTextColor='rgb(200, 200, 200)'
        style={styles.txtInput}
      />
      <Button
        title='Cadastrar reagentes'
        //disabled={true}
        onPress={insertDatas}
      />
      <Button
        title='Consulta teste'
        //disabled={true}
        onPress={consultaDados}
      />
      <Button
        title='Deletar'
        //disabled={true}
        onPress={deletarDados}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerReagentes:{
    backgroundColor: 'rgb(255, 255, 255)',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleHeader:{
    fontWeight: '500',
    fontSize: 17,
  },
  txtInput:{
    margin: 10,
    padding: 7,
    borderRadius: 5,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  titleinput:{
    marginTop: 10,
    marginHorizontal: 16,
  },
  image:{
    height: 20,
    width: 20,
    marginHorizontal: 16,
}
});