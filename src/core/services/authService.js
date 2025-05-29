import * as SecureStore from 'expo-secure-store';

export async function saveUser(email, password) {
  await SecureStore.setItemAsync('usuario_email', email);
  await SecureStore.setItemAsync('usuario_senha', password);
}

export async function checkLogin(email, password) {
  const storedEmail = await SecureStore.getItemAsync('usuario_email');
  const storedPassword = await SecureStore.getItemAsync('usuario_senha');
  return email === storedEmail && password === storedPassword;
}

export async function saveUserName(name) {
  await SecureStore.setItemAsync('usuario_nome', name);
}

export async function getUserName() {
  return await SecureStore.getItemAsync('usuario_nome');
}
