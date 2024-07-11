import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState(null);
  const ip = Constantes.IP;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/lacteos_queso/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Sesion');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const irActualizar = () => {
    navigation.navigate('Productos');
  };

  const EditUser = () => {
    navigation.navigate('UpdateUser');
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/lacteos_queso/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.name.nombre_cliente);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/vacita-removebg-preview.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Bienvenid@ al sistema</Text>
      <Text style={styles.subtitle}>
        { /*correo ? correo : 'No hay correo para mostrar'*/}
        {nombre ? nombre : 'Nuestros Productos de la mejor calidad'}
      </Text>
      <Buttons
        textoBoton='Cerrar Sesión'
        accionBoton={handleLogout}
      />

      <Buttons
        textoBoton='Ver Catalogo'
        accionBoton={irActualizar}
      />
      <Buttons
        textoBoton='Editar Usuario'
        accionBoton={EditUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCFFEA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  button: {
    borderWidth: 2,
    borderColor: "#64C27B",
    width: 100,
    borderRadius: 10,
    backgroundColor: "#64C27B"
  },
  buttonText: {
    textAlign: 'center',
    color: "white"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: 'black', // Brown color for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
});