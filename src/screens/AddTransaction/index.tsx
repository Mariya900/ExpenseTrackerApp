import React, {useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {MMKV} from 'react-native-mmkv';
import CustomTextInput from '../../components/TextInput';
import CustomButton from '../../components/CustomButton';
import styles from './styles';

const mmkv = new MMKV();

const AddTransactionScreen = () => {
  const [transactionName, setTransactionName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedDate = date.toISOString().split('T')[0];
  const saveTransaction = () => {
    const userId = mmkv.getString('userId');
    if (!userId) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    if (!transactionName || !amount) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newTransaction = {
      title: transactionName,
      amount: parseFloat(amount),
      date: date.toISOString(),
    };
    const existingTransactions = mmkv.getString(userId);
    const transactions = existingTransactions
      ? JSON.parse(existingTransactions)
      : [];
    transactions.push(newTransaction);
    mmkv.set(userId, JSON.stringify(transactions)); 

    Alert.alert('Success', 'Transaction added successfully');
    setTransactionName('');
    setAmount('');
    setDate(new Date());
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomTextInput
        label="Transaction Name"
        placeholder="Enter Transaction Name"
        value={transactionName}
        onChangeText={setTransactionName}
      />
      <CustomTextInput
        label="Amount"
        placeholder="Enter Transaction Amount"
        value={amount}
        onChangeText={setAmount}
        keyBoardType="numeric"
      />
      <CustomTextInput
        label="Transaction Date"
        placeholder="Choose Date"
        value={formattedDate}
        onPress={() => setShowDatePicker(true)}
      />
      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        mode="date"
        onConfirm={selectedDate => {
          setShowDatePicker(false);
          setDate(selectedDate);
        }}
        onCancel={() => setShowDatePicker(false)}
        maximumDate={new Date()}
      />

      <CustomButton title="Save Transaction" onPress={saveTransaction} />
    </SafeAreaView>
  );
};

export default AddTransactionScreen;
