import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

// Helper para gerar o hash da senha
async function hashPassword(password) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}

export async function saveUser(email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    await AsyncStorage.setItem('usuario_email', email);
    await AsyncStorage.setItem('usuario_senha_hash', hashedPassword);
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw new Error('Falha ao salvar credenciais');
  }
}

export async function checkLogin(email, password) {
  try {
    const storedEmail = await AsyncStorage.getItem('usuario_email');
    const storedHash = await AsyncStorage.getItem('usuario_senha_hash');

    if (!storedEmail || !storedHash) return false;

    const inputHash = await hashPassword(password);
    return email === storedEmail && inputHash === storedHash;
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    return false;
  }
}

export async function saveUserName(name) {
  try {
    await AsyncStorage.setItem('usuario_nome', name);
  } catch (error) {
    console.error('Erro ao salvar nome:', error);
    throw new Error('Falha ao salvar nome do usuário');
  }
}

export async function getUserName() {
  try {
    return await AsyncStorage.getItem('usuario_nome');
  } catch (error) {
    console.error('Erro ao obter nome:', error);
    return null;
  }
}

export async function clearUser() {
  try {
    await AsyncStorage.multiRemove([
      'usuario_email',
      'usuario_senha_hash',
      'usuario_nome',
    ]);
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw new Error('Falha ao fazer logout');
  }
}
