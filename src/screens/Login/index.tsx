import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View, Alert} from 'react-native';
import {MMKV} from 'react-native-mmkv';

import CustomTextInput from '../../components/TextInput';
import styles from './styles';
import CustomButton from '../../components/CustomButton';

const mmkv = new MMKV();

const LoginScreen = (props: any) => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let valid = true;
    const userEmailKey = `user_${email}_email`;
    const userPasswordKey = `user_${email}_password`;

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    const storedEmail = mmkv.getString(userEmailKey);
    const storedPassword = mmkv.getString(userPasswordKey);

    if (email === storedEmail && password === storedPassword) {
      mmkv.set('isLoggedIn', true);
      mmkv.set('userId', email); // Save the current user's email for session
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.text}>Expense Tracker</Text>
      <View style={styles.loginContainer}>
        <CustomTextInput
          label="Email"
          placeholder="Please Enter Your Email"
          value={email}
          onChangeText={setEmail}
          errorMessage={emailError}
        />
        <CustomTextInput
          label="Password"
          placeholder="Please Enter Your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          errorMessage={passwordError}
        />
        <CustomButton title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.qustText}>Did Not Register?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerText}> Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
