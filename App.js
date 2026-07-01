import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando as nossas 3 telas (que vamos criar na pasta src/screens)
import TelaHome from './src/screens/TelaHome';
import TelaPokedex from './src/screens/TelaPokedex';
import TelaFavoritos from './src/screens/TelaFavoritos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* initialRouteName define qual tela abre primeiro */}
      <Stack.Navigator initialRouteName="Home">
        
        {/* Tela 1: Boas-vindas */}
        <Stack.Screen 
          name="Home" 
          component={TelaHome} 
          options={{ title: 'Início', headerShown: false }} 
        />
        
        {/* Tela 2: A Pokédex que já construímos */}
        <Stack.Screen 
          name="Pokedex" 
          component={TelaPokedex} 
          options={{ title: 'Pokédex Nacional' }} 
        />
        
        {/* Tela 3: O CRUD do Firebase */}
        <Stack.Screen 
          name="Favoritos" 
          component={TelaFavoritos} 
          options={{ title: 'Meus Favoritos' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}