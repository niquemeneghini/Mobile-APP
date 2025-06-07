import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import styles from '../styles/styles';

export default function CartScreen({ navigation }) {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarCarrinho = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem('carrinho');
      const dados = json ? JSON.parse(json) : [];

      const agrupado = dados.reduce((acc, item) => {
        const existente = acc.find(i => i.id === item.id);
        if (existente) {
          existente.quantidade += 1;
        } else {
          acc.push({ ...item, quantidade: 1 });
        }
        return acc;
      }, []);

      setCarrinho(agrupado);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível carregar o carrinho.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
    }, [carregarCarrinho])
  );

  const atualizarQuantidade = async (id, novaQtd) => {
    if (novaQtd < 1) return removerDoCarrinho(id);

      try {
    const json = await AsyncStorage.getItem('carrinho');
    let original = json ? JSON.parse(json) : [];

    // Remove todos os itens com o id
    original = original.filter(item => item.id !== id);

    // Pega o produto no carrinho agrupado
    const produto = carrinho.find(i => i.id === id);

    if (!produto) return;

    // Cria um array com novaQtd cópias do produto original (sem quantidade)
    const novo = [
      ...original,
      ...Array(novaQtd).fill().map(() => {
        const { quantidade, ...produtoSemQtd } = produto;
        return produtoSemQtd;
      })
    ];

    await AsyncStorage.setItem('carrinho', JSON.stringify(novo));
    carregarCarrinho();
  } catch (e) {
    console.error(e);
  }
};

  const removerDoCarrinho = async (id) => {
    try {
      const json = await AsyncStorage.getItem('carrinho');
      const atual = json ? JSON.parse(json) : [];
      const atualizado = atual.filter(item => item.id !== id);
      await AsyncStorage.setItem('carrinho', JSON.stringify(atualizado));
      carregarCarrinho();

      Toast.show({
        type: 'success',
        text1: 'Removido',
        text2: 'Produto removido do carrinho.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível remover o produto.',
      });
    }
  };

  const calcularTotal = () => {
    return carrinho
      .reduce((total, item) => total + item.preco * item.quantidade, 0)
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
  <Image source={{ uri: item.imagem }} style={styles.cartImage} onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)} />

  <View style={{ flex: 1 }}>
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.nome}</Text>
      <Text style={styles.itemPrice}>
        {item.preco.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
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
          currency: 'BRL',
        })}
      </Text>
    </View>
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
        </View>
      ) : (
        <>
          <FlatList
            data={carrinho}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {calcularTotal()}</Text>
          <TouchableOpacity
  style={styles.checkoutButton}
  onPress={() => {
    if (carrinho.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Carrinho vazio',
        text2: 'Adicione itens antes de finalizar a compra.',
      });
    } else {
      navigation.navigate('Checkout');
    }
  }}
>
  <Text style={styles.checkoutText}>Finalizar Compra</Text>
</TouchableOpacity>

          </View>
        </>
      )}
    </View>
  );
console.log('Dados carregados do AsyncStorage:', dados);
console.log('Carrinho agrupado:', agrupado);
}
