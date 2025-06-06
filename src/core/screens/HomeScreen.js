import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import Toast from 'react-native-toast-message';
import produtosFake from '../screens/produtosFake';

const HomeScreen = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento assíncrono
    const timer = setTimeout(() => {
      setProdutos(produtosFake);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const adicionarAoCarrinho = useCallback(async (produto) => {
    try {
      const carrinhoAtual = await AsyncStorage.getItem('carrinho');
      const novoCarrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : [];
      
      // Verifica se o produto já está no carrinho
      const produtoExistente = novoCarrinho.find(p => p.id === produto.id);
      
      if (produtoExistente) {
        produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
      } else {
        novoCarrinho.push({ ...produto, quantidade: 1 });
      }

      await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      
      Toast.show({
        type: 'success',
        text1: 'Produto adicionado!',
        text2: `${produto.nome} foi adicionado ao carrinho.`,
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível adicionar ao carrinho.',
        position: 'bottom',
      });
    }
  }, []);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.imagem }} 
        style={styles.productImage} 
        resizeMode="contain"
      />
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.price}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => adicionarAoCarrinho(item)}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  ), []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossos Produtos</Text>
      
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2} // Layout em grid
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum produto disponível</Text>
        }
      />
    </View>
  );
};

export default HomeScreen;

/*
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles'; // ajuste conforme o caminho real
import produtosFake from '../screens/produtosFake'; // ajuste conforme o local do arquivo de produtos

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    setProdutos(produtosFake);
  }, []);

  const adicionarAoCarrinho = async (produto) => {
    try {
      const json = await AsyncStorage.getItem('carrinho');
      const atual = json ? JSON.parse(json) : [];
      atual.push(produto);
      await AsyncStorage.setItem('carrinho', JSON.stringify(atual));
      Alert.alert('Produto adicionado ao carrinho!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar ao carrinho');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.productImage} />
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text>R$ {item.preco}</Text>
            <TouchableOpacity style={styles.button} onPress={() => adicionarAoCarrinho(item)}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
*/