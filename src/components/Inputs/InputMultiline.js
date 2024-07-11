
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';

export default function InputMultiline({placeHolder, setValor, contra, valor}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={valor}
    onChangeText={setValor}
    placeholderTextColor={'#000'}
    secureTextEntry={contra} 
    multiline={true}
    numberOfLines={4}
    />
  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'#fff',
    color: "#000", fontWeight:'800',
    width:250,
    borderRadius:5,
    padding: 5,
    marginVertical:10
  },

});