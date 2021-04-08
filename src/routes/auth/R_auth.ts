import Express from 'express';
import { googleAuth } from '../../controllers/C_auth';

const router = Express.Router();

router.get('/google', googleAuth);

export default router;
