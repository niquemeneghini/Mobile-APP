import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flex: 1,
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
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
    }),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
    color: '#28a745',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  listContainer: {
    paddingBottom: 20,
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
  itemDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#444',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: '#ff6666',
    borderRadius: 5,
    padding: 6,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtotal: {
    marginTop: 6,
    fontWeight: '500',
    color: '#333',
  },
  profileContainer: {
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#777',
  },
  profileSection: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentContainer: {
  flex: 1,
  backgroundColor: '#fff',
  padding: 20,
},
paymentTitle: {
  fontSize: 26,
  fontWeight: '700',
  marginBottom: 20,
  color: '#333',
  textAlign: 'center',
},
productRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
productImage: {
  width: 60,
  height: 60,
  borderRadius: 10,
  marginRight: 15,
},
productInfo: {
  flex: 1,
},
productName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#222',
},
productPrice: {
  fontSize: 14,
  color: '#555',
  marginTop: 4,
},
quantityControls: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
},
quantityButton: {
  backgroundColor: '#28a745',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 6,
},
quantityText: {
  fontSize: 18,
  fontWeight: '700',
  marginHorizontal: 12,
  color: '#333',
},
totalSection: {
  paddingVertical: 15,
  borderTopWidth: 1,
  borderTopColor: '#ddd',
},
totalText: {
  fontSize: 20,
  fontWeight: '700',
  color: '#000',
  textAlign: 'right',
},
checkoutButton: {
  backgroundColor: '#28a745',
  paddingVertical: 14,
  borderRadius: 8,
  marginTop: 20,
  alignItems: 'center',
},
checkoutText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
},
// Adicione isso ao seu StyleSheet.create({ ... })
registerContainer: {
  flex: 1,
  padding: 25,
  backgroundColor: '#f8f9fa',
},
registerTitle: {
  fontSize: 26,
  fontWeight: '700',
  marginBottom: 30,
  color: '#2c3e50',
  textAlign: 'center',
},
inputError: {
  borderColor: '#e74c3c',
},
errorText: {
  color: '#e74c3c',
  fontSize: 14,
  marginTop: -10,
  marginBottom: 12,
  paddingLeft: 10,
},
passwordHint: {
  fontSize: 12,
  color: '#7f8c8d',
  marginTop: -10,
  marginBottom: 15,
  paddingLeft: 10,
},
registerButton: {
  backgroundColor: '#2ecc71',
  padding: 15,
  borderRadius: 8,
  marginTop: 20,
  alignItems: 'center',
},
disabledButton: {
  backgroundColor: '#95a5a6',
},
loginLinkContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,
},
loginLinkText: {
  color: '#7f8c8d',
},
loginLink: {
  color: '#3498db',
  marginLeft: 5,
  fontWeight: '600',
},

});
