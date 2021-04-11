import express from 'express';
import guard from '../../helpers/guard';
import userController from '../../controllers/C_user';
import { registerUserValidation, loginUserValidation } from './UserValidation';
import tryCatch from '../../helpers/tryCatch';
const router = express.Router();

router
  .post('/registration', registerUserValidation, tryCatch(userController.reg))
  .post('/login', loginUserValidation, tryCatch(userController.login))
  .post('/logout', tryCatch(guard), tryCatch(userController.logout))
  .get('/current', tryCatch(guard), tryCatch(userController.current));

export default router;
