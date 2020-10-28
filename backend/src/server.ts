import express from 'express';
import routes from './routes'
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import './database/connections';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());                                                                        /** permite acesso para os ambientes  cors({origin: }) */
app.use(express.json());
app.use(routes);                                                                        /** usa as rotas definidas */
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));             /** permite que seja acessível o caminho de uploads  => Entro no diretório atual, volto um diretório e acesso a pasta uploads*/
app.use(errorHandler);
app.listen(3333);
