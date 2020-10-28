import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet"; 

import '../styles/pages/orphanage.css';
import Sidebar from "../componentes/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useParams } from "react-router-dom";


interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  about: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array< {
    id: number;
    url: string;
  } >;
}

{/** parametros vindos de requisições são sempre string */}
interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  {/** variáveis de armazenamento */}
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

   {/** hook para realizar um comportamento toda vez que a variável é invocada  = para orfanatos cadastrados*/}
  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response => {
          setOrphanage(response.data)
      })
  } , [params.id]);

  {/** colocar spinner ou outras funções para mostra aminação até completar carregamento da tela / linkedin rocket */}
  if(!orphanage){
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">

      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map( (image, index) => {
              return (
                <button 
                key={image.id}  
                className={ activeImageIndex === index ? 'ative' : ''} 
                type="button"  
                onClick={() => {                                              // dispara uma função pois uma chama direta é executada imediatamente ao click
                  setActiveImageIndex(index);
                }}>
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
            
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.description}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.about}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                {orphanage.open_on_weekends ? (
                   <div className="open-on-weekends">
                     <FiInfo size={32} color="#39CCB3" />
                     Atendemos <br/>
                     fim de semana
                   </div>
                ) : (
                  <div className="open-on-weekends">
                     <FiInfo size={32} color="#FF6690" />
                     Não Atendemos <br/>
                     fim de semana
                  </div>
                )}
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}