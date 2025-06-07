import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';
import api from '../services/api';

const ControlScreen = () => {
    const [riscos, setRiscos] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarRiscos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/historico');
            const dadosFiltrados = response.data.filter(item => 
                item.nivelRisco && item.nivelRisco.toUpperCase().includes('RISCO')
            );
            const dadosOrdenados = dadosFiltrados.sort((a, b) => new Date(b.dataLeitura) - new Date(a.dataLeitura));
            setRiscos(dadosOrdenados);
        } catch (error) {
            console.error("Erro ao carregar riscos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarRiscos();
    }, []);

    const handleAcionarBarreira = async (idSensor) => {
        try {
            const response = await api.post(`/controle/barreira/${idSensor}`);
            Alert.alert("Sucesso", response.data);
        } catch (error) {
            console.error("Erro ao acionar barreira:", error);
            Alert.alert("Erro", "Não foi possível acionar a barreira.");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                style={styles.container}
                data={riscos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemText}>ID do Sensor: {item.id}</Text>
                        <Text style={styles.riskText}>{item.nivelRisco}</Text>
                        <Button
                            title="Acionar Barreira de Contenção"
                            onPress={() => handleAcionarBarreira(item.id)}
                            color="#c0392b"
                        />
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.center}>Nenhum risco ativo que necessite de ação.</Text>}
                onRefresh={carregarRiscos}
                refreshing={loading}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    container: { flex: 1, padding: 10 },
    center: { textAlign: 'center', marginTop: 20 },
    listItem: { backgroundColor: 'white', padding: 15, borderRadius: 5, marginBottom: 10, marginHorizontal: 10 },
    riskText: { fontSize: 16, fontWeight: 'bold', color: '#c0392b', marginBottom: 15, textAlign: 'center' },
    itemText: { fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
});

export default ControlScreen;