import { Router } from 'express';
import DeviceController from './app/controllers/DeviceController';
import MiddlewareAuth from './app/middlewares/auth';

const routes = new Router();

routes.get('/DeviceList', MiddlewareAuth.index, DeviceController.index);

routes.post('/DeviceDetail/:id', MiddlewareAuth.index, DeviceController.show);

routes.post('/RegistreDevice', DeviceController.store);

routes.post('/SaveDevice/:device_id', DeviceController.update);

export default routes;
