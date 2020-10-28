import multer from "multer";
import path from 'path';

export default {
    storage: multer.diskStorage({                                                       /** salvar as imagens no disco */
        destination: path.join(__dirname, '..', '..', 'uploads'),                       /** caminhos relativos - diretório atual e navegar */
        filename: (request, file,cb ) =>{                                               /** conforme documentação */
            const fileName = `${Date.now()}-${file.originalname}`;                      /** Data Atual + nome do arquivo */
            
            cb(null, fileName);                                                         /** recebe ERRO e PARAM */
        },
    })
};