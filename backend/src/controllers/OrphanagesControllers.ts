import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanages_view from "../views/orphanages_view";


export default {

    async index(request:Request, response: Response) {
        const orphanagesRepositoriy = getRepository(Orphanage);
        const orphanages = await orphanagesRepositoriy.find({
            relations: ['images']                                                               /** força que venham o array de imagens */
        });                                                                                     /**encontra todos da entidade */
        return response.json(orphanages_view.renderMany(orphanages));
    },

    async show(request:Request, response: Response) {
        const { id } = request.params;                                                            /** pega o id dos parametros */ 
        const orphanagesRepositoriy = getRepository(Orphanage);
        const orphanage = await orphanagesRepositoriy.findOneOrFail(id, {
            relations: ['images']
        });
        return response.json(orphanages_view.render(orphanage));
    },

    async create (request:Request, response: Response) {
        
        //console.log(request.files);                                                           /**vemos o formato de como os arquivos de imagens vêm */

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;                                                                        /** cria o objeto para presistência */
    
        const orphanagesRepositoriy = getRepository(Orphanage);                                  /** constroi a entidade repositório do tipo do objeto */
    
        const requestImages = request.files as Express.Multer.File[];                            /** instrui que é um array de arquivos do multer */
        const images = requestImages.map(image => {                                             /** percorre as imagens e salva o caminho/nome  delas */
            return {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
        };

        const schema = Yup.object().shape({                                                     /** Validador de objeto */
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required('Latitude obrigatória'),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            opening_hours: Yup.string().required(),
            images: Yup.array(                                                                   /** um array de objetos */
                Yup.object().shape({                                                             /**informa o tipo do objeto/valicação */
                    path: Yup.string().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        }); 

        const orphanage = orphanagesRepositoriy.create(data);
    
        await orphanagesRepositoriy.save(orphanage);                                             /** salva em método assincrono */                  
    
        return response.status(201).json(orphanage);
    }
}