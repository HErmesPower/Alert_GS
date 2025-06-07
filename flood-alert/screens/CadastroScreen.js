import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView // Usado para garantir que o conteúdo não fique sob barras de status, etc.
} from 'react-native';

import api from '../services/api';

const CadastroScreen = () => {
  const [historico, setHistorico] = useState([]);
  const [nivelAgua, setNivelAgua] = useState('');
  const [clima, setClima] = useState('');

  const carregarHistorico = async () => {
    try {
      // Usando o Insomnia, você pode cadastrar dados para ver a lista funcionar.
      const response = await api.get('/historico');
      // Ordena os dados para mostrar os mais recentes primeiro
      const dadosOrdenados = response.data.sort((a, b) => new Date(b.dataLeitura) - new Date(a.dataLeitura));
      setHistorico(dadosOrdenados);
    } catch (error) {
      console.error("Erro ao carregar histórico: ", error);
      Alert.alert("Erro", "Não foi possível carregar o histórico. Verifique se sua API está rodando.");
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  const handleSalvar = async () => {
    if (!nivelAgua || !clima) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    const novoDado = {
      nivelAgua: parseFloat(nivelAgua),
      clima: clima,
    };

    try {
      await api.post('/sensor', novoDado);
      Alert.alert("Sucesso!", "Novo registro salvo.");
      
      setNivelAgua('');
      setClima('');
      carregarHistorico(); 

    } catch (error) {
      console.error("Erro ao salvar o dado: ", error);
      Alert.alert("Erro", "Não foi possível salvar o registro.");
    }
  };

  return (
    // SafeAreaView é uma boa prática para evitar que o conteúdo sobreponha a interface do celular/navegador
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* SEÇÃO DO FORMULÁRIO */}
        <View>
          <Text style={styles.title}>Cadastrar Nova Leitura</Text>
          <TextInput
            style={styles.input}
            placeholder="Nível da Água (ex: 6.5)"
            value={nivelAgua}
            onChangeText={setNivelAgua}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Clima (ex: Chuvoso)"
            value={clima}
            onChangeText={setClima}
          />
          <Button title="Salvar Registro" onPress={handleSalvar} />
        </View>

        {/* SEÇÃO DA LISTA DE HISTÓRICO */}
        <Text style={styles.title}>Histórico de Leituras</Text>
        <FlatList
          style={styles.list}
          data={historico}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemText}>ID: {item.id} - Clima: {item.clima}</Text>
              <Text style={styles.riskText}>{item.nivelRisco}</Text>
              <Text>Nível da Água: {item.nivelAgua}</Text>
              <Text style={styles.itemDate}>{new Date(item.dataLeitura).toLocaleString('pt-BR')}</Text>
            </View>
          )}
          // Mensagem para quando a lista estiver vazia
          ListEmptyComponent={<Text>Nenhum registro encontrado. Cadastre um novo ou envie dados via Insomnia.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  list: {
    flex: 1, // Garante que a lista ocupe o espaço restante
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  riskText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0392b',
    marginBottom: 5,
  },
  itemText: {
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  }
});

export default CadastroScreen;