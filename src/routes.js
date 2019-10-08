import { Router } from 'express';
import multer from 'multer';

import configMulter from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ApplicationController from './app/controllers/ApplicationController';

import MiddlewareAuth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(configMulter);

routes.get('/', (req, res) =>
  res.status(200).json({ msg: `server: ${new Date().getDate().toString()}` })
);

routes.post('/files', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res
      .status(401)
      .json({ error: `The request didn't recive your image!` });
  }
  const { filename, originalname, size } = req.file;

  return res.status(200).json({ filename, originalname, size });
});
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
