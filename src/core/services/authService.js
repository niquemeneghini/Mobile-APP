import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

// Helper para hash de senha
async function hashPassword(password) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}

export async function saveUser(email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    await SecureStore.setItemAsync('usuario_email', email);
    await SecureStore.setItemAsync('usuario_senha_hash', hashedPassword);
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw new Error('Falha ao salvar credenciais');
  }
}

export async function checkLogin(email, password) {
  try {
    const storedEmail = await SecureStore.getItemAsync('usuario_email');
    const storedHash = await SecureStore.getItemAsync('usuario_senha_hash');
    
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
    await SecureStore.setItemAsync('usuario_nome', name);
  } catch (error) {
    console.error('Erro ao salvar nome:', error);
    throw new Error('Falha ao salvar nome do usuário');
  }
}

export async function getUserName() {
  try {
    return await SecureStore.getItemAsync('usuario_nome');
  } catch (error) {
    console.error('Erro ao obter nome:', error);
    return null;
  }
}

export async function clearUser() {
  try {
    await SecureStore.deleteItemAsync('usuario_email');
    await SecureStore.deleteItemAsync('usuario_senha_hash');
    await SecureStore.deleteItemAsync('usuario_nome');
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw new Error('Falha ao fazer logout');
  }
  const isAvailable = await SecureStore.isAvailableAsync();
if (!isAvailable) {
  throw new Error('SecureStore não está disponível neste dispositivo');
}
}
