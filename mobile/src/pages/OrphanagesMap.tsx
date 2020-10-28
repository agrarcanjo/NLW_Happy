import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-market.png';

import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}


export default function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    const navigation = useNavigation();

    useFocusEffect(() => {  //ação que sempre é disparada quando o usuário sai da tela e volta
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      })
    });

    function handleNavigateToOrphanageDetails(id:number){
        navigation.navigate('OrphanageDetails', {id});
    }

    function handleNavigateToCreateOrphanage(){
      navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView 
            provider={PROVIDER_GOOGLE} // Quem vai prover o mapa
            style={styles.map}
            initialRegion={{
                latitude: -16.7837745,
                longitude: -49.2915149,
                latitudeDelta: 0.003,
                longitudeDelta: 0.000,
            }}
            > 
            
              {orphanages.map(orphanage => {
                return (
                  <Marker             // marca o icone no maps
                    key={orphanage.id}
                    icon={mapMarker}
                    calloutAnchor={{ // para posicionar a tela popup mais a direta
                        x: 2.7,
                        y: 0.8,
                    }}
                    coordinate={{
                      latitude: orphanage.latitude,
                      longitude: orphanage.longitude,
                    }}
                  >
                    {/** cria uma tela ao clicar em um componente */}
                    <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}> {/** equivale a tooltip={true}  - passar uma função como parametro*/}
                    <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{orphanage.name}</Text>
                    </View>
                    </Callout>
        
                  </Marker>
                )
              })}
            </MapView>
    
            {/** tela footer */}
            <View style={styles.footer}>
            <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados </Text>
            {/** botão que fica opaco ao ser clicado  - TouchableOpacity */}
            <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}> 
                <Feather name="plus" size={20} color="#FFF" />
            </RectButton>
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({ 
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16, // sobe o container horizontalmente
      backgroundColor: 'rgba(255,255,255, 0.0)', // deixa a cor de fundo bem transparente
      borderRadius: 16, 
      justifyContent: 'center',
    },
  
    calloutText: {
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: "#FFF",
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,  //cria uma sombra 
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
  
    },
  
  });
  
  