import { useState, useEffect  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Button,
  Alert,
  FlatList, TouchableOpacity
} from 'react-native';

import * as SQLite from "expo-sqlite";

export default function App() {
  const db = SQLite.openDatabase('dbName');

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS MyTable (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50))'
    );
    tx.executeSql(
      'INSERT INTO MyTable (name) VALUES (?)',
      ['Name'],
      () => {
        console.log('Data inserted successfully.');
      },
      error => {
        console.log('Error inserting data: ', error);
      }
    );
  });
  
  function consultaDados(){
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM MyTable', [], (_, { rows }) => {
        console.log(rows._array);
      });
    });
  }

  function inserirDados(){
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO MyTable (name) VALUES (?)',
        ['John Doe'],
        () => {
          console.log('Data inserted successfully.');
        },
        error => {
          console.log('Error inserting data: ', error);
        }
      );
    });
  }

  function deletarDados(){
    db.transaction(tx => {
      tx.executeSql('DELETE FROM MyTable', () => {
        console.log('Delete successfull');
      });
      error => {
        console.log('Error inserting data: ', error);
      }
      console.log('Delete successfull');
    });
  }
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="rgb(100, 100, 100)"
      />
      
      <Text>TESTE</Text>
      <Text>Teste</Text>
      <Button
        title='consult'
        onPress={consultaDados}
      />
      <Button
        title='insert data'
        onPress={inserirDados}
      />
      <Button
        title='delete all data'
        onPress={deletarDados}
      />
      
    </View>
  );
}