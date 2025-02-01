import React from 'react';
import {Alert, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MMKV} from 'react-native-mmkv';

import CustomButton from '../../components/CustomButton';
import styles from './styles';

const mmkv = new MMKV();

const HomeScreen = (props: any) => {
  const {navigation} = props;
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          onPress: () => {
            mmkv.delete('isLoggedIn');
            mmkv.delete('userId');
            navigation.replace('LoginScreen');
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.text}>Hi, {mmkv.getString('userName')} Welcome</Text>
      <View style={styles.logoutButtonContainer}>
        <CustomButton title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
