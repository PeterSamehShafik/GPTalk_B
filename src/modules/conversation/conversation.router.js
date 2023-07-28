import { Router } from 'express'
import * as conversationController from './controller/conversation.js'
import auth from './../../middleware/auth.js';


const router = Router();

router.post('/new', auth(), conversationController.newChat);
router.get('/myChats', auth(), conversationController.getUserChats);
router.get('/chat/:id', auth(), conversationController.getChatMessages);




export default router