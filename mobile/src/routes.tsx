import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import  { createStackNavigator } from '@react-navigation/stack';

import OrphanageDetails from './pages/OrphanageDetails';
import OrphanagesMap from './pages/OrphanagesMap';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import Header from './components/Header';

const { Screen, Navigator} = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>                                                           { /** container por volta das rotas */}
            <Navigator 
            screenOptions={{ 
                headerShown: false, 
                cardStyle: { backgroundColor: "#F2F3F5"}
            }}>                          {/** cada uma recebe um navigation onde pode-se estilizar como retirar o header */}
            
            <Screen 
                name="OrphanagesMap" 
                component={OrphanagesMap} 
            />
            <Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails}
                    options={{ 
                        headerShown: true,
                        header: (props) => <Header 
                                        title="Orfanato"
                                        showCancel={false} {... props}
                                      /> // também passa as props para o filho
                    }}
             />
            
            <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{ 
                        headerShown: true,
                        header: (props) => <Header title="Selecione no mapa" {... props} />
                    }}
            />
            
            <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{ 
                        headerShown: true,
                        header: (props) => <Header title="Informe os dados" {... props} />
                    }}
            />
        </Navigator>
    </NavigationContainer>
    );
}