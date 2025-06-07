import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import api from '../services/api';

const AlertsScreen = () => {
    const [alertas, setAlertas] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarAlertas = async () => {
        try {
            setLoading(true);
            const response = await api.get('/historico');
            // Filtra para pegar apenas itens que contenham a palavra "RISCO"
            const dadosFiltrados = response.data.filter(item => 
                item.nivelRisco && item.nivelRisco.toUpperCase().includes('RISCO')
            );
            const dadosOrdenados = dadosFiltrados.sort((a, b) => new Date(b.dataLeitura) - new Date(a.dataLeitura));
            setAlertas(dadosOrdenados);
        } catch (error) {
            console.error("Erro ao carregar alertas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarAlertas();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                style={styles.container}
                data={alertas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={item.nivelRisco.toUpperCase().includes('ALTO') ? styles.listItemHighRisk : styles.listItemModerateRisk}>
                        <Text style={styles.itemText}>ID: {item.id} - Clima: {item.clima}</Text>
                        <Text style={styles.riskText}>{item.nivelRisco}</Text>
                        <Text style={styles.infoText}>Nível da Água: {item.nivelAgua}</Text>
                        <Text style={styles.itemDate}>{new Date(item.dataLeitura).toLocaleString('pt-BR')}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.center}>Nenhum alerta ativo no momento.</Text>}
                onRefresh={carregarAlertas}
                refreshing={loading}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    container: { flex: 1, padding: 10 },
    center: { textAlign: 'center', marginTop: 20 },
    listItem: { padding: 15, borderRadius: 5, marginBottom: 10, marginHorizontal: 10 },
    listItemHighRisk: { backgroundColor: '#ffcccc' /* Vermelho claro */, padding: 15, borderRadius: 5, marginBottom: 10, marginHorizontal: 10 },
    listItemModerateRisk: { backgroundColor: '#fff3cd' /* Amarelo claro */, padding: 15, borderRadius: 5, marginBottom: 10, marginHorizontal: 10 },
    riskText: { fontSize: 16, fontWeight: 'bold', color: '#856404', marginBottom: 5 },
    itemText: { fontWeight: 'bold' },
    infoText: { color: '#333' },
    itemDate: { fontSize: 12, color: '#888', marginTop: 5 }
});

export default AlertsScreen;