import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Checkout({ route, navigation }) {
  const { carrinho = [], limparCarrinho = () => {} } = route?.params || {};
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [carregando, setCarregando] = useState(false);
  const [dadosCartao, setDadosCartao] = useState(null);
  const [etapa, setEtapa] = useState('selecao'); // 'selecao' ou 'pagamento'

  useEffect(() => {
    setItensCarrinho(carrinho);
  }, [carrinho]);

  const calcularTotal = () => {
    return itensCarrinho
      .reduce((total, item) => total + item.preco * item.quantidade, 0)
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const salvarPedidoNoHistorico = async () => {
    try {
      const pedidosJSON = await AsyncStorage.getItem('pedidos');
      const pedidos = pedidosJSON ? JSON.parse(pedidosJSON) : [];

      const novoPedido = {
        id: Date.now(),
        data: new Date().toLocaleString(),
        itens: itensCarrinho,
        total: calcularTotal(),
        metodoPagamento,
        status: 'finalizado',
      };

      await AsyncStorage.setItem('pedidos', JSON.stringify([...pedidos, novoPedido]));
    } catch (error) {
      console.error('Erro ao salvar pedido no histórico:', error);
      throw error;
    }
  };

  const processarPagamento = async () => {
    setCarregando(true);
    
    try {
      // Simulação de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await salvarPedidoNoHistorico();
      await limparCarrinho();
      
      Alert.alert(
        'Compra finalizada', 
        `Seu pagamento via ${getNomeMetodoPagamento()} foi confirmado.`,
        [{ text: 'OK', onPress: () => navigation.navigate('Início') }]
      );
      
      setItensCarrinho([]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const getNomeMetodoPagamento = () => {
    switch(metodoPagamento) {
      case 'pix': return 'PIX';
      case 'cartao': return 'Cartão de Crédito';
      case 'boleto': return 'Boleto Bancário';
      default: return '';
    }
  };

  const renderItemCarrinho = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemNome}>{item.nome}</Text>
        <Text style={styles.itemPreco}>
          {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
      <View style={styles.itemQuantidadeContainer}>
        <Text style={styles.itemQuantidade}>x{item.quantidade}</Text>
        <Text style={styles.itemSubtotal}>
          {(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
    </View>
  );

  const renderSelecaoPagamento = () => (
    <View style={styles.secaoPagamento}>
      <Text style={styles.tituloSecao}>Selecione o método de pagamento</Text>
      
      <TouchableOpacity 
        style={[styles.botaoMetodo, metodoPagamento === 'pix' && styles.botaoMetodoSelecionado]}
        onPress={() => setMetodoPagamento('pix')}
      >
        <Icon name="qr-code" size={24} color={metodoPagamento === 'pix' ? '#6200ee' : '#666'} />
        <Text style={styles.textoMetodo}>PIX</Text>
        {metodoPagamento === 'pix' && <Icon name="check-circle" size={20} color="#6200ee" />}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.botaoMetodo, metodoPagamento === 'cartao' && styles.botaoMetodoSelecionado]}
        onPress={() => {
          setMetodoPagamento('cartao');
          setEtapa('pagamento');
        }}
      >
        <Icon name="credit-card" size={24} color={metodoPagamento === 'cartao' ? '#6200ee' : '#666'} />
        <Text style={styles.textoMetodo}>Cartão de Crédito</Text>
        {metodoPagamento === 'cartao' && <Icon name="check-circle" size={20} color="#6200ee" />}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.botaoMetodo, metodoPagamento === 'boleto' && styles.botaoMetodoSelecionado]}
        onPress={() => setMetodoPagamento('boleto')}
      >
        <Icon name="receipt" size={24} color={metodoPagamento === 'boleto' ? '#6200ee' : '#666'} />
        <Text style={styles.textoMetodo}>Boleto Bancário</Text>
        {metodoPagamento === 'boleto' && <Icon name="check-circle" size={20} color="#6200ee" />}
      </TouchableOpacity>
    </View>
  );

  const renderPagamentoCartao = () => (
    <View style={styles.secaoCartao}>
      <TouchableOpacity 
        style={styles.botaoVoltar}
        onPress={() => setEtapa('selecao')}
      >
        <Icon name="arrow-back" size={24} color="#6200ee" />
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>
      
      <Text style={styles.tituloSecao}>Informações do Cartão</Text>
      
      <CreditCardInput 
        onChange={setDadosCartao}
        requiresName
        requiresCVC
        cardScale={1.0}
        labelStyle={styles.rotuloCartao}
        inputStyle={styles.inputCartao}
        validColor="#000"
        invalidColor="red"
        placeholderColor="#999"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Finalizar Compra</Text>
      
      <FlatList
        data={itensCarrinho}
        renderItem={renderItemCarrinho}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.resumoContainer}>
            <Text style={styles.resumoTexto}>Resumo do Pedido</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.totalContainer}>
            <Text style={styles.totalTexto}>Total: {calcularTotal()}</Text>
          </View>
        }
        contentContainerStyle={styles.listaConteudo}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Seu carrinho está vazio</Text>
        }
      />
      
      {etapa === 'selecao' ? renderSelecaoPagamento() : renderPagamentoCartao()}
      
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botaoCancelar, itensCarrinho.length === 0 && styles.botaoDesabilitado]}
          onPress={cancelarCompra}
          disabled={itensCarrinho.length === 0 || carregando}
        >
          <Text style={styles.textoBotaoCancelar}>Cancelar Compra</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.botaoConfirmar, 
            (itensCarrinho.length === 0 || 
             (metodoPagamento === 'cartao' && !dadosCartao?.valid)) && styles.botaoDesabilitado
          ]}
          onPress={processarPagamento}
          disabled={
            itensCarrinho.length === 0 || 
            carregando || 
            (metodoPagamento === 'cartao' && !dadosCartao?.valid)
          }
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotaoConfirmar}>
              Confirmar Pagamento ({getNomeMetodoPagamento()})
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listaConteudo: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemPreco: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemQuantidadeContainer: {
    alignItems: 'flex-end',
  },
  itemQuantidade: {
    fontSize: 14,
    color: '#666',
  },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 4,
  },
  resumoContainer: {
    marginBottom: 16,
  },
  resumoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
    marginTop: 8,
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  listaVazia: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
  secaoPagamento: {
    marginTop: 20,
    marginBottom: 16,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  botaoMetodo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  botaoMetodoSelecionado: {
    borderWidth: 2,
    borderColor: '#6200ee',
    backgroundColor: '#f3e5ff',
  },
  textoMetodo: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    color: '#333',
  },
  secaoCartao: {
    marginTop: 20,
    marginBottom: 16,
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textoVoltar: {
    fontSize: 16,
    color: '#6200ee',
    marginLeft: 8,
  },
  rotuloCartao: {
    fontSize: 14,
    color: '#666',
  },
  inputCartao: {
    fontSize: 16,
    color: '#333',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d32f2f',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  textoBotaoCancelar: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoConfirmar: {
    flex: 2,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotaoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});