
import userModel from '../../../../DB/models/user.model.js';
import conversationModel from './../../../../DB/models/conversation.model.js';
import { asyncHandler } from './../../../middleware/asyncHandler.js';
import messageModel from './../../../../DB/models/message.model.js';



export const newChat = asyncHandler(

    async (req, res, next) => {

        const { user1Id, user2Id } = req.body;

        const exist = await userModel.findById(user2Id).select('_id')
        if (!exist) {
            return next(Error('Invalid ID, please try again', { cause: 404 }));
        }

        // Check if a conversation already exists between the two users
        const existingConversation = await conversationModel.findOne({
            type: 'chat',
            users: { $all: [user1Id, user2Id] }
        });

        if (existingConversation) {
            return res.status(200).json({ message: "done", conversation: existingConversation });
        }

        // Create a new conversation with the two users
        const newConversation = new conversationModel({
            type: 'chat',
            users: [user1Id, user2Id],
            viewedBy: [user1Id]
        });

        // Save the new conversation to the database
        await newConversation.save();

        return res.status(201).json({ message: "done", conversation: newConversation });

    }
)

export const getUserChats = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const oneOnOneConversations = await conversationModel.find({
        $and: [
            { users: { $in: [userId] } },
            { type: 'chat' }
        ]
    }).populate({
        path: 'users',
        select: 'userName email',
        model: 'User'
    }).populate({
        path: 'lastMessage',
        model: 'Message',
        populate: {
            path: 'sender',
            model: 'User',
            select: 'userName email'
        }
    }).sort({ 'lastMessage.createdAt': -1 });

    return res.status(201).json({ message: "done", chats: oneOnOneConversations });


})

export const getChatMessages = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params
        const exist = await conversationModel.findById(id).populate({
            path: 'users',
            select: 'userName email',
            model: 'User'
        })
        if (!exist) {
            return next(Error('Invalid ID, please try again', { cause: 404 }));
        }
        const recipient = JSON.stringify(exist.users[0]._id) === JSON.stringify(req.user._id) ? { _id: exist.users[1]._id, userName: exist.users[1].userName } : { _id: exist.users[0]._id, userName: exist.users[0].userName }
        const lastMsg = await messageModel.findById(exist.lastMessage)
        if (lastMsg) {
            if (JSON.stringify(lastMsg.sender) !== JSON.stringify(req.user._id)) {
                await messageModel.updateOne({ _id: exist.lastMessage }, { isSeen: true })
            }
        }
        const messages = await messageModel.find({ conversation: id }).populate('sender', 'userName email ').populate("recipient", "userName email");
        return res.status(201).json({ message: "done", messages: messages, recipient });

    }
)

