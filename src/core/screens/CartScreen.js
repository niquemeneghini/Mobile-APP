import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import styles from '../styles/styles';

export default function CartScreen({ navigation }) {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarCarrinho = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem('carrinho');
      const dados = json ? JSON.parse(json) : [];
      
      // Agrupa itens iguais e calcula subtotal
      const carrinhoAgrupado = dados.reduce((acc, item) => {
        const existente = acc.find(i => i.id === item.id);
        if (existente) {
          existente.quantidade = (existente.quantidade || 1) + 1;
          existente.subtotal = existente.preco * existente.quantidade;
        } else {
          acc.push({
            ...item,
            quantidade: 1,
            subtotal: item.preco
          });
        }
        return acc;
      }, []);
      
      setCarrinho(carrinhoAgrupado);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível carregar o carrinho',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
    }, [carregarCarrinho])
  );

  const removerDoCarrinho = async (id) => {
    try {
      const json = await AsyncStorage.getItem('carrinho');
      const atual = json ? JSON.parse(json) : [];
      
      const atualizado = atual.filter(item => item.id !== id);
      await AsyncStorage.setItem('carrinho', JSON.stringify(atualizado));
      
      carregarCarrinho(); // Recarrega os dados atualizados
      
      Toast.show({
        type: 'success',
        text1: 'Removido',
        text2: 'Produto removido do carrinho',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao remover produto',
        position: 'bottom',
      });
    }
  };

  const atualizarQuantidade = async (id, novaQuantidade) => {
    if (novaQuantidade < 1) {
      removerDoCarrinho(id);
      return;
    }

    try {
      const json = await AsyncStorage.getItem('carrinho');
      const atual = json ? JSON.parse(json) : [];
      
      const atualizado = atual.map(item => 
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      );
      
      await AsyncStorage.setItem('carrinho', JSON.stringify(atualizado));
      carregarCarrinho();
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0)
           .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imagem }} style={styles.cartImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.nome}</Text>
        <Text style={styles.itemPrice}>
          {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => atualizarQuantidade(item.id, item.quantidade - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantidade}</Text>
          
          <TouchableOpacity 
            onPress={() => atualizarQuantidade(item.id, item.quantidade + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.subtotal}>
          Subtotal: {(item.preco * item.quantidade).toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          })}
        </Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => removerDoCarrinho(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>
      
      {carrinho.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.continueText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={carrinho}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            refreshing={refreshing}
            onRefresh={carregarCarrinho}
          />
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {calcularTotal()}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}