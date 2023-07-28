
import userModel from '../../../../DB/models/user.model.js';
import conversationModel from './../../../../DB/models/conversation.model.js';
import { asyncHandler } from './../../../middleware/asyncHandler.js';
import messageModel from './../../../../DB/models/message.model.js';

export const addNewMessage = asyncHandler(
    async (req, res, next) => {

        const { conversationId } = req.params;
        const { recipientId, text } = req.body;
        const senderId = req.user._id

        // Find the conversation by ID
        const conversation = await conversationModel.findById(conversationId);

        if (!conversation) {
            return next(Error('Invalid conversation ID, please try again', { cause: 404 }));
        }



        // Create a new message with the sender ID, text, and attachments
        const newMessage = new messageModel({
            conversation: conversationId,
            sender: senderId,
            recipient: recipientId,
            text: text,
        });

        // Add the new message to the conversation's messages array
        // conversation.messages.push(newMessage);

        // Mark the conversation as unread for all members except the sender
        // conversation.viewedBy = conversation.members.filter(memberId => memberId != senderId);

        // Save the updated conversation and new message to the database
        const newMsg = await newMessage.save();
        if (newMsg) {
            await conversationModel.updateOne({ _id: conversationId }, { lastMessage: newMsg._id })
        }

        return res.status(201).json({ message: "done" });
    })
