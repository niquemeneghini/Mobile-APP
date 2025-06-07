import { StyleSheet, Dimensions, Platform } from 'react-native';

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
    textAlign: 'center',
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
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
  card: {
    flex: 0.48,
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
    }),
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
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
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

loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

});
