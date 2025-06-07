import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Button } from 'react-native';
import api from '../services/api';

const MonitoringScreen = () => {
    const [ultimaLeitura, setUltimaLeitura] = useState(null);
    const [loading, setLoading] = useState(true);

    const carregarUltimaLeitura = async () => {
        try {
            setLoading(true);
            const response = await api.get('/historico');
            const dadosOrdenados = response.data.sort((a, b) => new Date(b.dataLeitura) - new Date(a.dataLeitura));
            setUltimaLeitura(dadosOrdenados[0] || null); // Pega o primeiro item ou null se a lista estiver vazia
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarUltimaLeitura();
    }, []);

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>Status Atual</Text>
                {ultimaLeitura ? (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Última Leitura (ID: {ultimaLeitura.id})</Text>
                        <Text style={styles.riskText}>{ultimaLeitura.nivelRisco}</Text>
                        <Text style={styles.infoText}>Nível da Água: {ultimaLeitura.nivelAgua}</Text>
                        <Text style={styles.infoText}>Clima: {ultimaLeitura.clima}</Text>
                        <Text style={styles.dateText}>Registrado em: {new Date(ultimaLeitura.dataLeitura).toLocaleString('pt-BR')}</Text>
                    </View>
                ) : (
                    <Text>Nenhum dado de monitoramento disponível.</Text>
                )}
                <Button title="Atualizar Status" onPress={carregarUltimaLeitura} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    container: { flex: 1, padding: 20, alignItems: 'center' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    card: { backgroundColor: 'white', borderRadius: 10, padding: 20, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    riskText: { fontSize: 22, fontWeight: 'bold', color: '#c0392b', marginVertical: 15, textAlign: 'center' },
    infoText: { fontSize: 18, marginBottom: 5 },
    dateText: { fontSize: 14, color: '#888', marginTop: 15 }
});


export default MonitoringScreen;