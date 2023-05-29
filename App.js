import {React, useState, useEffect} from 'react';
import {
  Text, 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Button,
  Switch,
  ScrollView
} from 'react-native';
import * as SQLite from "expo-sqlite";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaskedTextInput } from 'react-native-mask-text';

export default function CadastroReagentes( ){

  const db = SQLite.openDatabase('dbName');

  function apagarTabelas(){
    db.transaction((tx) => {
      // Execute a instrução SQL para remover a tabela
      tx.executeSql('DROP TABLE IF EXISTS lote;', [], (_, result) => {
        console.log('Tabela apagada com sucesso.');
      },
      (_, error) => {
        console.log('Erro ao apagar tabela:', error);
      });
    });
    db.transaction((tx) => {
      // Execute a instrução SQL para remover a tabela
      tx.executeSql('DROP TABLE IF EXISTS produto;', [], (_, result) => {
        console.log('Tabela apagada com sucesso.');
      },
      (_, error) => {
        console.log('Erro ao apagar tabela:', error);
      });
    });
  }
  
 

  
      db.transaction((tx) => {
        // Execute a instrução SQL para remover a tabela
        tx.executeSql('CREATE TABLE IF NOT EXISTS lote (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT, validade TEXT, quantidade_geral REAL, unidade_medida TEXT, localizacao TEXT)', [], (_, result) => {
          console.log('Tabela criada com sucesso.');
        },
        (_, error) => {
          console.log('Erro ao apagar tabela:', error);
        });
      });
      db.transaction((tx) => {
        // Execute a instrução SQL para remover a tabela
        tx.executeSql('CREATE TABLE IF NOT EXISTS produto (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, lote_id INTEGER, FOREIGN KEY (lote_id) REFERENCES lote (id))', [], (_, result) => {
          console.log('Tabela criada com sucesso.');
        },
        (_, error) => {
          console.log('Erro ao apagar tabela:', error);
        });
      });


    
    //apagarTabelas()
    //criarTabelas()

  

  function deletarDados(){
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM produto',
        [],
        () => {
          console.log('Dados deletados com sucesso!');
        },
        (error) => {
          console.log('Erro ao deletar dados:', error);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM lote',
        [],
        () => {
          console.log('Dados deletados com sucesso!');
        },
        (error) => {
          console.log('Erro ao deletar dados:', error);
        }
      );
    });
  }


  function consultaDados(){
    db.transaction(tx => {
      tx.executeSql('SELECT produto.nome, lote.numero, lote.quantidade_geral, lote.unidade_medida FROM produto, lote ON produto.lote_id = lote.id ', [], (_, { rows }) => {
        console.log(rows._array);
      },
      error => {
        console.log('Erro ao consultar dados:', error);
      }
      );
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM produto ', [], (_, { rows }) => {
        console.log(rows._array);
      },
      error => {
        console.log('Erro ao consultar dados:', error);
      }
      );
      
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM lote ', [], (_, { rows }) => {
        console.log(rows._array);
      },
      error => {
        console.log('Erro ao consultar dados:', error);
      }
      );
      
    });
    
  }

  const[nomeReagente, setNomeReagente] = useState('')
  const[lote, setLote ] = useState('')
  const[quantidadeUnitario, setQuantidadeUnitario] = useState('')
  const[validade, setValidade] = useState('')
  const[localizacao, setLocalizacao] = useState('')

  const[boolunidadeMedida, setBoolUnidadeMedida] = useState(false);
  const[sufixo, setSufixo] = useState('ml');
  const[quantidadeFrascos, setQuantidadeFrascos] = useState('')
  const[quantidadeCalculada, setQuantidadeCalculada] = useState('')

  useEffect(()=>{
    setQuantidadeCalculada(parseFloat(quantidadeFrascos)*parseFloat(quantidadeUnitario))
  })

  useEffect(() => {
    // Atualiza o sufixo quando o valor do switch é alterado
    if (boolunidadeMedida) {
      setSufixo('ml');
    } else {
      setSufixo('g');
    }

  }, [boolunidadeMedida ]);
  


  function insertDatas() {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO lote (numero, validade, quantidade_geral, unidade_medida, localizacao) VALUES (?, ?, ?, ?, ?)',
        [lote, validade, parseFloat(quantidadeCalculada), sufixo, localizacao],
        (tx, result) => {
          const loteId = result.insertId; // Recupera o ID do lote inserido
          console.log('Lote inserido com sucesso', loteId);
  
          tx.executeSql(
            'INSERT INTO produto (nome, lote_id) VALUES (?, ?)',
            [nomeReagente, loteId], // Insere o ID do lote recuperado
            () => {
              console.log('Produto inserido com sucesso');
            },
            error => {
              console.log('Error inserting data2: ', error);
            }
          );
        },
        error => {
          console.log('Error inserting data1: ', error);
        }
      );
    });
  }
  

  return(
    <SafeAreaView>
      <ScrollView>
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

      <Text style={styles.titleinput}>Quantidade de cada frasco: </Text>
      <TextInput
        value={quantidadeUnitario}
        onChangeText={setQuantidadeUnitario}

        style={styles.txtInput}
        placeholder="Ex: 120"
        placeholderTextColor='rgb(200, 200, 200)'
      />

      <Switch
        value={boolunidadeMedida}
        onValueChange={setBoolUnidadeMedida}
      />
      <Text style={styles.titleinput}>Quantidade de frascos: </Text>
      <TextInput
        value={quantidadeFrascos}
        onChangeText={setQuantidadeFrascos}

        style={styles.txtInput}
        placeholder="Ex: 7234923"
        placeholderTextColor='rgb(200, 200, 200)'
      />

      <Text style={styles.titleinput}>Validade: </Text>

      <MaskedTextInput
          mask="99-99-9999"
          placeholder="Ex: 01-01-2021"
          placeholderTextColor='rgb(200, 200, 200)'
          onChangeText={setValidade}
          keyboardType="numeric"
          style={styles.txtInput}
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
      <Button
        title='drop table'
        disabled={true}
        onPress={()=>{}}
      />
      </ScrollView>
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