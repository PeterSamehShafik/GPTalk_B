import { Schema, model, Types } from 'mongoose'


const messagesSchema = new Schema({
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    isSeen: { type: Boolean, default: false }
}, {
    timestamps: true
})


const messageModel = model('Message', messagesSchema)

export default messageModel