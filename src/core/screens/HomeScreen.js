import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Adicione esta linha
import styles from '../styles/styles';
import Toast from 'react-native-toast-message';
import produtosFake from '../screens/produtosFake';

const HomeScreen = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Filtra produtos baseado na busca
  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Carrega a quantidade de itens no carrinho
  const loadCartCount = useCallback(async () => {
    try {
      const cart = await AsyncStorage.getItem('carrinho');
      const cartItems = cart ? JSON.parse(cart) : [];
      setCartItemCount(cartItems.reduce((total, item) => total + (item.quantidade || 1), 0));
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }, []);

  const carregarProdutos = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setProdutos(produtosFake);
      setLoading(false);
      setRefreshing(false);
      loadCartCount(); // Atualiza contador do carrinho
    }, 800);
  }, [loadCartCount]);

  useEffect(() => {
    carregarProdutos();
    
    // Configura o botão do carrinho no header
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('Carrinho')}
          style={{ marginRight: 15 }}
        >
          <View style={{ position: 'relative' }}>
            <Icon name="shopping-cart" size={24} color="#fff" />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, carregarProdutos, cartItemCount]);

  const adicionarAoCarrinho = useCallback(async (produto) => {
    try {
      const carrinhoAtual = await AsyncStorage.getItem('carrinho');
      const novoCarrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : [];

      const produtoExistente = novoCarrinho.find(p => p.id === produto.id);

      if (produtoExistente) {
        produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
      } else {
        novoCarrinho.push({ ...produto, quantidade: 1 });
      }

      await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      loadCartCount(); // Atualiza o contador

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
  }, [loadCartCount]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity 
      style={styles.gridCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.imagem }}
        style={styles.gridImage}
        resizeMode="contain"
      />
      <Text style={styles.gridTitle} numberOfLines={2}>{item.nome}</Text>
      <Text style={styles.gridPrice}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
      <TouchableOpacity
        style={styles.gridButton}
        onPress={(e) => {
          e.stopPropagation(); // Evita navegar para detalhes ao clicar no botão
          adicionarAoCarrinho(item);
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  ), [adicionarAoCarrinho, navigation]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.homeContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produtos..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon 
          name="search" 
          size={20} 
          color="#999" 
          style={styles.searchIcon}
        />
      </View>

      <FlatList
        data={filteredProdutos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarProdutos}
            colors={['#3498db']}
            tintColor="#3498db"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={50} color="#ccc" />
            <Text style={styles.emptyText}>
              {searchQuery ? 'Nenhum produto encontrado' : 'Nenhum produto disponível'}
            </Text>
          </View>
        }
        ListHeaderComponent={
          <Text style={styles.title}>Nossos Produtos</Text>
        }
      />
      
      <Toast />
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