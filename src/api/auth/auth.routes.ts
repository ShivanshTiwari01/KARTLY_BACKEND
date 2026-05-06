import express from 'express';
import * as controller from './auth.controller';
import authentication from '../../middleware/authentication';

const router = express.Router();

router.post('/register', controller.register);

router.post('/signin', controller.signin);

router.post('/refresh-token', authentication, controller.updateToken);

export default router;
