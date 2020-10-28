
import Leaflet from 'leaflet';

import mapMarkerImg from '../images/mapmarket.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],   // iconAnchor =  reposiciona a imagem no eixo x para alinhar o ponto no mapa 
    popupAnchor: [0, -60]
  });

export default mapIcon;
  