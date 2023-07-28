import { Router } from 'express'
import auth from '../../middleware/auth.js';
import * as userController from './controller/user.js'
import { validation } from './../../middleware/validation.js';
import * as userValidators from './user.validation.js'

const router = Router();

router.get('/profile/:id', validation(userValidators.getProfile), auth(), userController.getProfile);
router.get('/profile', validation(userValidators.getProfile), auth(), userController.getProfile);
router.get('/signout', auth(), userController.signOut);

export default router
