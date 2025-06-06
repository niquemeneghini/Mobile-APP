import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import styles from '../styles/styles';

export default function CartScreen() {
  const [carrinho, setCarrinho] = useState([]);

  const carregarCarrinho = async () => {
    try {
      const json = await AsyncStorage.getItem('carrinho');
      const dados = json ? JSON.parse(json) : [];
      setCarrinho(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o carrinho.');
    }
  };

  // 👇 Toda vez que a tela voltar a ser exibida, recarrega
  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
    }, [])
  );

const removerDoCarrinho = async (id) => {
  try {
    const json = await AsyncStorage.getItem('carrinho');
    const atual = json ? JSON.parse(json) : [];

    const produtoRemovido = atual.find((item) => item.id === id);
    const atualizado = atual.filter((item) => item.id !== id);

    await AsyncStorage.setItem('carrinho', JSON.stringify(atualizado));
    setCarrinho(atualizado);

    Toast.show({
      type: 'info',
      text1: 'Produto removido',
      text2: produtoRemovido
        ? `${produtoRemovido.nome} foi removido do carrinho.`
        : 'Produto removido.',
      position: 'bottom',
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
    return carrinho.reduce((soma, item) => soma + item.preco, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>

      {carrinho.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.imagem }} style={styles.productImage} />
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text>R$ {item.preco.toFixed(2)}</Text>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#ff4444', marginTop: 5 }]}
                  onPress={() => removerDoCarrinho(index)}
                >
                  <Text style={styles.buttonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.total}>Total: R$ {calcularTotal()}</Text>
        </>
      )}
    </View>
  );
}
