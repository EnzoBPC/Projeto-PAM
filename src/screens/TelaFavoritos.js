import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';

import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

import CardPokemon from '../components/CardPokemon';

export default function TelaFavoritos() {
  const [favoritos, setFavoritos] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [pokemonEditando, setPokemonEditando] = useState(null);
  const [novoApelido, setNovoApelido] = useState('');
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "favoritos"), (snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setFavoritos(lista);
    });

    return () => unsubscribe();
  }, []);

  const deletarFavorito = (id, nome) => {
    Alert.alert(
      "Excluir Favorito",
      `Tem certeza que deseja remover ${nome.toUpperCase()} da equipe?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "favoritos", id));
            } catch (error) {
              console.log("Erro ao deletar: ", error);
            }
          }
        }
      ]
    );
  };

  const abrirModalEdicao = (pokemon) => {
    setPokemonEditando(pokemon);
    setNovoApelido(pokemon.apelido);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!pokemonEditando) return;

    try {
      const docRef = doc(db, "favoritos", pokemonEditando.id);
      await updateDoc(docRef, { apelido: novoApelido });
      
      setModalVisible(false);
      setPokemonEditando(null);
    } catch (error) {
      console.log("Erro ao atualizar: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Favoritos</Text>
      <Text style={styles.subtitulo}>Sua equipe de elite</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardPokemon
            data={item}
            onEdit={() => abrirModalEdicao(item)}
            onDelete={() => deletarFavorito(item.id, item.nome)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum Pokémon favoritado ainda.</Text>
        }
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <Text style={styles.textoForte}>Dar um apelido</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Digite o novo apelido..."
              value={novoApelido}
              onChangeText={setNovoApelido}
            />

            <View style={styles.modalBtnArea}>
              <TouchableOpacity 
                style={[styles.btn, { backgroundColor: '#7f8c8d' }]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.txtBtn}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.btn, { backgroundColor: '#27ae60' }]} 
                onPress={salvarEdicao}
              >
                <Text style={styles.txtBtn}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
  },
  textoForte: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCaixa: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  modalBtnArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
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