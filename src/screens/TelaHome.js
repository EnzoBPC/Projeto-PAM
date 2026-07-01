import * as Animatable from 'react-native-animatable';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TelaHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="slideInDown" duration={1000} style={styles.titulo}>
        Pokédex
      </Animatable.Text>
      
      <Animatable.Text animation="fadeIn" delay={500} style={styles.subtitulo}>
        Projeto Programação Aplicativos Moveis
      </Animatable.Text>

      <Animatable.View animation="bounceIn" delay={800}>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.navigate('Pokedex')}
        >
          <Text style={styles.txtBtn}>Explorar Pokédex</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnSecundario} 
          onPress={() => navigation.navigate('Favoritos')}
        >
          <Text style={styles.txtBtn}>Meus Favoritos</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 50,
  },
  btn: {
    backgroundColor: "#c25843", // Vermelho Pokédex
    padding: 15,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnSecundario: {
    backgroundColor: "#3b4cca", // Azul clássico
    padding: 15,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  txtBtn: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});