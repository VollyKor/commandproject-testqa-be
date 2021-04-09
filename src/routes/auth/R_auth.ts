import Express from 'express';
import { googleAuth, googleRedirect } from '../../controllers/C_auth';

const router = Express.Router();

router.get('/google', googleAuth);
router.get('/google-redirect', googleRedirect);

export default router;
