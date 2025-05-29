import React, { useState, useEffect } from 'react'; 
import { View, Text, FlatList, TextInput, Alert, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const produtosFake = [
  { id: '1', nome: 'Troféu 2000', preco: 49.9, imagem: 'https://png.pngtree.com/png-clipart/20221013/original/pngtree-fifa-football-world-cup-official-trophy-png-image_8680989.png' },
  { id: '2', nome: 'Troféu 2002', preco: 89.9, imagem: 'https://via.placeholder.com/150/28a745/ffffff?text=Calça' },
  { id: '3', nome: 'Troféu 2004', preco: 129.9, imagem: 'https://via.placeholder.com/150/ffc107/000000?text=Tênis' },
  { id: '4', nome: 'Troféu 2008', preco: 89.9, imagem: 'https://via.placeholder.com/150/28a745/ffffff?text=Calça' },
  { id: '5', nome: 'Troféu 2010', preco: 49.9, imagem: 'https://via.placeholder.com/150/007bff/ffffff?text=Camiseta' },
  { id: '6', nome: 'Troféu 2012', preco: 49.9, imagem: 'https://via.placeholder.com/150/007bff/ffffff?text=Camiseta' },
  { id: '7', nome: 'Troféu 2014', preco: 49.9, imagem: 'https://via.placeholder.com/150/007bff/ffffff?text=Camiseta' },
  { id: '8', nome: 'Troféu 2018', preco: 49.9, imagem: 'https://via.placeholder.com/150/007bff/ffffff?text=Camiseta' },
  { id: '9', nome: 'Troféu 2020', preco: 49.9, imagem: 'https://via.placeholder.com/150/007bff/ffffff?text=Camiseta' },
  { id: '10', nome: 'Troféu 2022', preco: 49.9, imagem: 'https://via.placeholder.com/150/007bff/ffffff?text=Camiseta' },
  { id: '11', nome: 'Troféu 2024', preco: 49.9, imagem: 'https://via.placeholder.com/150/007bff/ffffff?text=Camiseta' },
  { id: '12', nome: 'Troféu 2026', preco: 49.9, imagem: 'https://via.placeholder.com/150/007bff/ffffff?text=Camiseta' },

];

const Login = ({ navigation, funcLogar }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const logar = async () => {
    const emailSalvo = await SecureStore.getItemAsync('usuario_email');
    const senhaSalva = await SecureStore.getItemAsync('usuario_senha');

    if (email === emailSalvo && senha === senhaSalva) {
      funcLogar(true);
    } else {
      Alert.alert('Login falhou', 'E-mail ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={logar}>
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registrar')}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const Registrar = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const registrar = async () => {
    if (email && senha) {
      await SecureStore.setItemAsync('usuario_email', email);
      await SecureStore.setItemAsync('usuario_senha', senha);
      Alert.alert('Sucesso', 'Usuário registrado!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={registrar}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    setProdutos(produtosFake);
  }, []);

  const adicionarAoCarrinho = async (produto) => {
    const json = await AsyncStorage.getItem('carrinho');
    const atual = json ? JSON.parse(json) : [];
    atual.push(produto);
    await AsyncStorage.setItem('carrinho', JSON.stringify(atual));
    Alert.alert('Produto adicionado ao carrinho!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
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

const Carrinho = ({ navigation }) => {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carregarCarrinho = async () => {
      const json = await AsyncStorage.getItem('carrinho');
      if (json) setCarrinho(JSON.parse(json));
    };
    carregarCarrinho();
  }, []);

  const finalizarCompra = async () => {
    const json = await AsyncStorage.getItem('pedidos');
    const pedidosAtuais = json ? JSON.parse(json) : [];
    const novosPedidos = pedidosAtuais.concat(carrinho);
    await AsyncStorage.setItem('pedidos', JSON.stringify(novosPedidos));
    await AsyncStorage.removeItem('carrinho');
    Alert.alert('Compra Finalizada!');
    navigation.navigate('MeusPedidos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      {carrinho.length === 0 ? (
        <Text>Nenhum item no carrinho.</Text>
      ) : (
        <FlatList
          data={carrinho}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.nome} - R$ {item.preco}</Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={finalizarCompra}>
        <Text style={styles.buttonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const carregarPedidos = async () => {
      const json = await AsyncStorage.getItem('pedidos');
      if (json) setPedidos(JSON.parse(json));
    };
    carregarPedidos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>
      {pedidos.length === 0 ? (
        <Text>Você ainda não fez pedidos.</Text>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.nome} - R$ {item.preco}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const Perfil = () => {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada para acessar localização');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocal(`Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`);
    })();
  }, []);

  const salvarNome = async () => {
    await SecureStore.setItemAsync('usuario_nome', nome);
    Alert.alert('Nome salvo com segurança!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <TextInput placeholder="Digite seu nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={salvarNome}>
        <Text style={styles.buttonText}>Salvar Nome</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20 }}>Localização Atual:</Text>
      <Text>{local}</Text>
    </View>
  );
};

export default function App() {
  const [EstaLogado, setLogado] = useState(false);

  return (
    <NavigationContainer>
      {EstaLogado ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Início" component={Home} />
          <Drawer.Screen name="Carrinho" component={Carrinho} />
          <Drawer.Screen name="Meus Pedidos" component={MeusPedidos} />
          <Drawer.Screen name="Perfil" component={Perfil} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Login">
            {(props) => <Login {...props} funcLogar={setLogado} />}
          </Drawer.Screen>
          <Drawer.Screen name="Registrar" component={Registrar} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 24,
    fontWeight: 'rebono',
    marginBottom: 200,
    textAlign: 'middle'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'black',
    fontWeight: 'rebono'
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  cardTitle: {
    fontWeight: 'rebono',
    fontSize: 20
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10
  }
});
