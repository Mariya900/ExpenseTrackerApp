import React, {useState, useCallback} from 'react';
import {SafeAreaView, View, Text, FlatList, Alert} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import styles from './styles';
import CustomButton from '../../components/CustomButton';
import {useFocusEffect} from '@react-navigation/native';

const mmkv = new MMKV();

const ListTransactionsScreen = () => {
  const [transactions, setTransactions] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const userId = mmkv.getString('userId');
      if (!userId) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      const storedTransactions = mmkv.getString(userId);
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    }, []),
  );

  const deleteTransaction = (index: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this transaction?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedTransactions = transactions.filter(
              (_, i) => i !== index,
            );
            const userId = mmkv.getString('userId');
            if (userId) {
              mmkv.set(userId, JSON.stringify(updatedTransactions));
            }
            setTransactions(updatedTransactions);
          },
        },
      ],
    );
  };
  const renderTransaction = ({item, index}) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionAmount}>₹{item.amount}</Text>
        <Text style={styles.transactionAmount}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <CustomButton title="Delete" onPress={() => deleteTransaction(index)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.heading}>Transaction List</Text>
      {transactions.length === 0 ? (
        <Text style={styles.deleteText}>No transactions available</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderTransaction}
        />
      )}
    </SafeAreaView>
  );
};

export default ListTransactionsScreen;
