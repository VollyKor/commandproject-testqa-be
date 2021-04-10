import Express from 'express';
import {
  googleAuth,
  googleRedirect,
  refreshTokens,
} from '../../controllers/C_auth';

const router = Express.Router();

router.get('/google', googleAuth);
router.get('/google-redirect', googleRedirect);
router.get('/refresh', refreshTokens);

export default router;
