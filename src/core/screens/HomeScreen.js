import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import Toast from 'react-native-toast-message';

import produtosFake from '../screens/produtosFake'; // novo local do arquivo

const HomeScreen = () => {
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
    
    Toast.show({
      type: 'success',
      text1: 'Produto adicionado!',
      text2: `${produto.nome} foi adicionado ao carrinho.`,
      position: 'bottom',
    });

  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'Não foi possível adicionar ao carrinho.',
    });
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