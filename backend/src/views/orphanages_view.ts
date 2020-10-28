import Orphanage from "../models/Orphanage";                                /** cria uma View para adaptar o retorno JSON */
import images_view from "./images_view";

export default {
    render (orphanage: Orphanage){
        return {
            id: orphanage.id, 
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: images_view.renderMany(orphanage.images),               /** passa como parametro o array de images e assim a partir da view adapta o retorno */
        };
    },

    renderMany(orphanages: Orphanage[]){                                     /** recebo vários objetos array e retorno cada um deles*/
        return orphanages.map(orphanage => this.render(orphanage));
    }
};