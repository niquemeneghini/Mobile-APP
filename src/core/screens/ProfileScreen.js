import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { getUserName, clearUser } from '../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({
    name: 'Carregando...',
    email: 'user@example.com',
    joinDate: '01/01/2023',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userName = await getUserName();
        // Simulando dados adicionais - em uma app real viriam de uma API
        setUserData({
          ...userData,
          name: userName || 'Usuário',
          email: 'usuario@email.com', // Substitua por dados reais
          joinDate: new Date().toLocaleDateString('pt-BR')
        });
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível carregar os dados do perfil',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => {
            await clearUser();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: userData.photo }} 
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileEmail}>{userData.email}</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Informações da Conta</Text>
        
        <View style={styles.infoItem}>
          <Icon name="person" size={24} color="#666" />
          <Text style={styles.infoText}>Nome: {userData.name}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="email" size={24} color="#666" />
          <Text style={styles.infoText}>E-mail: {userData.email}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="event" size={24} color="#666" />
          <Text style={styles.infoText}>Membro desde: {userData.joinDate}</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Icon name="edit" size={24} color="#666" />
          <Text style={styles.menuText}>Editar Perfil</Text>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Icon name="lock" size={24} color="#666" />
          <Text style={styles.menuText}>Alterar Senha</Text>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Preferences')}
        >
          <Icon name="settings" size={24} color="#666" />
          <Text style={styles.menuText}>Preferências</Text>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}