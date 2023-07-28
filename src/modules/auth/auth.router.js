import { Router } from 'express'
import * as authController from './controller/auth.js'

import * as authValidators from './auth.validation.js'
import { validation } from './../../middleware/validation.js';


const router = Router();

router.post('/signup', validation(authValidators.signUp), authController.signUp);
router.get('/confirmEmail/:token', validation(authValidators.confirmEmail), authController.confirmEmail);
router.post('/login', validation(authValidators.signIn), authController.signIn);
// router.post('/sendcode', validation(authValidators.sendCode), authController.sendCode);
// router.post('/password/recover', validation(authValidators.recoverPassword), authController.recoverPassword);


export default router