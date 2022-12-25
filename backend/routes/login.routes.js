import { Router } from 'express';
import { login, logout, refreshToken } from '../controller/login.controller.js';
//import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refreshtoken', refreshToken);

export default router;