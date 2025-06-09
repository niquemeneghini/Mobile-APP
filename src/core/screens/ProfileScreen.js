import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Certifique-se que o ImagePicker está importado
import styles from '../styles/styles';
import { getUserName, getUserEmail, getUserCreatedAt, clearUser } from '../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({
    name: 'Carregando...',
    email: 'carregando@email.com',
    joinDate: 'Carregando...',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg' // Apenas URL aqui
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userName = await getUserName();
        const userEmail = await getUserEmail();
        const userCreatedAt = await getUserCreatedAt();

        setUserData({
          name: userName || 'Usuário',
          email: userEmail || 'usuario@email.com',
          joinDate: userCreatedAt || new Date().toLocaleDateString('pt-BR'),
          photo: userData.photo,
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

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para alterar a foto de perfil.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      setUserData(prev => ({
        ...prev,
        photo: uri,
      }));
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userName = await getUserName();
        setUserData(prev => ({
          ...prev,
          name: userName || 'Usuário',
          email: 'usuario@email.com',
          joinDate: new Date().toLocaleDateString('pt-BR')
        }));
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

const handleLogout = () => {
  Alert.alert(
    'Sair',
    'Tem certeza que deseja sair da sua conta?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: async () => {
          try {
            await clearUser(); // limpa os dados do usuário
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            );
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível sair da conta.');
          }
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
        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={escolherImagem}>
            <Image source={{ uri: userData.photo }} style={styles.profileImage} />
            <Icon
              name="photo-camera"
              size={24}
              color="#fff"
              style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: '#0009',
                borderRadius: 12,
                padding: 4,
              }}
            />
          </TouchableOpacity>
        </View>

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

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="edit" size={24} color="#666" />
          <Text style={styles.menuText}>Editar Perfil</Text>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChangePassword')}>
          <Icon name="lock" size={24} color="#666" />
          <Text style={styles.menuText}>Alterar Senha</Text>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Preferences')}>
          <Icon name="settings" size={24} color="#666" />
          <Text style={styles.menuText}>Preferências</Text>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
