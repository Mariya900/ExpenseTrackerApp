import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

interface CustomTextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  errorMessage?: string;
  keyBoardType?: any;
  onPress?: () => void;
  editable?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  errorMessage,
  keyBoardType,
  onPress,
  editable,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyBoardType}
        onPress={onPress}
        editable={editable}
      />
      <View style={styles.errorTextContainer}>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    textAlign: 'right',
    color: 'red',
  },
  errorTextContainer: {
    paddingHorizontal: 15,
  },
});
