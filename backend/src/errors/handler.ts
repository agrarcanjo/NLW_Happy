import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationErrors {                                                                    /** cria uma interface para indicar o formado tipo json */
    [key: string]: string[];                                                                    /** indica formato json */
}

const errorHandler : ErrorRequestHandler = (error, request, response, next) => {                /** função que retorna o erro, a requisição e resposta */
    if(error instanceof ValidationError) {
        let errors: ValidationErrors = {};                                                      /** uma variável com a interface de como os erros devem ser retornados para o usuário */

        error.inner.forEach(err => {                                                            /** error.inner é o formato de como o erro é estruturado */
            errors[err.path] = err.errors;                                                      /** percorre o array de erros para buscar a descrição do erro */        
        })

        return response.status(400).json({ message: 'Validation fails', errors});               /**400 de bad request / requisição mal feita  */
    }

    console.error(error);                                                           

    return response.status(500).json({ message: 'Internal server error'});
};

export default errorHandler;