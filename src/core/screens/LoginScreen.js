import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { checkLogin, getUserName } from '../../core/services/authService';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ setIsLoggedIn, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('E-mail inválido');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }

    setIsFormValid(valid);
    return valid;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const valid = await checkLogin(email, password);

      if (!valid) {
        Toast.show({
          type: 'error',
          text1: 'Login falhou',
          text2: 'E-mail ou senha incorretos',
          position: 'top',
          visibilityTime: 3000,
        });
        return;
      }

      const userName = await getUserName();
      setIsLoggedIn(true);

      Toast.show({
        type: 'success',
        text1: 'Bem-vindo!',
        text2: `Olá ${userName || ''}`,
        position: 'top',
        visibilityTime: 2000,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { userName } }],
      });
    } catch (error) {
      console.error('Erro no login:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha na conexão. Tente novamente.',
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
      blurRadius={2}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.overlay}>
            <View style={styles.logoContainer}>
              <Icon name="account-circle" size={80} color="#fff" />
              <Text style={styles.title}>Faça seu login</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, emailError && styles.inputError]}
                  placeholder="E-mail"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#aaa"
                  selectionColor="#6200ee"
                />
                {email && (
                  <TouchableOpacity
                    style={styles.clearIcon}
                    onPress={() => setEmail('')}
                  >
                    <Icon name="close" size={20} color="#999" />
                  </TouchableOpacity>
                )}
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, passwordError && styles.inputError]}
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onSubmitEditing={handleLogin}
                  placeholderTextColor="#aaa"
                  selectionColor="#6200ee"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  (!isFormValid || isLoading) && styles.buttonDisabled,
                ]}
                onPress={handleLogin}
                disabled={!isFormValid || isLoading}
                activeOpacity={0.7}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
                <Text style={[styles.linkText, styles.registerText]}>
                  Cadastre-se
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <Toast />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingRight: 40,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
  clearIcon: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  linkText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: '500',
  },
  registerText: {
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default LoginScreen;