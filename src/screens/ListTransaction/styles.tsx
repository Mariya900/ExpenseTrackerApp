import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    color: 'Black',
    fontSize: 16,
    fontWeight: '700',
  },
  logoutButtonContainer: {
    flex: 1,
    // justifyContent:"",
    alignItems: 'flex-end',
  },
  transactionItem: {
    flex: 1,
    backgroundColor: 'white',
  },
  transactionTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  transactionAmount: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  transactionDate: {
    fontSize: 12,
    color: 'blue',
  },
  deleteText: {
    fontSize: 12,
    color: 'Black',
  },
  heading: {
    fontSize: 18,
    color: 'blak',
    textAlign:"center",
  },
});

export default styles;
