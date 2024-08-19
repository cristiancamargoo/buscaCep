import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import api from './api';

function BuscarCepScreen({ navigation }) {
  const [cep, setCep] = useState("");

  async function buscarCep() {
    if (cep.trim() === "") {
      Alert.alert("CEP inválido", "Por favor, insira um CEP válido.");
      setCep("");
      return;
    }

    try {
      const response = await api.get(`/${cep}/json/`);
      const dadosCep = {
        cep: response.data.cep || "",
        logradouro: response.data.logradouro || "",
        bairro: response.data.bairro || "",
        localidade: response.data.localidade || "",
        uf: response.data.uf || "",
        ibge: response.data.ibge || "",
        complemento: response.data.complemento || "",
        ddd: response.data.ddd || "",
      };
      navigation.navigate('DetalhesCep', { dadosCep });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
      console.error("Error: " + error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de CEP</Text>
      <TextInput 
        style={styles.input} 
        value={cep} 
        onChangeText={setCep} 
        placeholder="Digite o CEP"
        keyboardType="numeric"
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={styles.button} onPress={buscarCep}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetalhesCepScreen({ route }) {
  const { dadosCep } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>Detalhes do CEP</Text>

      <View style={styles.detailItem}>
        <Text style={styles.label}>CEP:</Text>
        <Text style={styles.value}>{dadosCep.cep}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Logradouro:</Text>
        <Text style={styles.value}>{dadosCep.logradouro}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Complemento:</Text>
        <Text style={styles.value}>{dadosCep.complemento}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Bairro:</Text>
        <Text style={styles.value}>{dadosCep.bairro}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Localidade:</Text>
        <Text style={styles.value}>{dadosCep.localidade}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>UF:</Text>
        <Text style={styles.value}>{dadosCep.uf}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>IBGE:</Text>
        <Text style={styles.value}>{dadosCep.ibge}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>DDD:</Text>
        <Text style={styles.value}>{dadosCep.ddd}</Text>
      </View>
    </ScrollView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BuscarCep">
        <Stack.Screen name="BuscarCep" component={BuscarCepScreen} options={{ title: 'Buscar CEP' }} />
        <Stack.Screen name="DetalhesCep" component={DetalhesCepScreen} options={{ title: 'Detalhes do CEP' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    color: '#333',
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '80%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007BFF',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '90%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 10, // Ajuste para aproximar o label do valor
    flex: 0.3, // Ajuste para dar mais espaço ao valor
  },
  value: {
    fontSize: 16,
    color: '#555',
    textAlign: 'right',
    flex: 0.7, // Ajuste para dar mais espaço ao valor
  },
});
