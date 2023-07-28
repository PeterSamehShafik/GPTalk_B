import { Router } from 'express'
import * as messageController from './controller/message.js'
import auth from './../../middleware/auth.js';


const router = Router();

router.post('/:conversationId/send', auth(), messageController.addNewMessage);





export default router