
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes'
import Buttons from '../components/Buttons/Button';
import ProductoCard from '../components/Productos/ProductoCard';
import ModalCompra from '../components/Modales/ModalCompra';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono

export default function Productos({ navigation }) {

  const ip = Constantes.IP;
  const [dataProductos, setDataProductos] = useState([])
  const [cantidad, setCantidad] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const [idProductoModal, setIdProductoModal] = useState('')
  const [nombreProductoModal, setNombreProductoModal] = useState('')

  /*
  Ahorita no se ocupa este codigo
  const volverLogin = async () => {
    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert("Sesion Finalizada")
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
    }
  }*/

  const volverInicio = async () => {

    navigation.navigate('Home');

  };

  const handleCompra = (nombre, id) => {
    setModalVisible(true)
    setIdProductoModal(id)
    setNombreProductoModal(nombre)
  }

  const getCatalogo = async () => {
    try {

      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch(`${ip}/lacteos_queso/api/services/public/catalogo.php?action=readAll`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.status) {
        setDataProductos(data.dataset)
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert('Error catalogo', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al listar los catalogos');
    }
  }

  //Uso del React Hook UseEffect para que cada vez que se cargue la vista por primera vez
  //se ejecute la funcion getCategorias
  useEffect(() => {
    getCatalogo();
  }, []);

  const irCarrito = () => {
    navigation.navigate('Carrito')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogo de Productos</Text>

      <Buttons
        textoBoton='Volver a Home'
        accionBoton={volverInicio}
      />

      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreProductoModal={nombreProductoModal}
        idProductoModal={idProductoModal}
        cantidad={cantidad}
        setCantidad={setCantidad}
      />

      <View>
        <Text style={styles.subtitle}>
          Selecciona un catalogo
        </Text>


      </View>

      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={dataProductos}
          keyExtractor={(item) => item.id_catalogo}
          renderItem={({ item }) => ( // Util izamos destructuración para obtener directamente el item

            <ProductoCard ip={ip}
              idCatalogo={item.id_catalogo}
              nombreCatalogo={item.nombre_catalogo}
              CantidadCatalogo={item.cantidad}
              PrecioProducto={item.precio_producto}
              accionBotonProducto={() => handleCompra(item.nombre_catalogo, item.id_catalogo)}
            />
          )}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={irCarrito}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.cartButtonText}>Ir al carrito</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#DCFFEA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: '#DCFFEA',
    borderRadius: 8,
    padding: 16,
    marginVertical: 1,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '700'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginLeft: 8,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#5C3D2E',
    fontSize: 16,
    fontWeight: '600'
  },
  image: {
    width: '65%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  textDentro: {
    fontWeight: '400'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: 'black',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  cartButtonText: {
    color: '#5C3D2E',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
    marginHorizontal: 5,
    color: '#5C3D2E', // Brown color for the title
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#5C3D2E', // Color del borde
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#5C3D2E', // Color de fondo
  },
  picker: {
    color: '#5C3D2E'
  },
});