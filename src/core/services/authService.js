import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

// Função para gerar hash da senha
async function hashPassword(password) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}

// Salva um novo usuário no AsyncStorage
export async function saveUser(email, password, name) {
  try {
    const hashedPassword = await hashPassword(password);
    const usersRaw = await AsyncStorage.getItem('usuarios');
    const users = usersRaw ? JSON.parse(usersRaw) : {};

    // Verifica se já existe um usuário com este e-mail
    if (users[email]) {
      throw new Error('E-mail já registrado.');
    }

    users[email] = {
      email,
      passwordHash: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem('usuarios', JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw error;
  }
}

// Verifica login com base nos usuários salvos
export async function checkLogin(email, password) {
  try {
    const usersRaw = await AsyncStorage.getItem('usuarios');
    const users = usersRaw ? JSON.parse(usersRaw) : {};

    const user = users[email];
    if (!user) return false;

    const inputHash = await hashPassword(password);
    const isValid = user.passwordHash === inputHash;

    if (isValid) {
      // Salva o usuário atual logado
      await AsyncStorage.setItem('usuario_logado', email);
    }

    return isValid;
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    return false;
  }
}

// Retorna o nome do usuário logado
export async function getUserName() {
  try {
    const currentEmail = await AsyncStorage.getItem('usuario_logado');
    if (!currentEmail) return null;

    const usersRaw = await AsyncStorage.getItem('usuarios');
    const users = usersRaw ? JSON.parse(usersRaw) : {};

    return users[currentEmail]?.name || null;
  } catch (error) {
    console.error('Erro ao obter nome do usuário:', error);
    return null;
  }
}

// Retorna o email do usuário logado
export async function getUserEmail() {
  try {
    return await AsyncStorage.getItem('usuario_logado');
  } catch (error) {
    console.error('Erro ao obter email do usuário logado:', error);
    return null;
  }
}

// Retorna a data de criação da conta do usuário logado
export async function getUserCreatedAt() {
  try {
    const currentEmail = await AsyncStorage.getItem('usuario_logado');
    if (!currentEmail) return null;

    const usersRaw = await AsyncStorage.getItem('usuarios');
    const users = usersRaw ? JSON.parse(usersRaw) : {};

    const dateISO = users[currentEmail]?.createdAt;
    if (dateISO) {
      const date = new Date(dateISO);
      return date.toLocaleDateString('pt-BR');
    }

    return null;
  } catch (error) {
    console.error('Erro ao obter data de criação:', error);
    return null;
  }
}

// Remove o usuário atualmente logado
export async function clearUser() {
  try {
    await AsyncStorage.removeItem('usuario_logado');
  } catch (error) {
    console.error('Erro ao limpar usuário logado:', error);
    throw new Error('Falha ao fazer logout');
  }
}
