import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/styles';
import Toast from 'react-native-toast-message';

export default function OrdersScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarPedidos = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem('pedidos');
      const dados = json ? JSON.parse(json) : [];
      
      // Adiciona status colorido e formatação de data
      const pedidosFormatados = dados.reverse().map(pedido => ({
        ...pedido,
        statusColor: getStatusColor(pedido.status),
        dataFormatada: formatarData(pedido.data),
        total: calcularTotalPedido(pedido.itens)
      }));
      
      setPedidos(pedidosFormatados);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível carregar seus pedidos',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'entregue': return '#2ecc71';
      case 'cancelado': return '#e74c3c';
      case 'processando': return '#f39c12';
      case 'enviado': return '#3498db';
      default: return '#7f8c8d';
    }
  };

  const formatarData = (dataString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
  };

  const calcularTotalPedido = (itens) => {
    return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  useFocusEffect(
    useCallback(() => {
      carregarPedidos();
    }, [carregarPedidos])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarPedidos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={stylesLocal.pedidoContainer}
      onPress={() => navigation.navigate('OrderDetail', { pedido: item })}
    >
      <View style={stylesLocal.pedidoHeader}>
        <Text style={stylesLocal.pedidoNumero}>Pedido #{item.id}</Text>
        <Text style={[stylesLocal.pedidoStatus, { color: item.statusColor }]}>
          {item.status}
        </Text>
      </View>
      
      <Text style={stylesLocal.pedidoData}>📅 {item.dataFormatada}</Text>
      
      <View style={stylesLocal.itensContainer}>
        {item.itens.slice(0, 2).map((produto, index) => (
          <View key={index} style={stylesLocal.produto}>
            <Text style={stylesLocal.nome} numberOfLines={1}>
              {produto.quantidade}x {produto.nome}
            </Text>
            <Text style={stylesLocal.preco}>
              {(produto.preco * produto.quantidade).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </View>
        ))}
        {item.itens.length > 2 && (
          <Text style={stylesLocal.maisItens}>+ {item.itens.length - 2} itens</Text>
        )}
      </View>
      
      <View style={stylesLocal.pedidoFooter}>
        <Text style={stylesLocal.total}>
          Total: {item.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
        <Icon name="chevron-right" size={20} color="#999" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      {pedidos.length === 0 ? (
        <View style={stylesLocal.emptyContainer}>
          <Icon name="receipt" size={60} color="#ccc" />
          <Text style={stylesLocal.emptyText}>Nenhum pedido encontrado</Text>
          <Text style={stylesLocal.emptySubtext}>Seus pedidos aparecerão aqui</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Fazer compras</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={pedidos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={stylesLocal.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
            />
          }
        />
      )}
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  pedidoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  pedidoNumero: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  pedidoStatus: {
    fontWeight: '600',
    fontSize: 14,
  },
  pedidoData: {
    color: '#666',
    marginBottom: 10,
    fontSize: 13,
  },
  itensContainer: {
    marginBottom: 10,
  },
  produto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  nome: {
    flex: 1,
    color: '#555',
    marginRight: 10,
  },
  preco: {
    fontWeight: '600',
    color: '#333',
  },
  maisItens: {
    color: '#3498db',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  pedidoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 5,
  },
  total: {
    fontWeight: 'bold',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});