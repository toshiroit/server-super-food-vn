import { UserController } from './../../../controllers/user/user.controller';
import { Router } from 'express';
const routes = Router();

routes.post('');
routes.post('/users', UserController.createUser);
routes.get('/users', UserController.getAllUser);
export default routes;
