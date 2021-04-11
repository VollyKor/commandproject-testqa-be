import Express from 'express';
import TryCatch from '../../helpers/tryCatch';
import {
  googleAuth,
  googleRedirect,
  refreshTokens,
} from '../../controllers/C_auth';
import tryCatch from '../../helpers/tryCatch';
import guardRefresh from '../../helpers/guard-refresh';

const router = Express.Router();

router.get('/google', tryCatch(googleAuth));
router.get('/google-redirect', TryCatch(googleRedirect));
router.get('/refresh', guardRefresh, TryCatch(refreshTokens));

export default router;
