import { Router } from 'express';
import CarController from './controllers/CarController';
import SessionController from './controllers/SessionController';
import multer from 'multer';
import uploadConfig from './config/upload';
import DashboardController from './controllers/DashboardController';
import UserController from './controllers/UserController';
import LocationController from './controllers/LocationController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store); 

routes.post('/cars', upload.single('thumbnail'), CarController.store);
routes.get('/cars', CarController.index);
routes.put('/cars/:car_id', upload.single('thumbnail'), CarController.update);
routes.delete('/cars', CarController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.get('/users', UserController.show);
routes.put('/users/:user_id', UserController.update);

routes.post('/cars/:car_id/location', LocationController.store);
routes.get('/locations', LocationController.index);
routes.delete('/locations/cancel', LocationController.destroy);

export default routes;