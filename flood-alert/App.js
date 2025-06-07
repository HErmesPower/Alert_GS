import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import MonitoringScreen from './screens/MonitoringScreen';
import AlertsScreen from './screens/AlertsScreen';
import ControlScreen from './screens/ControlScreen';
import HistoryScreen from './screens/HistoryScreen';
import CadastroScreen from './screens/CadastroScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* ================================================================= */}
      {/* AQUI ESTÁ A ÚNICA MUDANÇA NECESSÁRIA */}
      <Stack.Navigator initialRouteName="Welcome"> 
      {/* ================================================================= */}
      
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bem-vindo' }} />
        <Stack.Screen name="Monitoring" component={MonitoringScreen} options={{ title: 'Monitoramento' }} />
        <Stack.Screen name="Alerts" component={AlertsScreen} options={{ title: 'Alertas' }} />
        <Stack.Screen name="Control" component={ControlScreen} options={{ title: 'Ação e Controle' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro de Leituras' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}