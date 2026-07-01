import * as Animatable from 'react-native-animatable';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CardPokemon({ data, onEdit, onDelete }) {
  return (

    <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
      
      <View style={styles.infoArea}>
        <Text style={styles.textoForte}>Nome: {data.nome.toUpperCase()}</Text>
        <Text>Apelido: {data.apelido}</Text>
      </View>
      
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btnEditar} onPress={onEdit}>
          <Text style={styles.txtBtn}>✏️ Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnDeletar} onPress={onDelete}>
          <Text style={styles.txtBtn}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
      
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoArea: {
    marginBottom: 10,
  },
  textoForte: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnEditar: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  btnDeletar: {
    backgroundColor: '#c0392b',
    padding: 10,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  txtBtn: {
    color: '#fff',
    fontWeight: 'bold',
  },
});