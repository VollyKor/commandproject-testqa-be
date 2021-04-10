import express from 'express';
import guard from '../../helpers/guard';
import userController from '../../controllers/C_user';
import { registerUserValidation, loginUserValidation } from './UserValidation';
const router = express.Router();

router
  .post('/registration', registerUserValidation, userController.reg)
  .post('/login', loginUserValidation, userController.login)
  .post('/logout', guard, userController.logout)
  .get('/current', guard, userController.current);

export default router;
