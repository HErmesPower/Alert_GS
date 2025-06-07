import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import api from '../services/api';

const HistoryScreen = () => {
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarHistorico = async () => {
        try {
            setLoading(true);
            const response = await api.get('/historico');
            const dadosOrdenados = response.data.sort((a, b) => new Date(b.dataLeitura) - new Date(a.dataLeitura));
            setHistorico(dadosOrdenados);
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarHistorico();
    }, []);

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                style={styles.container}
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
                ListEmptyComponent={<Text style={styles.center}>Nenhum registro encontrado.</Text>}
                onRefresh={carregarHistorico} // Permite "puxar para atualizar"
                refreshing={loading}
            />
        </SafeAreaView>
    );
};

// ... (copie os mesmos estilos do seu CadastroScreen.js aqui)
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    container: { flex: 1, padding: 10 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listItem: { backgroundColor: 'white', padding: 15, borderRadius: 5, marginBottom: 10, marginHorizontal: 10 },
    riskText: { fontSize: 16, fontWeight: 'bold', color: '#c0392b', marginBottom: 5 },
    itemText: { fontWeight: 'bold' },
    itemDate: { fontSize: 12, color: '#888', marginTop: 5 }
});

export default HistoryScreen;