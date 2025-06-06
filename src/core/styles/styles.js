import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
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
    color: 'white',
    fontWeight: 'bold'
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
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10
  },
  linkButton: {
  marginTop: 15,
},
linkText: {
  color: '#3498db',
  textAlign: 'center',
},
footer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,
},
footerText: {
  color: '#555',
},
disabledButton: {
  opacity: 0.6,
},
  
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  cardTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
},
loadingContainer: {
  justifyContent: 'center',
  alignItems: 'center',
},
listContainer: {
  padding: 10,
},
columnWrapper: {
  justifyContent: 'space-between',
},
productImage: {
  width: '100%',
  height: 120,
  marginBottom: 10,
},
price: {
  fontWeight: 'bold',
  fontSize: 16,
  marginVertical: 5,
},
emptyText: {
  textAlign: 'center',
  marginTop: 20,
  fontSize: 16,
  color: '#666',
},
card: {
  flex: 0.48, // Para 2 colunas com espaçamento
  marginBottom: 15,
  padding: 10,
  borderRadius: 8,
  backgroundColor: '#fff',
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
    cartItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 15,
  marginBottom: 10,
  backgroundColor: '#fff',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
},
cartImage: {
  width: 60,
  height: 60,
  borderRadius: 4,
},
itemDetails: {
  flex: 1,
  marginLeft: 10,
},
itemName: {
  fontSize: 16,
  fontWeight: 'bold',
},
itemPrice: {
  fontSize: 14,
  color: '#666',
  marginVertical: 2,
},
quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5,
},
quantityButton: {
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: 15,
},
quantityText: {
  fontSize: 18,
  fontWeight: 'bold',
},
quantity: {
  marginHorizontal: 10,
  fontSize: 16,
},
subtotal: {
  marginTop: 5,
  fontSize: 14,
  fontWeight: 'bold',
  color: '#2ecc71',
},
removeButton: {
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
},
removeText: {
  fontSize: 24,
  color: '#e74c3c',
},
totalContainer: {
  padding: 15,
  borderTopWidth: 1,
  borderTopColor: '#eee',
},
totalText: {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'right',
  marginBottom: 10,
},
checkoutButton: {
  backgroundColor: '#2ecc71',
  padding: 15,
  borderRadius: 5,
  alignItems: 'center',
},
checkoutText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
emptyText: {
  fontSize: 18,
  color: '#666',
  marginBottom: 20,
},
continueButton: {
  backgroundColor: '#3498db',
  padding: 15,
  borderRadius: 5,
},
continueText: {
  color: '#fff',
  fontWeight: 'bold',
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
listContent: {
  paddingBottom: 20,
},
  }),
  
},
});
