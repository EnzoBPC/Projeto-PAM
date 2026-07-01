import * as Animatable from 'react-native-animatable';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Image } from 'expo-image';
import React, { useState, useEffect } from "react";

export default function TelaPokedex() {
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState(1);
  const [busca, setBusca] = useState('');

  useEffect (() => {
    fetchPokemon(id);
  }, [id])

  const fetchPokemon = async (query) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if(!response.ok) {
        alert("Pokemon não encontrado!");
        return;
      }
      const data = await response.json();

      const poke = {
        id: data.id,
        nome: data.name,
        imagem: data.sprites.front_default,
        tipo1: data.types[0]?.type.name,
        tipo2: data.types[1]?.type.name,
      };
      setPokemon(poke);
      if(id !== data.id) {
        setId(data.id);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleSearch = () => {
    if (busca.trim() !== '') {
      fetchPokemon(busca.toLowerCase().trim());
      setBusca('');
    }
  };

  const salvarFavorito = async () => {
    if (!pokemon) return;
    
    try {
      await addDoc(collection(db, "favoritos"), {
        pokeId: pokemon.id,
        nome: pokemon.nome,
        imagem: pokemon.imagem,
        apelido: ""
      });
      alert(`${pokemon.nome.toUpperCase()} foi salvo nos favoritos!`);
    } catch (erro) {
      console.log("Erro ao salvar: ", erro);
      alert("Erro ao salvar no banco de dados.");
    }
  };

  const getIconeTipo = (tipo) => {
    switch (tipo) {
      case 'normal': return require('../../assets/tipos/normal.svg');
      case 'fire': return require('../../assets/tipos/fire.svg');
      case 'water': return require('../../assets/tipos/water.svg');
      case 'electric': return require('../../assets/tipos/electric.svg');
      case 'grass': return require('../../assets/tipos/grass.svg');
      case 'ice': return require('../../assets/tipos/ice.svg');
      case 'fighting': return require('../../assets/tipos/fighting.svg');
      case 'poison': return require('../../assets/tipos/poison.svg');
      case 'ground': return require('../../assets/tipos/ground.svg');
      case 'flying': return require('../../assets/tipos/flying.svg');
      case 'psychic': return require('../../assets/tipos/psychic.svg');
      case 'bug': return require('../../assets/tipos/bug.svg');
      case 'rock': return require('../../assets/tipos/rock.svg');
      case 'ghost': return require('../../assets/tipos/ghost.svg');
      case 'dragon': return require('../../assets/tipos/dragon.svg');
      case 'dark': return require('../../assets/tipos/dark.svg');
      case 'steel': return require('../../assets/tipos/steel.svg');
      case 'fairy': return require('../../assets/tipos/fairy.svg');
      default: return require('../../assets/logo.png'); 
    }
  };

  const getCorTipo = (tipo) => {
    const cores = {
      normal: '#A8A77A', fire: '#EE8130', water: '#6390F0',
      electric: '#F7D02C', grass: '#7AC74C', ice: '#96D9D6',
      fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65',
      flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
      rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC',
      dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD',
    };
    return cores[tipo] || '#777777'; 
  };

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text>Carregando Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.areaLogo}>
        <Image source={require("../../assets/logo.png")} style={{ width: 150, height: 50 }} contentFit="contain"/>
      </View>

      <View style={styles.areaImagem}>
        <Animatable.View animation="zoomIn" duration={600} key={pokemon.id}>
          <Image source={{uri: pokemon.imagem}} style={styles.imagemPoke} />
        </Animatable.View>
      </View>

      <View style={styles.areaBusca}>
        <TextInput
        style={styles.inputBusca}
        placeholder="Digite o nome..."
        value={busca}
        onChangeText={setBusca}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSearch}>
          <Text style={styles.txtBtn}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaDesc}>
      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: '#f1c40f', marginBottom: 15, width: 200, alignItems: 'center' }]} 
        onPress={salvarFavorito}
      >
        <Text style={[styles.txtBtn, { color: '#333' }]}>Salvar Favorito</Text>
      </TouchableOpacity>
        <View style={styles.areaNome}>
          <Text style={styles.textoForte}>Nome: </Text>
          <Text style={styles.textoValor}>{pokemon?.nome?.toUpperCase()}</Text>
        </View>

        <View style={styles.areaTipo}>
          <Text style={styles.textoForte}>Tipo: </Text>
          
          <Image 
            source={getIconeTipo(pokemon.tipo1)} 
            style={{ width: 18, height: 18, marginRight: 4, tintColor: getCorTipo(pokemon.tipo1) }} 
            contentFit="contain"
          />
          <Text style={styles.textoValor}>{pokemon?.tipo1?.toUpperCase()}</Text>

          {pokemon.tipo2 && (
            <>
              <Text style={styles.textoForte}>  |  Tipo 2: </Text>
              <Image 
                source={getIconeTipo(pokemon.tipo2)} 
                style={{ width: 18, height: 18, marginRight: 4, tintColor: getCorTipo(pokemon.tipo2) }} 
                contentFit="contain"
              />
              <Text style={styles.textoValor}>{pokemon?.tipo2?.toUpperCase()}</Text>
            </>
          )}
        </View>

        <View style={styles.areaId}>
          <Text style={styles.textoForte}>ID: </Text>
          <Text style={styles.textoValor}>{pokemon?.id}</Text>
        </View>
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.btn} onPress={() => setId(1)}>
          <Text style={styles.txtBtn}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => setId(prev => prev === 10001 ? 1025 : (prev > 1 ? prev - 1 : 1))}
        >
          <Text style={styles.txtBtn}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => setId(prev => prev === 1025 ? 10001 : prev + 1)}
        >
          <Text style={styles.txtBtn}>Next</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
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
  areaLogo: {
    flex: 1,
    margin: 50,
  },
  areaImagem: {
    flex: 1,
    margin: 10,
    backgroundColor: ""
  },
  areaBusca: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  inputBusca: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: 200,
  },
  areaDesc: {
    flex: 1,
    alignItems: "center",
  },
  areaNome: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  areaTipo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  areaId: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoForte: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textoValor: {
    fontSize: 16,
  },
  areaBtn: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 60,
  },
  btn: {
    backgroundColor: "#c25843",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  txtBtn: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagemPoke: {
    width: 240,
    height: 240,
  },
});