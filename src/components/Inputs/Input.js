
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Input({placeHolder, setValor, contra, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#000'}
    secureTextEntry={contra} 
    onChangeText={setTextChange}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'#ffffff',
    color: "#000", fontWeight:'800',
    width:250,
    borderRadius:5,
    padding: 5,
    marginVertical:10
  },

});