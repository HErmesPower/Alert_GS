import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    // SafeAreaView garante que os botões não fiquem sob o entalhe (notch) do celular
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    // SafeAreaView garante que os botões não fiquem sob o entalhe (notch) do celular
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Sistema de Alerta de Enchentes</Text>

        {/* Adicionei um View em volta de cada botão para dar espaçamento */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Monitoramento Atual" 
            onPress={() => navigation.navigate('Monitoring')}
            color="#007BFF" // <-- MUDANÇA
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Alertas Ativos" 
            onPress={() => navigation.navigate('Alerts')}
            color="#f0ad4e" // Cor de aviso (mantida)
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Ação e Controle" 
            onPress={() => navigation.navigate('Control')}
            color="#d9534f" // Cor de perigo (mantida)
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Histórico Completo" 
            onPress={() => navigation.navigate('History')} 
            color="#007BFF" // <-- MUDANÇA
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Cadastrar Nova Leitura" 
            onPress={() => navigation.navigate('Cadastro')} 
            color="#28a745" // <-- MUDANÇA (usei um verde para destacar)
          />
        </V>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF6FF' // <-- MUDANÇA (azul bem claro)
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center',
    color: '#0D47A1' 
  },

  buttonContainer: {
    width: '80%', 
    marginVertical: 10, 
  }
});
        <Text style={styles.title}>Bem-vindo ao Sistema de Alerta de Enchentes</Text>

        {/* Adicionei um View em volta de cada botão para dar espaçamento */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Monitoramento Atual" 
            onPress={() => navigation.navigate('Monitoring')} 
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Alertas Ativos" 
            onPress={() => navigation.navigate('Alerts')}
            color="#f0ad4e" // Cor de aviso
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Ação e Controle" 
            onPress={() => navigation.navigate('Control')}
            color="#d9534f" // Cor de perigo
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Histórico Completo" 
            onPress={() => navigation.navigate('History')} 
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Cadastrar Nova Leitura" 
            onPress={() => navigation.navigate('Cadastro')} 
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  // Adicionei este estilo para o espaçamento dos botões
  buttonContainer: {
    width: '80%', // Define uma largura para os botões
    marginVertical: 10, // Adiciona um espaço vertical entre eles
  }
});