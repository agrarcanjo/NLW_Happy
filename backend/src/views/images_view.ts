import Image from "../models/Image";                                /** cria uma View para adaptar o retorno JSON */

export default {
    render (image: Image){
        return {
            id: image.id, 
            url: `http://localhost:3333/uploads/${image.path}`,
        };
    }, 

    renderMany(images: Image[]){                                     /** recebo vários objetos array e retorno cada um deles*/
        return images.map(images => this.render(images));
    }
};