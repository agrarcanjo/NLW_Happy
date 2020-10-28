import React from 'react';

import {useFonts ,Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito';

import { StatusBar } from 'react-native';

import Routes from './src/routes';

{/** Componentes não herdão estilização */}
export default function App() {

  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold, 
    Nunito_700Bold,
    Nunito_600SemiBold
  }); 
  
  if(!fontsLoaded){                          // Caso as fontes ainda não estejam carregadas, tela em branco 
    return null;
  } else {
    return (
      <>
        <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
        <Routes />
      </>
    );
  }
}