import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'; 
import { Link } from 'react-router-dom';
import mapIcon from '../utils/mapIcon';

import mapMarkerImg from '../images/mapmarket.svg';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css'; 
import api from '../services/api';
import Orphanage from './Orphanage';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}


function OrphanagesMap (){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    {/** hook para orfanatos cadastrados*/}
    useEffect(() => {
        api.get('orphanages/').then(response => {
            setOrphanages(response.data)
        })
    } , [])

    return (
        <div id="page-map">

            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita</p>
                </header>

                <footer>
                    <strong>Goiânia</strong>
                    <span>Goiás</span>
                </footer>
            </aside>

            <Map 
                center={[-27.2092052, -49.6401092]}
                zoom={15}
                style={{width:'100%', height: '100%'}}
            >
                {/* padrão do leeflet para o maps */}
                {/* <TileLayer url="https://a.title.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />  

                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker 
                                key={orphanage.id}
                                icon={mapIcon}
                                position={[-27.2092052, -49.6401092]}
                            >
                                <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
                                    {orphanage.name}
                                    <Link to="/orphanages/1">
                                        <FiArrowRight size={28} color="#FFF" />
                                    </Link>
                                </Popup>

                            </Marker>
                        )
                    })
                }
            </Map>
        
            {/** cria link de encaminhamento */}
            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    );

}

export default OrphanagesMap;
