import { Router } from 'express';
import multer from 'multer';
import mtz from 'moment-timezone'
import configMulter from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ApplicationController from './app/controllers/ApplicationController';
import FileController from './app/controllers/FileController';
import UserAvatarController from './app/controllers/UserAvatarController';
import ChkUserController from './app/controllers/ChkUserControler';

import MiddlewareAuth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(configMulter);

routes.get('/', (req, res) =>{
  let dtNow = mtz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm');
  res.status(200).json({
    msg: `server: ${dtNow}`,
    buddy_works: 'It was configured!',
  })
}

/** Criando usuário */
routes.post('/CreateUser', UserController.store);

/** Criando Session  */
routes.post('/CreateSession', SessionController.store);

/** Aplicar o middleware de auth  apartir deste ponto */
// routes.use(MiddlewareAuth.index);
/** Listando usuários */
routes.get('/Users', MiddlewareAuth.index, UserController.index);
// routes.get('/Users', UserController.index);

/** Detalhando um único usário */
routes.post('/Users/:id', MiddlewareAuth.index, UserController.show);

/** Delte um único usário */
routes.post('/DestroyUser/:id', MiddlewareAuth.index, UserController.delete);

routes.get('/ChkUsers', MiddlewareAuth.index, ChkUserController.index);

/** Atualizando um único usário */
routes.post(
  '/UserAvatar',
  MiddlewareAuth.index,
  upload.single('file'),
  UserAvatarController.update
);

/** Permite o usuário adicionar uma foto/imagem */
routes.post('/files', upload.single('file'), FileController.store);

/** Rotas para inserção / consulta / deleção de Aplicativos */
/** Lista de aplicativos criados */
routes.get('/Apps', MiddlewareAuth.index, ApplicationController.index);

/** Detalhando um unico aplicativos criados */
routes.post('/Apps/:AppId', MiddlewareAuth.index, ApplicationController.show);

/** Criando um aplicativo */
routes.post('/CreateApp', MiddlewareAuth.index, ApplicationController.store);

/** Atualizando um aplicativo */
routes.post(
  '/UpdateApp/:id',
  MiddlewareAuth.index,
  ApplicationController.update
);

/** Atualizando um aplicativo */

routes.delete(
  '/DestroyApp/:id',
  MiddlewareAuth.index,
  ApplicationController.delete
);

export default routes;
