import React, {useState} from 'react';
import {Text, SafeAreaView, Alert} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../components/TextInput';
import CustomButton from '../../components/CustomButton';
import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();

const RegisterScreen = (props: any) => {
  const {navigation} = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleRegister = () => {
    let valid = true;

    if (!name) {
      setNameError('Name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!Password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (!validatePassword(Password)) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;
    const userEmailKey = `user_${email}_email`;
    const userPasswordKey = `user_${email}_password`;

    mmkv.set(userEmailKey, email); // Save the email under a unique key
    mmkv.set(userPasswordKey, Password);
    Alert.alert('Registration Successful', 'You have successfully registered!');
    setName('');
    setEmail('');
    setPassword('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.text}>Registration Screen</Text>
      <CustomTextInput
        label="Name"
        placeholder="Please Enter Your Name"
        value={name}
        onChangeText={setName}
        errorMessage={nameError}
      />
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
        value={Password}
        onChangeText={setPassword}
        secureTextEntry={true}
        errorMessage={passwordError}
      />
      <CustomButton title="REGISTER" onPress={handleRegister} />
    </SafeAreaView>
  );
};

export default RegisterScreen;
