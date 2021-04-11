import Express from 'express';
import TryCatch from '../../helpers/tryCatch';
import {
  googleAuth,
  googleRedirect,
  refreshTokens,
} from '../../controllers/C_auth';

const router = Express.Router();

router.get('/google', googleAuth);
router.get('/google-redirect', TryCatch(googleRedirect));
router.get('/refresh', TryCatch(refreshTokens));

export default router;
