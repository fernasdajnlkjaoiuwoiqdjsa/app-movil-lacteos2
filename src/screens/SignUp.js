
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes'
import Constants from 'expo-constants';
//Import de componentes
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import InputEmail from '../components/Inputs/InputEmail';


export default function SignUp({ navigation }) {


    const ip = Constantes.IP;

    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState(0)
    const [direccion, setDireccion] = useState('')
    const [email, setCuenta] = useState('')
    const [telefono, setTelefono] = useState('')
    const [clave, setClave] = useState('')
    const [confirmarClave, setConfirmarClave] = useState('')

    const handleLogout = async () => {
        /*
                try {
                    const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
                        method: 'GET'
                    });
        
                    const data = await response.json();
        
                    if (data.status) {
                        navigation.navigate('Sesion');
                    } else {
                        console.log(data);
                        // Alert the user about the error
                        Alert.alert('Error', data.error);
                    }
                } catch (error) {
                    console.error(error, "Error desde Catch");
                    Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
                } */
        navigation.navigate('Sesion');
    };

 
    const handleCreate = async () => {
        try {
           // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('edadClinte', edad);
            formData.append('correoCliente', email);
            formData.append('direccionCliente', direccion);
            formData.append('telefonoCliente', telefono);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);

            console.log('valor de formdata', formData)


            const response = await fetch(`${ip}/lacteos_queso/api/services/public/cliente.php?action=signUpMovill`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            console.log('valor de data', data)
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el cliente');
            console.log(error, 'error')
        }
    };


return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Registrar Cliente</Text>
                <Input inputcontainerStyle={styles.inputnombre}
                    placeHolder='Nombre Cliente'
                    setValor={nombre}
                    setTextChange={setNombre}
                />
                <Input
                    placeHolder='Edad Cliente'
                    setValor={edad}
                    setTextChange={setEdad}
                />
                <InputEmail
                    placeHolder='Email Cliente'
                    setValor={email}
                    setTextChange={setCuenta} />
                <InputMultiline
                    placeHolder='Dirección Cliente'
                    setValor={setDireccion}
                    valor={direccion}
                    setTextChange={setDireccion} />

                <Input
                    placeHolder='Telefono'
                    setValor={telefono}
                    setTextChange={setTelefono}
                />
                <Input
                    placeHolder='Clave'
                    contra={true}
                    setValor={clave}
                    setTextChange={setClave} />
                <Input
                    placeHolder='Confirmar Clave'
                    contra={true}
                    setValor={confirmarClave}
                    setTextChange={setConfirmarClave} />

                <Buttons
                    textoBoton='Registrar Usuario'
                    accionBoton={handleCreate}
                />

                <Buttons
                    textoBoton='Ir al Login'
                    accionBoton={handleLogout}
                />


            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCFFEA',
        paddingTop: Constants.statusBarHeight + 5, // el 5 es para darle un pequeño margen cuando hay una camara en el centro de la pantalla
      },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        color: '#64C27B', fontWeight: '900',
        fontSize: 20
    },
    textRegistrar: {
        color: '#64C27B', fontWeight: '700',
        fontSize: 18
    },

    fecha: {
        fontWeight: '600',
        color: 'green'
    },
    fechaSeleccionar: {
        fontWeight: '700',
        color: '#322C2B',
        textDecorationLine: 'underline'
    },
    contenedorFecha: {
        backgroundColor: '#2A8C4A',
        color: "#fff", fontWeight: '800',
        width: 250,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    },
    inputnombre:{
        color: 'green'
    }
});


